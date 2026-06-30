import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-common-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './common-dialog.html',
  styleUrl: './common-dialog.scss',
})
export class CommonDialogComponent {
  private readonly standardWidthClass = '!max-w-3xl';
  private readonly standardHeightClass = '!h-[82vh] !max-h-[82vh]';
  private readonly dangerWidthClass = '!max-w-xl';
  private readonly dangerHeightClass = '!h-auto !max-h-[90vh]';

  @Input() open = true;
  @Input() showBackdrop = true;
  @Input() closeOnBackdrop = true;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' | 'full' | string = '';
  @Input() height = '';
  @Input() maxWidth = '';
  @Input() panelClass = '';
  @Input() contentClass = 'min-h-0 flex-1 overflow-y-auto';
  @Input() backdropClass = 'bg-slate-900/40';
  @Input() variant: 'default' | 'danger' | string = 'default';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() badge = '';
  @Input() badgeClass = '';
  @Input() icon = '';
  @Input() showCloseButton = false;
  @Input() showFooter = false;
  @Input() showDefaultFooterButtons = true;
  @Input() cancelLabel = 'Cancel';
  @Input() primaryLabel = 'Save';
  @Input() primaryDisabled = false;
  @Input() closeOnOutsideClick: boolean | null = null;
  @Input() disableClose = false;

  @Output() closed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
  @Output() primary = new EventEmitter<void>();

  get dialogWidthClass(): string {
    if (this.isDanger) {
      return this.dangerWidthClass;
    }

    return this.maxWidth || this.standardWidthClass;
  }

  get dialogHeightClass(): string {
    if (this.isDanger) {
      return this.dangerHeightClass;
    }

    return this.height || this.standardHeightClass;
  }

  get computedMaxWidth(): string {
    const maxWidthClass = this.maxWidth || (this.isDanger ? 'max-w-xl' : 'max-w-3xl');
    return this.getMaxWidthValue(maxWidthClass);
  }

  private getMaxWidthValue(maxWidthClass: string): string {
    const normalized = maxWidthClass.replace(/^!/, '').trim();

    switch (normalized) {
      case 'max-w-xs': return '20rem';
      case 'max-w-sm': return '24rem';
      case 'max-w-md': return '28rem';
      case 'max-w-lg': return '32rem';
      case 'max-w-xl': return '36rem';
      case 'max-w-2xl': return '42rem';
      case 'max-w-3xl': return '48rem';
      case 'max-w-4xl': return '56rem';
      case 'max-w-5xl': return '64rem';
      case 'max-w-6xl': return '72rem';
      case 'max-w-7xl': return '80rem';
      case 'max-w-full': return '100%';
      default: return 'min(48rem, calc(100vw - 2rem))';
    }
  }

  get isDanger(): boolean {
    return this.variant === 'danger';
  }

  get dialogVariantClass(): string {
    return this.isDanger
      ? 'border-red-200 dark:border-red-950/40'
      : 'border-slate-200/70 dark:border-slate-800/70';
  }

  get headerClass(): string {
    return this.isDanger
      ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900 border-b'
      : 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 border-b';
  }

  get resolvedIcon(): string {
    if (this.icon) return this.icon;
    if (this.isDanger) return 'delete_forever';
    return '';
  }

  get resolvedBadgeClass(): string {
    if (this.badgeClass) return this.badgeClass;

    return this.variant === 'danger'
      ? 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-300'
      : 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300';
  }

  get iconClass(): string {
    return this.variant === 'danger'
      ? 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-300'
      : 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300';
  }

  get primaryButtonClass(): string {
    return this.variant === 'danger'
      ? 'bg-red-600 text-white hover:bg-red-700 shadow-red-500/20'
      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20';
  }

  onBackdropClick(): void {
    if (this.disableClose) {
      return;
    }

    const shouldClose = this.closeOnOutsideClick ?? this.closeOnBackdrop;
    if (shouldClose) {
      this.closed.emit();
    }
  }

  onCancel(): void {
    if (this.disableClose) {
      return;
    }

    this.cancelled.emit();
    this.closed.emit();
  }
}

export { CommonDialogComponent as CommonDialog };
