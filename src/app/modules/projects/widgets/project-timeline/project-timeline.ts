import { Component, Input, OnInit } from '@angular/core';


interface TimelineItem {
  id: string;
  name: string;
  color: string;
  completion?: number;
  width?: string;
  left: string;
  critical?: boolean;
  isMilestone?: boolean;
  milestoneTitle?: string;
  status?: string;
  assignee?: string;
}

interface TimelinePhase {
  title: string;
  tasks: TimelineItem[];
}

@Component({
  selector: 'app-project-timeline',
  standalone: false,
  templateUrl: './project-timeline.html',
  styleUrl: './project-timeline.scss',
})
export class ProjectTimeline implements OnInit {
  @Input() selectedMember = 'All Members';
  viewType: 'day' | 'week' | 'month' = 'week';
  showCriticalPath = false;
  showTeamView = false;
  currentMonthIndex = 0;
  months = ['October 2024', 'November 2024', 'December 2024'];
  selectedProject = 'Skyline Plaza';
  projects = ['All Projects', 'Skyline Plaza', 'Harbor Bridge Renovation', 'Meridian Towers', 'Westside Condos'];

  team = [
    { name: 'All Members', avatar: '' },
    { name: 'James Wilson', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtGFAFvuDTZowiKMN-_86PVlfoW0s1Y1t2wIesJt_aUWgPzfdeDsBI62JTUgxDWTq1m-Ym9UTDzUgPdykM1NQMrfIACLf6ELlG-TFDXx0bY0i_pEacXyHWhO2hkaeoTxzFixMpxv19qT44QctQNTUZJIcUIdbYcNqhsodpWPPJ7sk33kwcSVJEXH4-Vw1iFudWnbRysUDa4wlBKgguYjpVnU4sisOx6--P1vua992aHyR4-yzZcdvfY2oGUCGKt7PKua6O7aWnX-He' },
    { name: 'Sarah Chen', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNzfoyCh9T5jGXyS1Z_oulE0qwVUs24lt_XGAkXFQSRqaWNCKxded51i1BCZ7dfp-pGHnok3QVO3dgouAGxmqT3qEbjdB3JWGLULu5QhLo2_g1Ypr5J3YmNDL67WiHAt0xRnjKXt0-Wvr61mKsmkea12mawD58a6haqRp3roTP4ozbi8Nts8AGacuP2xj84hy-YMnppdLzUQWRMoC5W26Nao_ycj91iOCEE5K6VFvm0nsNGnn5Uf459l4Dnx69QzvNITq3QrutFSpc' }
  ];

  phases: TimelinePhase[] = [
    {
      title: '01. SITE PREPARATION',
      tasks: [
        { id: 't1', name: 'Land Clearing', color: 'bg-primary', completion: 100, width: '48%', left: '10%', assignee: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtGFAFvuDTZowiKMN-_86PVlfoW0s1Y1t2wIesJt_aUWgPzfdeDsBI62JTUgxDWTq1m-Ym9UTDzUgPdykM1NQMrfIACLf6ELlG-TFDXx0bY0i_pEacXyHWhO2hkaeoTxzFixMpxv19qT44QctQNTUZJIcUIdbYcNqhsodpWPPJ7sk33kwcSVJEXH4-Vw1iFudWnbRysUDa4wlBKgguYjpVnU4sisOx6--P1vua992aHyR4-yzZcdvfY2oGUCGKt7PKua6O7aWnX-He' },
        { id: 't2', name: 'Soil Testing', color: 'bg-primary', completion: 100, width: '24%', left: '48%', assignee: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNzfoyCh9T5jGXyS1Z_oulE0qwVUs24lt_XGAkXFQSRqaWNCKxded51i1BCZ7dfp-pGHnok3QVO3dgouAGxmqT3qEbjdB3JWGLULu5QhLo2_g1Ypr5J3YmNDL67WiHAt0xRnjKXt0-Wvr61mKsmkea12mawD58a6haqRp3roTP4ozbi8Nts8AGacuP2xj84hy-YMnppdLzUQWRMoC5W26Nao_ycj91iOCEE5K6VFvm0nsNGnn5Uf459l4Dnx69QzvNITq3QrutFSpc' },
        { id: 't3', name: 'Utility Markout', color: 'bg-primary', completion: 85, width: '32%', left: '64%', assignee: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtGFAFvuDTZowiKMN-_86PVlfoW0s1Y1t2wIesJt_aUWgPzfdeDsBI62JTUgxDWTq1m-Ym9UTDzUgPdykM1NQMrfIACLf6ELlG-TFDXx0bY0i_pEacXyHWhO2hkaeoTxzFixMpxv19qT44QctQNTUZJIcUIdbYcNqhsodpWPPJ7sk33kwcSVJEXH4-Vw1iFudWnbRysUDa4wlBKgguYjpVnU4sisOx6--P1vua992aHyR4-yzZcdvfY2oGUCGKt7PKua6O7aWnX-He' }
      ]
    },
    {
      title: '02. FOUNDATION',
      tasks: [
        { id: 't4', name: 'Excavation', color: 'bg-secondary', completion: 40, width: '56%', left: '28%', critical: true, assignee: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNzfoyCh9T5jGXyS1Z_oulE0qwVUs24lt_XGAkXFQSRqaWNCKxded51i1BCZ7dfp-pGHnok3QVO3dgouAGxmqT3qEbjdB3JWGLULu5QhLo2_g1Ypr5J3YmNDL67WiHAt0xRnjKXt0-Wvr61mKsmkea12mawD58a6haqRp3roTP4ozbi8Nts8AGacuP2xj84hy-YMnppdLzUQWRMoC5W26Nao_ycj91iOCEE5K6VFvm0nsNGnn5Uf459l4Dnx69QzvNITq3QrutFSpc' },
        { id: 't5', name: 'Concrete Pouring', color: 'bg-secondary', isMilestone: true, left: '44%', milestoneTitle: 'Inspection Milestone' },
        { id: 't6', name: 'Curing Period', color: 'bg-slate-200', completion: 0, width: '40%', left: '48%', assignee: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNzfoyCh9T5jGXyS1Z_oulE0qwVUs24lt_XGAkXFQSRqaWNCKxded51i1BCZ7dfp-pGHnok3QVO3dgouAGxmqT3qEbjdB3JWGLULu5QhLo2_g1Ypr5J3YmNDL67WiHAt0xRnjKXt0-Wvr61mKsmkea12mawD58a6haqRp3roTP4ozbi8Nts8AGacuP2xj84hy-YMnppdLzUQWRMoC5W26Nao_ycj91iOCEE5K6VFvm0nsNGnn5Uf459l4Dnx69QzvNITq3QrutFSpc' }
      ]
    },
    {
      title: '03. STRUCTURAL',
      tasks: [
        { id: 't7', name: 'Steel Framing', color: 'bg-slate-200', status: 'Pending', width: '80%', left: '56%', assignee: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtGFAFvuDTZowiKMN-_86PVlfoW0s1Y1t2wIesJt_aUWgPzfdeDsBI62JTUgxDWTq1m-Ym9UTDzUgPdykM1NQMrfIACLf6ELlG-TFDXx0bY0i_pEacXyHWhO2hkaeoTxzFixMpxv19qT44QctQNTUZJIcUIdbYcNqhsodpWPPJ7sk33kwcSVJEXH4-Vw1iFudWnbRysUDa4wlBKgguYjpVnU4sisOx6--P1vua992aHyR4-yzZcdvfY2oGUCGKt7PKua6O7aWnX-He' }
      ]
    }
  ];

  resources = [
    { name: 'James Wilson', role: 'Lead Engineer', utilization: 85, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtGFAFvuDTZowiKMN-_86PVlfoW0s1Y1t2wIesJt_aUWgPzfdeDsBI62JTUgxDWTq1m-Ym9UTDzUgPdykM1NQMrfIACLf6ELlG-TFDXx0bY0i_pEacXyHWhO2hkaeoTxzFixMpxv19qT44QctQNTUZJIcUIdbYcNqhsodpWPPJ7sk33kwcSVJEXH4-Vw1iFudWnbRysUDa4wlBKgguYjpVnU4sisOx6--P1vua992aHyR4-yzZcdvfY2oGUCGKt7PKua6O7aWnX-He' },
    { name: 'Sarah Chen', role: 'Logistics', utilization: 110, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNzfoyCh9T5jGXyS1Z_oulE0qwVUs24lt_XGAkXFQSRqaWNCKxded51i1BCZ7dfp-pGHnok3QVO3dgouAGxmqT3qEbjdB3JWGLULu5QhLo2_g1Ypr5J3YmNDL67WiHAt0xRnjKXt0-Wvr61mKsmkea12mawD58a6haqRp3roTP4ozbi8Nts8AGacuP2xj84hy-YMnppdLzUQWRMoC5W26Nao_ycj91iOCEE5K6VFvm0nsNGnn5Uf459l4Dnx69QzvNITq3QrutFSpc', overAllocated: true }
  ];

  constructor() { }

  ngOnInit(): void { }

  get filteredPhases(): TimelinePhase[] {
    if (this.selectedMember === 'All Members') return this.phases;
    const member = this.team.find(m => m.name === this.selectedMember);
    return this.phases.map(p => ({
      ...p,
      tasks: p.tasks.filter(t => t.assignee === member?.avatar || t.isMilestone)
    })).filter(p => p.tasks.length > 0);
  }

  setViewType(type: 'day' | 'week' | 'month') {
    this.viewType = type;
  }

  toggleCriticalPath() {
    this.showCriticalPath = !this.showCriticalPath;
  }

  toggleTeamView() {
    this.showTeamView = !this.showTeamView;
  }

  navigate(direction: 'next' | 'prev') {
    if (direction === 'next') {
      this.currentMonthIndex = (this.currentMonthIndex + 1) % this.months.length;
    } else {
      this.currentMonthIndex = (this.currentMonthIndex - 1 + this.months.length) % this.months.length;
    }
  }
}
