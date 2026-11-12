import { Component, OnInit } from '@angular/core';

export interface InvoiceLiability {
  id: number | string;
  invoiceNumber: string;
  vendorName: string;
  vendorCategory: string;
  projectName: string;
  invoiceDate: string;
  dueDate: string;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  liabilityBalance: number;
  status: 'Pending' | 'Partially Paid' | 'Paid' | 'Overdue';
  paymentMode?: string;
  refNo?: string;
}

@Component({
  selector: 'app-invoices-liabilities',
  standalone: false,
  templateUrl: './invoices-liabilities.html',
  styleUrl: './invoices-liabilities.scss',
})
export class InvoicesLiabilitiesComponent implements OnInit {
  invoices: InvoiceLiability[] = [
    {
      id: 1,
      invoiceNumber: 'INV-2026-0891',
      vendorName: 'Apex Steel Industries Pvt Ltd',
      vendorCategory: 'Structural Metals',
      projectName: 'Skyline Commercial Towers',
      invoiceDate: '2026-10-10',
      dueDate: '2026-11-10',
      subtotal: 1800000,
      taxAmount: 324000,
      totalAmount: 2124000,
      paidAmount: 1000000,
      liabilityBalance: 1124000,
      status: 'Partially Paid',
      paymentMode: 'NEFT',
      refNo: 'CMS-992144'
    },
    {
      id: 2,
      invoiceNumber: 'INV-2026-0904',
      vendorName: 'Ultratech Premix Logistics',
      vendorCategory: 'Ready Mix Concrete',
      projectName: 'Metro Rail Corridor 4',
      invoiceDate: '2026-10-15',
      dueDate: '2026-11-15',
      subtotal: 3200000,
      taxAmount: 576000,
      totalAmount: 3776000,
      paidAmount: 0,
      liabilityBalance: 3776000,
      status: 'Pending',
    },
    {
      id: 3,
      invoiceNumber: 'INV-2026-0742',
      vendorName: 'Voltas Equipment Fleet Ltd',
      vendorCategory: 'Plant & Heavy Machinery',
      projectName: 'Green Valley Residential Villas',
      invoiceDate: '2026-09-01',
      dueDate: '2026-10-01',
      subtotal: 950000,
      taxAmount: 171000,
      totalAmount: 1121000,
      paidAmount: 0,
      liabilityBalance: 1121000,
      status: 'Overdue',
    },
    {
      id: 4,
      invoiceNumber: 'INV-2026-0688',
      vendorName: 'Schneider Power Systems India',
      vendorCategory: 'Electrical & MEP',
      projectName: 'Skyline Commercial Towers',
      invoiceDate: '2026-08-20',
      dueDate: '2026-09-20',
      subtotal: 4200000,
      taxAmount: 756000,
      totalAmount: 4956000,
      paidAmount: 4956000,
      liabilityBalance: 0,
      status: 'Paid',
      paymentMode: 'RTGS',
      refNo: 'AXIS-558921'
    },
    {
      id: 5,
      invoiceNumber: 'INV-2026-0931',
      vendorName: 'Shree Cement Logistics',
      vendorCategory: 'Building Materials',
      projectName: 'Metro Rail Corridor 4',
      invoiceDate: '2026-10-22',
      dueDate: '2026-11-22',
      subtotal: 1450000,
      taxAmount: 261000,
      totalAmount: 1711000,
      paidAmount: 500000,
      liabilityBalance: 1211000,
      status: 'Partially Paid',
      paymentMode: 'Bank Transfer'
    }
  ];

  filteredInvoices: InvoiceLiability[] = [];
  searchQuery: string = '';
  statusFilter: string = 'All';
  selectedInvoice: InvoiceLiability | null = null;
  showPaymentModal: boolean = false;
  paymentAmount: number = 0;
  paymentReference: string = '';
  paymentMode: string = 'NEFT';

  ngOnInit(): void {
    this.filteredInvoices = [...this.invoices];
  }

  get totalLiability(): number {
    return this.invoices.reduce((sum, inv) => sum + (inv.liabilityBalance || 0), 0);
  }

  get totalInvoiced(): number {
    return this.invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
  }

  get totalSettled(): number {
    return this.invoices.reduce((sum, inv) => sum + (inv.paidAmount || 0), 0);
  }

  get pendingCount(): number {
    return this.invoices.filter(inv => inv.status === 'Pending' || inv.status === 'Overdue').length;
  }

  filterInvoices(): void {
    const q = this.searchQuery.toLowerCase().trim();
    this.filteredInvoices = this.invoices.filter(inv => {
      const matchesSearch = !q ||
        inv.invoiceNumber.toLowerCase().includes(q) ||
        inv.vendorName.toLowerCase().includes(q) ||
        inv.projectName.toLowerCase().includes(q);

      const matchesStatus = this.statusFilter === 'All' || inv.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  openPaymentModal(inv: InvoiceLiability): void {
    this.selectedInvoice = inv;
    this.paymentAmount = inv.liabilityBalance;
    this.paymentReference = '';
    this.paymentMode = 'NEFT';
    this.showPaymentModal = true;
  }

  recordPayment(): void {
    if (!this.selectedInvoice || this.paymentAmount <= 0) return;

    this.selectedInvoice.paidAmount += Number(this.paymentAmount);
    this.selectedInvoice.liabilityBalance = Math.max(0, this.selectedInvoice.totalAmount - this.selectedInvoice.paidAmount);

    if (this.selectedInvoice.liabilityBalance === 0) {
      this.selectedInvoice.status = 'Paid';
    } else {
      this.selectedInvoice.status = 'Partially Paid';
    }

    this.selectedInvoice.paymentMode = this.paymentMode;
    this.selectedInvoice.refNo = this.paymentReference || 'TXN-' + Math.floor(Math.random() * 89999 + 10000);

    this.showPaymentModal = false;
    this.filterInvoices();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Paid':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-300';
      case 'Partially Paid':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300';
      case 'Overdue':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 border-rose-300';
      default:
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-300';
    }
  }
}
