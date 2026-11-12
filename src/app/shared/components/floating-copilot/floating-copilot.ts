import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { marked } from 'marked';
import katex from 'katex';
import { environment } from '../../../../environments/environment';
import { ProjectService } from '../../../modules/projects/services/project-service';

export interface CopilotMessage {
  id: string;
  sender: 'copilot' | 'user';
  text: string;
  renderedHtml?: SafeHtml;
  timestamp: Date;
  isGreeting?: boolean;
  isError?: boolean;
}

@Component({
  selector: 'app-floating-copilot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './floating-copilot.html',
  styleUrl: './floating-copilot.scss',
})
export class FloatingCopilotComponent implements OnInit, OnDestroy {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('inputTextarea') private inputTextarea!: ElementRef<HTMLTextAreaElement>;

  isOpen = false;
  isMinimized = false;
  isGenerating = false;
  isRecording = false;
  isSpeaking = false;
  currentlySpeakingId: string | null = null;
  activeProjectId: number | null = null;
  activeProjectName = 'All Projects Context';
  userInput = '';
  lastFailedQuestion = '';

  private readonly EXACT_DEFAULT_GREETING =
    'Hello! I am your Zyno Intelligence Copilot. Ask me anything about project milestones, EVM schedule variance, daily logs, inventory consumption, or snags.';

  messages: CopilotMessage[] = [];
  private routerSub?: Subscription;
  private speechRecognition: any = null;
  private speechSynthesisUtterance: SpeechSynthesisUtterance | null = null;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private router: Router,
    private projectService: ProjectService
  ) {
    marked.setOptions({
      gfm: true,
      breaks: true,
    });
  }

  ngOnInit(): void {
    this.initDefaultGreeting();
    this.inspectRouteForProject(this.router.url);

    this.routerSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.inspectRouteForProject(event.urlAfterRedirects || event.url);
      });

    this.initSpeechRecognition();
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    this.stopRecording();
    this.stopSpeaking();
  }

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.isMinimized = false;
      setTimeout(() => {
        this.scrollToBottom();
        this.inputTextarea?.nativeElement?.focus();
      }, 100);
    } else {
      this.stopRecording();
      this.stopSpeaking();
    }
  }

  toggleMinimize(): void {
    this.isMinimized = !this.isMinimized;
    if (!this.isMinimized) {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  closeWidget(): void {
    this.isOpen = false;
    this.stopRecording();
    this.stopSpeaking();
  }

  initDefaultGreeting(): void {
    this.messages = [
      {
        id: 'msg-greeting',
        sender: 'copilot',
        text: this.EXACT_DEFAULT_GREETING,
        renderedHtml: this.renderRichContent(this.EXACT_DEFAULT_GREETING),
        timestamp: new Date(),
        isGreeting: true,
      },
    ];
  }

  clearChat(): void {
    this.stopSpeaking();
    this.initDefaultGreeting();
  }

  private inspectRouteForProject(url: string): void {
    const projectMatch = url.match(/\/master\/projects\/(\d+)/);
    if (projectMatch && projectMatch[1]) {
      const id = parseInt(projectMatch[1], 10);
      if (this.activeProjectId !== id) {
        this.activeProjectId = id;
        this.activeProjectName = `Project #${id}`;
      }
    } else {
      this.activeProjectId = null;
      this.activeProjectName = 'Enterprise Context';
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage(customText?: string): void {
    const question = (customText || this.userInput).trim();
    if (!question || this.isGenerating) return;

    this.userInput = '';
    this.lastFailedQuestion = '';

    // Append User message
    const userMsg: CopilotMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: question,
      renderedHtml: this.renderRichContent(question),
      timestamp: new Date(),
    };
    this.messages.push(userMsg);
    this.scrollToBottom();

    // Prepare assistant message placeholder for streaming
    this.isGenerating = true;
    const assistantMsg: CopilotMessage = {
      id: `copilot-${Date.now()}`,
      sender: 'copilot',
      text: '',
      renderedHtml: '',
      timestamp: new Date(),
    };
    this.messages.push(assistantMsg);

    this.projectService.streamAICopilot(
      this.activeProjectId,
      question,
      (chunk: string) => {
        assistantMsg.text += chunk;
        assistantMsg.renderedHtml = this.renderRichContent(assistantMsg.text);
        this.scrollToBottom();
      },
      () => {
        this.isGenerating = false;
        if (!assistantMsg.text.trim()) {
          // No text came back. Say so; do not show a stock sentence as if it answered the question.
          assistantMsg.isError = true;
          assistantMsg.text = '⚠️ No answer was produced for this question. Try again. If this continues, check that the AI model is connected.';
          assistantMsg.renderedHtml = this.renderRichContent(assistantMsg.text);
        }
        this.scrollToBottom();
      },
      (err: any) => {
        this.isGenerating = false;
        this.lastFailedQuestion = question;
        assistantMsg.isError = true;

        if (err?.status === 401 || (err?.message && err.message.includes('401'))) {
          assistantMsg.text = '⚠️ Session expired or authentication failed. Please re-login to access Zyno Intelligence Copilot.';
        } else if (err?.status === 403 || (err?.message && err.message.includes('403'))) {
          assistantMsg.text = '⚠️ Access Denied: You do not have permission to query AI Copilot for this project.';
        } else if (err?.fromServer && err?.message) {
          // The server's own reason, shown as given (for example: the AI model did not answer; nothing was generated).
          assistantMsg.text = `⚠️ ${err.message}`;
        } else {
          assistantMsg.text = '⚠️ Connection error or Copilot service currently unavailable. Please verify project access or retry.';
        }
        assistantMsg.renderedHtml = this.renderRichContent(assistantMsg.text);
        this.scrollToBottom();
      }
    );
  }

  retryLastQuestion(): void {
    if (this.lastFailedQuestion) {
      this.sendMessage(this.lastFailedQuestion);
    }
  }

  private appendCopilotMessage(text: string, isError = false): void {
    const copilotMsg: CopilotMessage = {
      id: `copilot-${Date.now()}`,
      sender: 'copilot',
      text,
      renderedHtml: this.renderRichContent(text),
      timestamp: new Date(),
      isError,
    };
    this.messages.push(copilotMsg);
    this.scrollToBottom();
  }

  /**
   * Rich formatting engine:
   * 1. Preserves LaTeX formulas ($...$ inline and $$...$$ block) using KaTeX
   * 2. Parses Markdown with table and code block syntax
   * 3. Sanitizes links and HTML to protect against XSS
   * 4. Adds copy buttons for code blocks
   */
  renderRichContent(rawText: string): SafeHtml {
    if (!rawText) return '';

    try {
      let content = rawText;
      const mathPlaceholders: { [key: string]: string } = {};
      let mathIndex = 0;

      // Replace block math $$...$$
      content = content.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
        const placeholder = `%%KATEX_BLOCK_${mathIndex++}%%`;
        try {
          mathPlaceholders[placeholder] = katex.renderToString(math.trim(), {
            displayMode: true,
            throwOnError: false,
          });
        } catch (e) {
          mathPlaceholders[placeholder] = `<pre class="katex-err">${math}</pre>`;
        }
        return placeholder;
      });

      // Replace inline math $...$ (avoiding currency $100)
      content = content.replace(/\$([^\$\n\r]+?)\$/g, (match, math) => {
        if (/^\d+(\.\d+)?$/.test(math.trim())) {
          return match; // Currency amount like $100
        }
        const placeholder = `%%KATEX_INLINE_${mathIndex++}%%`;
        try {
          mathPlaceholders[placeholder] = katex.renderToString(math.trim(), {
            displayMode: false,
            throwOnError: false,
          });
        } catch (e) {
          mathPlaceholders[placeholder] = `<code>${math}</code>`;
        }
        return placeholder;
      });

      // Parse Markdown via marked
      let parsedHtml = marked.parse(content) as string;

      // Restore KaTeX equations
      for (const [placeholder, html] of Object.entries(mathPlaceholders)) {
        parsedHtml = parsedHtml.split(placeholder).join(html);
      }

      // Sanitize unsafe script tags and malicious attributes
      parsedHtml = this.sanitizeHtml(parsedHtml);

      return this.sanitizer.bypassSecurityTrustHtml(parsedHtml);
    } catch (err) {
      console.error('Error rendering rich Copilot content:', err);
      return this.sanitizer.bypassSecurityTrustHtml(`<p>${rawText}</p>`);
    }
  }

  private sanitizeHtml(html: string): string {
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/on\w+='[^']*'/gi, '')
      .replace(/href="javascript:[^"]*"/gi, 'href="#"')
      .replace(/<a\s+href=/gi, '<a target="_blank" rel="noopener noreferrer" class="copilot-link" href=');
  }

  // Code block copy support
  @HostListener('click', ['$event'])
  onComponentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const copyBtn = target.closest('.copy-code-btn') as HTMLElement;
    if (copyBtn) {
      const codeText = copyBtn.getAttribute('data-code');
      if (codeText) {
        navigator.clipboard.writeText(codeText);
        const originalHtml = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span class="material-symbols-outlined text-xs">check</span> Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = originalHtml;
        }, 2000);
      }
    }
  }

  // --- Web Speech API: Voice Transcription ---
  private initSpeechRecognition(): void {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.speechRecognition = new SpeechRecognition();
      this.speechRecognition.continuous = false;
      this.speechRecognition.interimResults = true;
      this.speechRecognition.lang = 'en-US';

      this.speechRecognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          this.userInput = transcript;
        }
      };

      this.speechRecognition.onerror = (event: any) => {
        console.warn('Speech recognition error in Copilot:', event.error);
        this.isRecording = false;
      };

      this.speechRecognition.onend = () => {
        this.isRecording = false;
      };
    }
  }

  toggleVoiceRecognition(): void {
    if (!this.speechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use keyboard input.');
      return;
    }

    if (this.isRecording) {
      this.stopRecording();
    } else {
      try {
        this.isRecording = true;
        this.speechRecognition.start();
      } catch (e) {
        console.warn('Speech recognition already started or permission issue:', e);
        this.isRecording = false;
      }
    }
  }

  stopRecording(): void {
    if (this.speechRecognition && this.isRecording) {
      try {
        this.speechRecognition.stop();
      } catch (e) {}
      this.isRecording = false;
    }
  }

  // --- Web Speech API: Text-to-Speech Playback ---
  speakMessage(msg: CopilotMessage): void {
    if (!('speechSynthesis' in window)) return;

    if (this.isSpeaking && this.currentlySpeakingId === msg.id) {
      this.stopSpeaking();
      return;
    }

    this.stopSpeaking();

    // Strip markdown formatting and KaTeX syntax for readable speech
    const cleanSpeechText = msg.text
      .replace(/\$\$[\s\S]+?\$\$/g, ' mathematical equation ')
      .replace(/\$[^\$]+?\$/g, ' equation ')
      .replace(/[*#`_~\[\]]/g, '')
      .replace(/\|/g, ' ');

    this.speechSynthesisUtterance = new SpeechSynthesisUtterance(cleanSpeechText);
    this.speechSynthesisUtterance.rate = 1.0;
    this.speechSynthesisUtterance.onend = () => {
      this.isSpeaking = false;
      this.currentlySpeakingId = null;
    };
    this.speechSynthesisUtterance.onerror = () => {
      this.isSpeaking = false;
      this.currentlySpeakingId = null;
    };

    this.currentlySpeakingId = msg.id;
    this.isSpeaking = true;
    window.speechSynthesis.speak(this.speechSynthesisUtterance);
  }

  stopSpeaking(): void {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.currentlySpeakingId = null;
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.messagesContainer?.nativeElement) {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }
    }, 50);
  }
}
