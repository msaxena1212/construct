import { Component, OnInit } from '@angular/core';

export interface ProcurementContract {
  id: string | number;
  contractNumber: string;
  title: string;
  vendorName: string;
  vendorCategory: string;
  projectName: string;
  contractValue: number;
  paidAmount: number;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Under Review' | 'Completed' | 'Draft';
  scope: string;
}

@Component({
  selector: 'app-contracts',
  standalone: false,
  templateUrl: './contracts.html',
  styleUrl: './contracts.scss',
})
export class Contracts implements OnInit {
  contracts: ProcurementContract[] = [
    {
      id: 1,
      contractNumber: 'PC-2026-081',
      title: 'Structural Steel Supply & Fabrication',
      vendorName: 'Apex Steel Industries Pvt Ltd',
      vendorCategory: 'Raw Materials & Metals',
      projectName: 'Skyline Commercial Towers',
      contractValue: 4500000,
      paidAmount: 2250000,
      startDate: '2026-03-01',
      endDate: '2026-11-30',
      status: 'Active',
      scope: 'Supply of IS 2062 Grade E250 structural steel beams, fabrication, and on-site delivery.'
    },
    {
      id: 2,
      contractNumber: 'PC-2026-094',
      title: 'Ready Mix Concrete (RMC) M35/M40 Batching Agreement',
      vendorName: 'Ultratech Premix Logistics',
      vendorCategory: 'Concrete & Masonry',
      projectName: 'Metro Rail Corridor 4',
      contractValue: 8200000,
      paidAmount: 5100000,
      startDate: '2026-01-15',
      endDate: '2026-12-31',
      status: 'Active',
      scope: 'Delivery of 14,000 m3 RMC with transit mixers, concrete pumping, and quality cube testing.'
    },
    {
      id: 3,
      contractNumber: 'PC-2026-102',
      title: 'Heavy Earthmoving Excavator & Crane Leasing',
      vendorName: 'Voltas Equipment Fleet Ltd',
      vendorCategory: 'Plant & Heavy Machinery',
      projectName: 'Green Valley Residential Villas',
      contractValue: 2800000,
      paidAmount: 1400000,
      startDate: '2026-04-10',
      endDate: '2026-09-30',
      status: 'Under Review',
      scope: 'Wet lease of 2x CAT 320D excavators and 1x 50-tonne mobile crawler crane with operators.'
    },
    {
      id: 4,
      contractNumber: 'PC-2026-115',
      title: 'MEP Electrical Distribution & Substation Setup',
      vendorName: 'Schneider Power Systems India',
      vendorCategory: 'Electrical & MEP',
      projectName: 'Skyline Commercial Towers',
      contractValue: 6400000,
      paidAmount: 6400000,
      startDate: '2025-08-01',
      endDate: '2026-05-15',
      status: 'Completed',
      scope: 'Supply and turnkey commissioning of 11kV transformers, HT panels, and busbar trunking.'
    },
    {
      id: 5,
      contractNumber: 'PC-2026-128',
      title: 'Structural Glazing and Facade Works',
      vendorName: 'Permasteelisa Architectural Glass',
      vendorCategory: 'Subcontracting',
      projectName: 'Metro Rail Corridor 4',
      contractValue: 3900000,
      paidAmount: 0,
      startDate: '2026-11-01',
      endDate: '2027-04-30',
      status: 'Draft',
      scope: 'DGU unitized facade installation, silicon sealants, wind load structural test certs.'
    }
  ];

  filteredContracts: ProcurementContract[] = [];
  searchQuery: string = '';
  statusFilter: string = 'All';
  showCreateModal: boolean = false;
  selectedContract: ProcurementContract | null = null;
  showDetailModal: boolean = false;

  newContract: Partial<ProcurementContract> = {
    title: '',
    vendorName: '',
    vendorCategory: 'Raw Materials & Metals',
    projectName: 'Skyline Commercial Towers',
    contractValue: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    status: 'Draft',
    scope: ''
  };

  ngOnInit(): void {
    this.filteredContracts = [...this.contracts];
  }

  get totalContractValue(): number {
    return this.contracts.reduce((sum, c) => sum + (c.contractValue || 0), 0);
  }

  get activeContractsCount(): number {
    return this.contracts.filter(c => c.status === 'Active').length;
  }

  get underReviewCount(): number {
    return this.contracts.filter(c => c.status === 'Under Review').length;
  }

  get totalPaidValue(): number {
    return this.contracts.reduce((sum, c) => sum + (c.paidAmount || 0), 0);
  }

  filterContracts(): void {
    const q = this.searchQuery.toLowerCase().trim();
    this.filteredContracts = this.contracts.filter(c => {
      const matchesSearch = !q ||
        c.contractNumber.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.vendorName.toLowerCase().includes(q) ||
        c.projectName.toLowerCase().includes(q);

      const matchesStatus = this.statusFilter === 'All' || c.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  viewContract(c: ProcurementContract): void {
    this.selectedContract = c;
    this.showDetailModal = true;
  }

  openCreateModal(): void {
    this.newContract = {
      title: '',
      vendorName: '',
      vendorCategory: 'Raw Materials & Metals',
      projectName: 'Skyline Commercial Towers',
      contractValue: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      status: 'Draft',
      scope: ''
    };
    this.showCreateModal = true;
  }

  saveNewContract(): void {
    if (!this.newContract.title || !this.newContract.vendorName || !this.newContract.contractValue) {
      alert('Please fill all mandatory fields (Title, Vendor, Value)');
      return;
    }

    const created: ProcurementContract = {
      id: Date.now(),
      contractNumber: `PC-2026-${String(Math.floor(Math.random() * 900) + 100)}`,
      title: this.newContract.title!,
      vendorName: this.newContract.vendorName!,
      vendorCategory: this.newContract.vendorCategory || 'Procurement',
      projectName: this.newContract.projectName || 'Active Site',
      contractValue: Number(this.newContract.contractValue),
      paidAmount: 0,
      startDate: this.newContract.startDate || new Date().toISOString().split('T')[0],
      endDate: this.newContract.endDate || '2027-01-01',
      status: (this.newContract.status as any) || 'Draft',
      scope: this.newContract.scope || 'Procurement agreement terms'
    };

    this.contracts.unshift(created);
    this.filterContracts();
    this.showCreateModal = false;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-300';
      case 'Under Review':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-300';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300';
    }
  }
}
