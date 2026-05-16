import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vendor-add-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vendor-add-modal.html',
})
export class VendorAddComponent {

  @Input() showAddModal = false;

  @Input() newVendor: any;

  @Input() errorMsg = '';

  @Input() contractFile: File | null = null;

  @Input() isSaving = false;

  @Output() close = new EventEmitter<void>();

  @Output() save = new EventEmitter<void>();

  @Output() contractSelect = new EventEmitter<any>();

  @Output() onlyNumberEvent = new EventEmitter<any>();

  @Output() onlyAlphaNumericEvent = new EventEmitter<any>();

  @Output() pasteNumericEvent = new EventEmitter<any>();

  @Output() pasteAlphaNumericEvent = new EventEmitter<any>();

  ngOnInit() {
    console.log(this.showAddModal,'showAddModal');
    
  }
 onContractFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.contractFile = input.files?.[0] ?? null;
  }

  closeModal() {
    this.close.emit();
  }

  saveVendor() {
    this.save.emit();
  }

  onFileChange(event: any) {
    this.contractSelect.emit(event);
  }

  onlyNumbers(event: any) {
    this.onlyNumberEvent.emit(event);
  }

  onlyAlphanumeric(event: any) {
    this.onlyAlphaNumericEvent.emit(event);
  }

  stripNonNumericOnPaste(event: any, field: string, len: number) {
    this.pasteNumericEvent.emit({ event, field, len });
  }

  stripNonAlphanumericOnPaste(event: any, field: string, len: number) {
    this.pasteAlphaNumericEvent.emit({ event, field, len });
  }

  
}