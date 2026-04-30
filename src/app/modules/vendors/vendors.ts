import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Vendor {
  id: string;
  name: string;
  services: string[];
  status: 'active' | 'pending' | 'inactive';
  gstNo: string;
  panCard: string;
  email: string;
  phone: string;
  budget: number;
  address: string;
  pincode: string;
  complianceScore: number;
}

export interface ActivityItem {
  icon: 'invoice' | 'cert' | 'assign';
  title: string;
  description: string;
  time: string;
}

@Component({
  selector: 'app-vendors',
  standalone: false,
  templateUrl: './vendors.html',
  styleUrl: './vendors.scss',
})
export class Vendors implements OnInit {
  showModal = false;
  filterActive = false;
  uploadedFile: File | null = null;
  isDragging = false;

  onboardForm: FormGroup;

  vendors: Vendor[] = [];

  activities: ActivityItem[] = [
    {
      icon: 'invoice',
      title: 'New Invoice Uploaded',
      description: 'SolidRock Concrete submitted invoice #SR-9012 for ₹12,500.00',
      time: '2 HOURS AGO'
    },
    {
      icon: 'cert',
      title: 'Certification Renewed',
      description: 'VoltStream Electrical updated their Liability Insurance documentation.',
      time: 'YESTERDAY'
    },
    {
      icon: 'assign',
      title: 'New Assignment',
      description: "Elite Finishes Co. assigned to 'Westside Loft' Interior painting phase.",
      time: '3 DAYS AGO'
    }
  ];

  get totalActive(): number {
    return this.vendors.filter(v => v.status === 'active').length;
  }

  get pendingPayments(): string {
    return '₹142k';
  }

  get compliantPartners(): string {
    return this.vendors.length > 0
      ? Math.round((this.vendors.filter(v => v.complianceScore >= 90).length / this.vendors.length) * 100) + '%'
      : '98%';
  }

  constructor(private fb: FormBuilder) {
    this.onboardForm = this.fb.group({
      vendorLegalName: ['', Validators.required],
      spocName: ['', Validators.required],
      spocPhone: ['', Validators.required],
      officialEmail: ['', [Validators.required, Validators.email]],
      officialPhone: ['', Validators.required],
      gstNo: ['', Validators.required],
      panCardNo: ['', Validators.required],
      physicalAddress: ['', Validators.required],
      pincode: ['', Validators.required],
      budgetAllocation: ['', Validators.required],
      services: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  openModal(): void {
    this.showModal = true;
    this.onboardForm.reset();
    this.uploadedFile = null;
  }

  closeModal(): void {
    this.showModal = false;
  }

  onSubmit(): void {
    if (this.onboardForm.valid) {
      const formData = this.onboardForm.value;
      const newVendor: Vendor = {
        id: Date.now().toString(),
        name: formData.vendorLegalName,
        services: formData.services.split(',').map((s: string) => s.trim()),
        status: 'active',
        gstNo: formData.gstNo,
        panCard: formData.panCardNo,
        email: formData.officialEmail,
        phone: formData.officialPhone,
        budget: parseFloat(formData.budgetAllocation.replace(/[^0-9.]/g, '')),
        address: formData.physicalAddress,
        pincode: formData.pincode,
        complianceScore: 95
      };
      this.vendors.push(newVendor);
      this.activities.unshift({
        icon: 'assign',
        title: 'New Vendor Onboarded',
        description: `${newVendor.name} has been successfully onboarded.`,
        time: 'JUST NOW'
      });
      this.closeModal();
    } else {
      this.onboardForm.markAllAsTouched();
    }
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
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
    if (event.dataTransfer?.files[0]) {
      this.uploadedFile = event.dataTransfer.files[0];
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.onboardForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}