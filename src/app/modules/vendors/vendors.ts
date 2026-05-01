import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  VendorsServices,
  Vendor,
  ActivityItem,
  VendorStats,
} from '../vendors/vendors-services';

@Component({
  selector: 'app-vendors',
  standalone: false,
  templateUrl: './vendors.html',
  styleUrl: './vendors.scss',
})
export class Vendors implements OnInit, OnDestroy {
  showModal = false;
  filterActive = false;
  uploadedFile: File | null = null;
  isDragging = false;
  isSubmitting = false;
  isLoading = false;
  errorMessage = '';
  onboardForm: FormGroup;
  vendors: Vendor[] = [];
  activities: ActivityItem[] = [];
  totalActive: number | string = 0;
  pendingPayments: string = '₹0';
  compliantPartners: string = '0%';

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private vendorsService: VendorsServices
  ) {
    this.onboardForm = this.fb.group({
      vendorLegalName: ['', [Validators.required, Validators.minLength(3)]],
      spocName: ['', [Validators.required, Validators.minLength(2)]],
      spocPhone: ['', [Validators.required, Validators.pattern(/^[6-9][0-9]{9}$/)]],
      officialEmail: ['', [Validators.required, Validators.email]],
      officialPhone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{7,15}$/)]],
      gstNo: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/),
      ]],
      panCardNo: ['', [
        Validators.required,
        Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/),
      ]],
      physicalAddress: ['', [Validators.required, Validators.minLength(5)]],
      pincode: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)]],
      budgetAllocation: ['', [Validators.required, Validators.pattern(/^[₹]?[\d,]+(\.\d{1,2})?$/)]],
      services: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  private loadAll(): void {
    this.isLoading = true;
    this.loadStats();
    this.loadVendors();
    this.loadActivities();
  }

  loadVendors(status?: string): void {
    this.isLoading = true;
    this.vendorsService
      .getAllVendors(status)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.vendors = res.data.map(v => ({
            ...v,
            services: this.parseServices(v.services),
          }));
          this.isLoading = false;
        },
        error: (err) => {
          console.error('[loadVendors]', err);
          this.isLoading = false;
        },
      });
  }

  loadStats(): void {
    this.vendorsService
      .getStats()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.totalActive = res.data.totalActive;
          this.pendingPayments = res.data.pendingPayments;
          this.compliantPartners = res.data.compliantPartners;
        },
        error: (err) => console.error('[loadStats]', err),
      });
  }

  loadActivities(): void {
    this.vendorsService
      .getActivities(20)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => { this.activities = res.data; },
        error: (err) => console.error('[loadActivities]', err),
      });
  }

  toggleFilter(): void {
    this.filterActive = !this.filterActive;
    this.loadVendors(this.filterActive ? 'active' : undefined);
  }

  openModal(): void {
    this.showModal = true;
    this.errorMessage = '';
    this.uploadedFile = null;
    this.onboardForm.reset();
  }

  closeModal(): void {
    if (this.isSubmitting) return;
    this.showModal = false;
    this.errorMessage = '';
  }

  onSubmit(): void {
    if (this.onboardForm.invalid) {
      this.onboardForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const fv = this.onboardForm.value;

    this.vendorsService
      .createVendor({
        vendorLegalName: fv.vendorLegalName.trim(),
        spocName: fv.spocName.trim(),
        spocPhone: fv.spocPhone.trim(),
        officialEmail: fv.officialEmail.trim().toLowerCase(),
        officialPhone: fv.officialPhone.trim(),
        gstNo: fv.gstNo.trim().toUpperCase(),
        panCardNo: fv.panCardNo.trim().toUpperCase(),
        physicalAddress: fv.physicalAddress.trim(),
        pincode: fv.pincode.trim(),
        budgetAllocation: fv.budgetAllocation.trim(),
        services: fv.services.trim(),
        contractFile: this.uploadedFile,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.closeModal();
          this.loadAll();
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMessage = err.message || 'Failed to onboard vendor. Please try again.';
        },
      });
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      this.uploadedFile = input.files[0];
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(): void {
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    const file = event.dataTransfer?.files[0];
    if (file) this.uploadedFile = file;
  }

  parseServices(raw: any): string[] {
    if (Array.isArray(raw)) return raw;
    if (typeof raw === 'string') {
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [raw];
      } catch {
        return raw.split(',').map((s: string) => s.trim()).filter(Boolean);
      }
    }
    return [];
  }

  servicesLabel(vendor: Vendor): string {
    const arr = this.parseServices(vendor.services);
    return arr.join(', ');
  }

  getInitials(name: string): string {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(w => w[0]?.toUpperCase() ?? '')
      .join('');
  }

  statusLabel(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.onboardForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  fieldError(fieldName: string): string {
    const ctrl = this.onboardForm.get(fieldName);
    if (!ctrl || !ctrl.touched || !ctrl.errors) return '';

    const e = ctrl.errors;
    if (e['required']) return 'This field is required';
    if (e['email']) return 'Enter a valid email address';
    if (e['minlength']) return `Minimum ${e['minlength'].requiredLength} characters required`;
    if (e['pattern']) {
      switch (fieldName) {
        case 'spocPhone': return 'Enter a valid 10-digit Indian mobile number';
        case 'officialPhone': return 'Enter a valid phone number';
        case 'gstNo': return 'Invalid GST format (e.g. 22ABCDE1234F1Z5)';
        case 'panCardNo': return 'Invalid PAN format (e.g. ABCDE1234F)';
        case 'pincode': return 'Enter a valid 6-digit pincode';
        case 'budgetAllocation': return 'Enter a valid amount (e.g. ₹3,000,000)';
        default: return 'Invalid format';
      }
    }
    return 'Invalid value';
  }
}