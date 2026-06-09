import { Component, OnInit, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  VendorsServices,
  Vendor,
  VendorStats,
  Activity,
} from '../vendors/services/vendors-services';
import {
  VendorsLaborServices,
  LaborWorker,
  LaborStats,
} from './services/vendors-labor-services';
import { VendorInvoiceService, VendorInvoice } from '../vendors/services/vendors-invoice-services';
import { VendorAuditService, VendorAudit } from '../vendors/services/vendors-audit-services';
import { SkillMasterServices } from '../master/skill-master/skill-master-services';
import { ProjectService } from '../projects/services/project-service';
import { IProjectTask } from '../../shared/interfaces/project.interface';

@Component({
  selector: 'app-vendors',
  standalone: false,
  templateUrl: './vendors.html',
  styleUrls: ['./vendors.scss'],
})
export class Vendors implements OnInit {

  @Input() projectId: string | number = '';

  projectdata: any = null;
  private _pendingEditVendor: Vendor | null = null;
  private vendorService = inject(VendorsServices);
  private laborService = inject(VendorsLaborServices);
  private invoiceService = inject(VendorInvoiceService);
  private auditService = inject(VendorAuditService);
  private skillMasterService = inject(SkillMasterServices);
  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  allTasks: IProjectTask[] = [];
  skillOptions: { value: string; label: string }[] = [];
  milestoneDropdownOpen = false;
  subMilestoneDropdownOpen = false;
  taskDropdownOpen = false;
  selectedInvoice: VendorInvoice | null = null;
  showSettlementCards = false;
  selectedSettlementType: 'work_poc' | 'milestone' | 'lumpsum' = 'work_poc';
  milestones: any[] = [];
  subMilestones: any[] = [];
  milestoneTasks: any[] = [];
  selectedMilestoneId: number | null = null;
  selectedSubMilestoneId: number | null = null;
  selectedMilestoneIds: number[] = [];
  selectedSubMilestoneIds: number[] = [];
  selectedTaskIds: number[] = [];
  settlementCompletion: number | null = null;
  isLoadingMilestones = false;
  isLoadingSubMilestones = false;
  showAddModal = false;
  showInvoiceModal = false;
  showVendorDetailModal = false;
  payInvoiceeModal = false;
  showCancelInvoiceModal = false;
  showAuditModal = false;
  showBillingModal = false;
  showLaborModal = false;
  showAddLaborForm = false;
  currentStep = 1;
  stepError = '';
  fileError = '';
  contractFiles: File[] = [];

  readonly vendorSteps = [
    { num: 1, label: 'Basic Info' },
    { num: 2, label: 'KYC & Address' },
    { num: 3, label: 'Budget' },
    { num: 4, label: 'Documents' },
  ];

  paymentForm: {
    amount: number | null;
    project_id: number | null;
    mode: string;
    reference: string;
    clearance_date: string;
  } = {
      amount: null,
      project_id: null,
      mode: '',
      reference: '',
      clearance_date: '',
    };
  paymentError = '';
  isProcessingPayment = false;

  isEditMode = false;
  editingVendorId: string | null = null;

  isSaving = false;
  isDeleting = false;
  isSavingLabor = false;
  isSavingAudit = false;
  isSavingInvoice = false;
  isCancellingInvoice = false;
  laborError = '';

  viewingVendorId: string | null = null;
  selectedVendor: Vendor | undefined = undefined;
  vendors: Vendor[] = [];
  projects: any[] = [];
  stats: VendorStats = { totalActive: 0, pendingPayments: '₹0', compliantPartners: '0%' };
  activities: Activity[] = [];

  laborWorkers: LaborWorker[] = [];
  laborStats: LaborStats = {
    totalPersonnel: 0,
    onSite: 0,
    remaining: 0,
    activePersonnel: 0,
    skillCompliance: '0%',
    skillComposition: [],
  };
  laborLoading = false;

  invoices: VendorInvoice[] = [];
  vendorAudits: VendorAudit[] = [];

  newLabor: any = this.defaultLabor();
  newVendor: any = this.defaultVendor();
  invoiceForm: any = this.defaultInvoice();
  auditForm: any = { quality: 5, timeliness: 5, safety: 5, observations: '' };

  editingLaborId: number | null = null;
  editLaborForm: any = {};

  team = [{ name: 'All Members' }, { name: 'Marcus Thorne' }, { name: 'Sarah Chen' }];
  selectedMember = 'All Members';

  readonly statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'on_site', label: 'On Site' },
    { value: 'off_duty', label: 'Off Duty' },
    { value: 'inactive', label: 'Inactive' },
  ];

  readonly sumRate = (acc: number, w: LaborWorker): number =>
    acc + (Number(w.daily_rate) || 0) * (w.labor_count || 0);
  Math: any;


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.viewingVendorId = params.get('id');
      this.syncSelectedVendor();
    });
    this.getSkill();
    this.vendorService.vendors$.subscribe(v => {
      this.vendors = v;
      this.syncSelectedVendor();
    });
    this.vendorService.stats$.subscribe(s => (this.stats = s));
    this.vendorService.activities$.subscribe(a => (this.activities = a));
    this.laborService.workers$.subscribe(w => (this.laborWorkers = w));
    this.laborService.stats$.subscribe(s => (this.laborStats = s));
    this.laborService.loading$.subscribe(l => (this.laborLoading = l));
    this.invoiceService.invoices$.subscribe(inv => (this.invoices = inv));
    this.auditService.audits$.subscribe(audits => (this.vendorAudits = audits));
    this.loadProjects();
  }


  private loadVendorSubData(vendorId: string): void {
    this.invoiceService.loadInvoices(vendorId);
    this.auditService.loadAudits(vendorId);
    this.laborService.loadLaborForVendor(vendorId);

    const projectId = this.selectedVendor?.project_id;
    if (projectId) {
      this.loadProjectTasks(projectId);
      this.projectService.getProjectById(projectId).subscribe({
        next: (res: any) => {
          this.projectdata = res?.data ?? null;
          this.setProjectMilestones(res?.data?.milestones ?? []);
          this.updateSettlementCompletionFromProject();
        },
        error: (err: any) => {
          this.projectdata = null;
          console.error('Project load failed', err);
        },
      });
    } else {
      this.allTasks = [];
      this.projectdata = null;
      this.setProjectMilestones([]);
    }
  }

  getSkill(): void {
    this.skillMasterService.loadSkills().subscribe({
      next: (res: any) => {
        if (res.success && Array.isArray(res.data)) {
          this.skillOptions = res.data.map((s: any) => ({
            value: s.skill_name?.toLowerCase().replace(/\s+/g, '_') ?? s.id,
            label: s.skill_name ?? s.name,
          }));
          if (this._pendingEditVendor) {
            this.editVendorDetail(this._pendingEditVendor);
            this._pendingEditVendor = null;
          }
        }
      },
    });
  }

  private loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (res: any) => {
        this.projects = Array.isArray(res?.data) ? res.data : [];
      },
      error: (err: any) => console.error('Project list load failed', err),
    });
  }

  getProjectById(): void {
    if (!this.projectId) return;
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (res: any) => {
        this.projectdata = res?.data ?? null;
      },
      error: (err: any) => console.error('Project load failed', err),
    });
  }

  getProject(projectEvent: Event | string | number): void {
    const projectIdValue =
      typeof projectEvent === 'object' && projectEvent !== null && 'target' in projectEvent
        ? (projectEvent.target as HTMLSelectElement).value
        : projectEvent;

    const selectedId = Number(projectIdValue);

    this.milestones = [];
    this.subMilestones = [];
    this.milestoneTasks = [];
    this.selectedMilestoneId = null;
    this.selectedSubMilestoneId = null;
    this.selectedMilestoneIds = [];
    this.selectedSubMilestoneIds = [];
    this.selectedTaskIds = [];

    if (selectedId) {
      this.showSettlementCards = true;
      this.paymentForm.project_id = selectedId;
      this.loadProjectTasks(selectedId);

      this.isLoadingMilestones = true;
      this.projectService.getProjectById(selectedId).subscribe({
        next: (res: any) => {
          this.projectdata = res?.data ?? null;
          this.setProjectMilestones(res?.data?.milestones ?? []);
          this.updateSettlementCompletionFromProject();
          this.isLoadingMilestones = false;
        },
        error: (err: any) => {
          this.projectdata = null;
          this.isLoadingMilestones = false;
          console.error('Selected project load failed', err);
        },
      });
    } else {
      this.showSettlementCards = false;
      this.projectdata = null;
      this.allTasks = [];
      this.setProjectMilestones([]);
    }
  }


  private syncSelectedVendor(): void {
    if (!this.viewingVendorId) {
      this.selectedVendor = undefined;
      return;
    }
    const local = this.vendorService.getVendorById(this.viewingVendorId);
    if (local) {
      this.selectedVendor = local;
      this.loadVendorSubData(this.viewingVendorId);
    } else {
      this.vendorService.getVendorByIdFromApi(this.viewingVendorId).subscribe({
        next: v => {
          this.selectedVendor = v;
          this.loadVendorSubData(this.viewingVendorId!);
        },
        error: () => this.router.navigate(['/master/resources/vendors']),
      });
    }
  }

  get filteredVendors(): Vendor[] {
    if (this.selectedMember === 'All Members') return this.vendors;
    return this.vendors.filter(v => v.assignee === this.selectedMember);
  }


  get availableSubMilestones(): any[] {
    const allMilestones = this.projectdata?.milestones ?? [];
    if (this.selectedMilestoneIds.length === 0) return [];
    return allMilestones.filter((m: any) =>
      this.selectedMilestoneIds.includes(Number(m.parent_id))
    );
  }

  get availableTaskOptions(): IProjectTask[] {
    if (!this.selectedSubMilestoneIds.length) {
      return [];
    }

    const selectedParents =
      this.availableSubMilestones
        .filter(sm =>
          this.selectedSubMilestoneIds.includes(
            Number(sm.id)
          )
        )
        .map(sm => Number(sm.parent_id));

    return this.allTasks.filter(task =>
      selectedParents.includes(
        Number(task.milestone_id)
      )
    );
  }

  get isSettlementCompletionEditable(): boolean {
    return this.selectedSettlementType === 'work_poc';
  }

  get settlementCompletionLabel(): string {
    if (this.selectedSettlementType === 'work_poc') return '% Complete';
    if (this.selectedSettlementType === 'milestone') return '% Complete';
    return '% Complete';
  }

  get remainingAmount(): number {
    if (!this.selectedInvoice) return 0;
    const grandTotal = parseFloat(String(this.selectedInvoice.grand_total)) || 0;
    const alreadyPaid = parseFloat(String(this.selectedInvoice.paid_amount)) || 0;
    return Math.max(0, grandTotal - alreadyPaid);
  }

  get lumpsumPaidDisplay(): string {
    if (!this.selectedInvoice) return '';
    const entered = Number(this.paymentForm.amount) || 0;
    const total = Number(this.selectedInvoice.grand_total) || 0;
    return `₹${entered.toLocaleString('en-IN')} / ₹${total.toLocaleString('en-IN')}`;
  }


  private loadProjectTasks(projectId: string | number): void {
    this.projectService.getProjectTasks(projectId).subscribe({
      next: (res: any) => {
        this.allTasks = res?.data || [];
        this.syncSelectedTasksWithOptions();
      },
      error: (err: any) => {
        this.allTasks = [];
        console.error('Task load failed', err);
      },
    });
  }

  private setProjectMilestones(milestones: any[]): void {
    const allMilestones = Array.isArray(milestones) ? milestones : [];
    this.milestones = allMilestones.filter((m: any) => !m.parent_id);
    this.subMilestones = [];
    this.milestoneTasks = [];
  }

  private updateSettlementCompletionFromProject(): void {
    const fieldMap: Record<typeof this.selectedSettlementType, string> = {
      work_poc: 'work_poc_completion',
      milestone: 'milestone_completion',
      lumpsum: 'lumpsum_completion',
    };
    const rawValue = this.projectdata?.[fieldMap[this.selectedSettlementType]];
    this.settlementCompletion =
      rawValue == null || rawValue === '' ? null : Number(rawValue);
  }

  private getItemProgress(item: any): number | null {
    const rawProgress =
      item?.progress ?? item?.completion ?? item?.percent_complete ?? item?.percentage;
    if (rawProgress != null && rawProgress !== '') {
      const progress = Number(rawProgress);
      return Number.isFinite(progress) ? Math.max(0, Math.min(100, progress)) : null;
    }
    const status = String(item?.status ?? '').toLowerCase().replace(/\s+/g, '_');
    if (status === 'completed') return 100;
    if (status === 'in_progress' || status === 'review') return 50;
    if (status === 'pending' || status === 'to_do' || status === 'on_hold') return 0;
    return null;
  }

  private averageProgress(items: any[]): number | null {
    const values = items
      .map(item => this.getItemProgress(item))
      .filter((value): value is number => value !== null);
    if (values.length === 0) return null;
    return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  }

  private updateSettlementCompletionFromSelection(): void {
    const selectedTasks = this.allTasks.filter(task =>
      this.selectedTaskIds.includes(Number(task.id))
    );
    const selectedSubMilestones = this.availableSubMilestones.filter((sm: any) =>
      this.selectedSubMilestoneIds.includes(Number(sm.id))
    );
    const selectedMilestones = this.milestones.filter((m: any) =>
      this.selectedMilestoneIds.includes(Number(m.id))
    );

    const progress =
      this.averageProgress(selectedTasks) ??
      this.averageProgress(selectedSubMilestones) ??
      this.averageProgress(selectedMilestones);

    if (progress != null) {
      this.settlementCompletion = progress;
    } else {
      this.updateSettlementCompletionFromProject();
    }
  }

  onMilestoneMultiSelect(): void {
    this.selectedMilestoneIds = this.selectedMilestoneIds.map(id => Number(id));
    const allowedSubIds = this.availableSubMilestones.map((m: any) => Number(m.id));
    this.selectedSubMilestoneIds = this.selectedSubMilestoneIds.filter(id =>
      allowedSubIds.includes(Number(id))
    );
    this.syncSelectedTasksWithOptions();
    this.updateSettlementCompletionFromSelection();
  }

  onSubMilestoneMultiSelect(): void {
    this.selectedSubMilestoneIds =
      this.selectedSubMilestoneIds.map(id => Number(id));

    this.syncSelectedTasksWithOptions();
    this.updateSettlementCompletionFromSelection();
  }

  onTaskMultiSelect(): void {
    this.selectedTaskIds = this.selectedTaskIds.map(id => Number(id));
    this.updateSettlementCompletionFromSelection();
  }

  private syncSelectedTasksWithOptions(): void {
    const allowedTaskIds = this.availableTaskOptions.map(task => Number(task.id));
    this.selectedTaskIds = this.selectedTaskIds.filter(id =>
      allowedTaskIds.includes(Number(id))
    );
  }

  onMilestoneSelect(milestoneId: number): void {
    this.selectedMilestoneId = milestoneId;
    this.subMilestones = [];
    this.milestoneTasks = [];
    this.selectedSubMilestoneId = null;
    this.isLoadingSubMilestones = true;
    this.subMilestones = (this.projectdata?.milestones ?? []).filter(
      (m: any) => m.parent_id === milestoneId
    );
    this.isLoadingSubMilestones = false;
  }

  onSubMilestoneSelect(subMilestone: any): void {
    this.selectedSubMilestoneId = subMilestone.id;
    if (subMilestone.amount) {
      this.paymentForm.amount = Number(subMilestone.amount);
    }
    this.milestoneTasks = (this.allTasks ?? []).filter(
      (t: any) => t.milestone_id === subMilestone.id
    );
  }

  onSettlementTypeChange(type: 'work_poc' | 'milestone' | 'lumpsum'): void {
    this.selectedSettlementType = type;
    this.selectedMilestoneId = null;
    this.selectedSubMilestoneId = null;
    this.selectedMilestoneIds = [];
    this.selectedSubMilestoneIds = [];
    this.selectedTaskIds = [];
    this.subMilestones = [];
    this.milestoneTasks = [];
    this.milestoneDropdownOpen = false;
    this.subMilestoneDropdownOpen = false;
    this.taskDropdownOpen = false;
    this.updateSettlementCompletionFromProject();
  }

  openVendorDetail(vendor: Vendor): void {
    this.router.navigate(['/master/resources/vendors', vendor.id]);
  }

  closeDetail(): void {
    this.laborService.clearWorkers();
    this.invoiceService.clearInvoices();
    this.auditService.clearAudits();
    this.projectdata = null;
    this.router.navigate(['/master/resources/vendors']);
  }

  getFileName(filePath: string): string {
    return filePath.split('/').pop() ?? filePath;
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.editingVendorId = null;
    this.newVendor = this.defaultVendor();
    if (this.projectId) {
      this.newVendor.project_id = Number(this.projectId);
    }
    this.contractFiles = [];
    this.stepError = '';
    this.fileError = '';
    this.currentStep = 1;
    this.showAddModal = true;
  }

  editVendorDetail(vendor?: Vendor): void {
    const v = vendor ?? this.selectedVendor;
    if (!v) return;
    if (this.skillOptions.length === 0) {
      this._pendingEditVendor = v;
      return;
    }

    this.isEditMode = true;
    this.editingVendorId = v.id;
    this.currentStep = 1;
    this.stepError = '';
    this.fileError = '';
    this.contractFiles = [];

    const rawSkills: string[] = Array.isArray(v.skill)
      ? [...v.skill]
      : v.skill
        ? String(v.skill).split(',').map((s: string) => s.trim()).filter(Boolean)
        : [];

    const normalizedSkills = rawSkills.map(raw => {
      const match = this.skillOptions.find(
        opt =>
          opt.label.toLowerCase() === raw.toLowerCase() ||
          opt.value.toLowerCase() === raw.toLowerCase() ||
          opt.label.toLowerCase().replace(/\s+/g, '_') === raw.toLowerCase()
      );
      return match ? match.label : raw;
    });

    this.newVendor = {
      name: v.name,
      email: v.email,
      phone: v.phone,
      spoc: { name: v.spoc?.name ?? '', phone: v.spoc?.phone ?? '' },
      kyc: { gst: v.kyc?.gst ?? '', pan: v.kyc?.pan ?? '' },
      address: { street: v.address?.street ?? '', pincode: v.address?.pincode ?? '' },
      budget: String(v.budget_allocation ?? ''),
      skill: normalizedSkills,
      project_id: v.project_id ? Number(v.project_id) : null,
    };

    this.showVendorDetailModal = false;
    this.showAddModal = true;
  }

  nextStep(): void {
    this.stepError = '';
    if (this.currentStep === 1) {
      if (!this.newVendor.name?.trim()) { this.stepError = 'Vendor Legal Name is required.'; return; }
      if (!this.newVendor.spoc.name?.trim()) { this.stepError = 'SPOC Name is required.'; return; }
      if (!this.newVendor.spoc.phone?.trim() || this.newVendor.spoc.phone.length < 10) {
        this.stepError = 'SPOC Phone must be 10 digits.'; return;
      }
      if (!this.newVendor.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.newVendor.email)) {
        this.stepError = 'Enter a valid official email address.'; return;
      }
      if (!this.newVendor.phone?.trim() || this.newVendor.phone.length < 10) {
        this.stepError = 'Official phone must be 10 digits.'; return;
      }
    }
    if (this.currentStep === 2) {
      const gst = this.newVendor.kyc.gst?.trim();
      const pan = this.newVendor.kyc.pan?.trim();
      if (!gst && !pan) { this.stepError = 'At least one of GST No. or PAN Card No. is required.'; return; }
      if (gst && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i.test(gst)) {
        this.stepError = 'Invalid GST format. Expected: 22AAAAA0000A1Z5'; return;
      }
      if (pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(pan)) {
        this.stepError = 'Invalid PAN format. Expected: ABCDE1234F'; return;
      }
      if (!this.newVendor.address.street?.trim()) { this.stepError = 'Physical address is required.'; return; }
      if (!this.newVendor.address.pincode?.trim() || this.newVendor.address.pincode.length < 6) {
        this.stepError = 'Enter a valid 6-digit pincode.'; return;
      }
    }
    if (this.currentStep === 3) {
      if (!this.newVendor.budget?.toString().trim()) { this.stepError = 'Budget allocation is required.'; return; }
      if (!this.newVendor.skill || this.newVendor.skill.length === 0) {
        this.stepError = 'At least one skill is required.'; return;
      }
    }
    if (this.currentStep < 4) this.currentStep++;
  }

  prevStep(): void {
    this.stepError = '';
    if (this.currentStep > 1) this.currentStep--;
  }

  addVendor(): void {
    if (this.isSaving) return;
    this.stepError = '';
    this.isEditMode ? this.updateVendorData() : this.createVendorData();
  }

  private createVendorData(): void {
    debugger
    const fd = new FormData();
    fd.append('vendorLegalName', this.newVendor.name);
    fd.append('spocName', this.newVendor.spoc.name);
    fd.append('spocPhone', this.newVendor.spoc.phone);
    fd.append('officialEmail', this.newVendor.email);
    fd.append('officialPhone', this.newVendor.phone);
    fd.append('gstNo', this.newVendor.kyc.gst ?? '');
    fd.append('panCardNo', this.newVendor.kyc.pan ?? '');
    fd.append('physicalAddress', this.newVendor.address.street);
    fd.append('pincode', this.newVendor.address.pincode);
    fd.append('budgetAllocation', this.newVendor.budget);
    fd.append('skill', Array.isArray(this.newVendor.skill)
      ? this.newVendor.skill.join(', ')
      : this.newVendor.skill);
    const resolvedProjectId = this.newVendor.project_id || this.projectId || null;
    if (resolvedProjectId) {
      fd.append('project_id', String(resolvedProjectId));
    }

    this.contractFiles.forEach(file => fd.append('contractFiles', file));

    this.isSaving = true;
    this.vendorService.createVendor(fd).subscribe({
      next: () => {
        this.isSaving = false;
        this.showAddModal = false;
        this.currentStep = 1;
        this.contractFiles = [];
      },
      error: (err: any) => {
        this.isSaving = false;
        this.stepError = err?.error?.message ?? 'Vendor onboard failed. Please try again.';
      },
    });
  }

  private updateVendorData(): void {
    if (!this.editingVendorId) return;

    const fd = new FormData();
    fd.append('name', this.newVendor.name);
    fd.append('spoc_name', this.newVendor.spoc.name);
    fd.append('spoc_phone', this.newVendor.spoc.phone);
    fd.append('official_email', this.newVendor.email);
    fd.append('official_phone', this.newVendor.phone);
    fd.append('gst_no', this.newVendor.kyc.gst?.toUpperCase() || '');
    fd.append('pan_card_no', this.newVendor.kyc.pan?.toUpperCase() || '');
    fd.append('physical_address', this.newVendor.address.street);
    fd.append('pincode', this.newVendor.address.pincode);
    fd.append('budget_allocation', String(
      parseFloat(String(this.newVendor.budget).replace(/[^0-9.]/g, '')) || 0
    ));
    fd.append('skill', Array.isArray(this.newVendor.skill)
      ? this.newVendor.skill.join(', ')
      : this.newVendor.skill);
    const resolvedProjectId = this.newVendor.project_id || this.projectId || null;
    if (resolvedProjectId) {
      fd.append('project_id', String(resolvedProjectId));
    }

    this.contractFiles.forEach(file => fd.append('contractFiles', file));

    this.isSaving = true;
    this.vendorService.updateVendor(this.editingVendorId, fd).subscribe({
      next: () => {
        this.isSaving = false;
        this.showAddModal = false;
        this.isEditMode = false;
        this.editingVendorId = null;
        this.currentStep = 1;
        this.contractFiles = [];
        if (this.selectedVendor) {
          const updated = this.vendorService.getVendorById(this.selectedVendor.id);
          if (updated) this.selectedVendor = updated;
        }
      },
      error: (err: any) => {
        this.isSaving = false;
        this.stepError = err?.error?.message ?? 'Update failed. Please try again.';
      },
    });
  }

  toggleSkill(skillLabel: string): void {
    if (!Array.isArray(this.newVendor.skill)) this.newVendor.skill = [];
    const idx = this.newVendor.skill.findIndex(
      (s: string) => s.toLowerCase() === skillLabel.toLowerCase()
    );
    if (idx === -1) {
      this.newVendor.skill.push(skillLabel);
    } else {
      this.newVendor.skill.splice(idx, 1);
    }
  }

  isSkillSelected(skillLabel: string): boolean {
    if (!Array.isArray(this.newVendor.skill)) return false;
    return this.newVendor.skill.some(
      (s: string) => s.toLowerCase() === skillLabel.toLowerCase()
    );
  }

  deleteVendor(id: string): void {
    if (this.isDeleting) return;
    if (!confirm('Are you sure you want to remove this vendor?')) return;
    this.isDeleting = true;
    this.vendorService.deleteVendor(id).subscribe({
      next: () => { this.isDeleting = false; },
      error: (err: any) => {
        this.isDeleting = false;
        alert('Delete failed: ' + (err?.error?.message ?? 'Server error'));
      },
    });
  }

  onContractFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    this.fileError = '';
    const MAX_SIZE = 10 * 1024 * 1024;
    const ALLOWED = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
    ];
    const incoming = Array.from(input.files);
    const combined = [...this.contractFiles, ...incoming];
    if (combined.length > 10) { this.fileError = 'Maximum 10 files allowed.'; return; }
    for (const f of incoming) {
      if (!ALLOWED.includes(f.type)) { this.fileError = `"${f.name}" has an unsupported format.`; return; }
      if (f.size > MAX_SIZE) { this.fileError = `"${f.name}" exceeds the 10 MB limit (${this.getFileSize(f.size)}).`; return; }
    }
    this.contractFiles = combined;
    input.value = '';
  }

  removeContractFile(index: number): void {
    this.contractFiles = this.contractFiles.filter((_, i) => i !== index);
    this.fileError = '';
  }

  getFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  getFileIcon(name: string): string {
    const ext = name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'picture_as_pdf';
    if (ext === 'doc' || ext === 'docx') return 'description';
    if (['jpg', 'jpeg', 'png'].includes(ext!)) return 'image';
    return 'attach_file';
  }

  getFileIconBg(name: string): string {
    const ext = name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'bg-red-100 dark:bg-red-900/30';
    if (ext === 'doc' || ext === 'docx') return 'bg-blue-100 dark:bg-blue-900/30';
    if (['jpg', 'jpeg', 'png'].includes(ext!)) return 'bg-green-100 dark:bg-green-900/30';
    return 'bg-surface-container';
  }

  getFileIconColor(name: string): string {
    const ext = name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'text-red-600';
    if (ext === 'doc' || ext === 'docx') return 'text-blue-600';
    if (['jpg', 'jpeg', 'png'].includes(ext!)) return 'text-green-600';
    return 'text-outline';
  }

  openSubmission(): void {
    if (!this.selectedVendor) return;
    let started = false;
    const sub = this.invoiceService.loading$.subscribe((loading) => {
      if (started && !loading) {
        this.invoiceForm = this.defaultInvoice();
        this.invoiceForm.project_id = Number(this.selectedVendor?.project_id) || null;
        this.showInvoiceModal = true;
        sub.unsubscribe();
      }
    });
    started = true;
    this.invoiceService.loadInvoices(this.selectedVendor.id);
  }

  onTypeChange(item: any): void {
    if (item.type !== 'labor') item.hours = 0;
    this.calculateInvoiceTotals();
  }

  hasLaborItems(): boolean {
    return this.invoiceForm.items.some((item: any) => item.type === 'labor');
  }

  addInvoiceItem(): void {
    this.invoiceForm.items.push({
      type: '', description: '', quantity: 1, hours: 0,
      unitPrice: 0, gst: 18, gstAmount: 0, baseAmount: 0, total: 0,
    });
  }

  removeInvoiceItem(index: number): void {
    if (this.invoiceForm.items.length > 1) {
      this.invoiceForm.items.splice(index, 1);
      this.calculateInvoiceTotals();
    }
  }

  calculateInvoiceTotals(): void {
    let subtotal = 0;
    let totalGST = 0;
    const gstMap: Record<number, number> = {};

    this.invoiceForm.items.forEach((item: any) => {
      const qty = Number(item.quantity) || 0;
      const rate = Number(item.unitPrice) || 0;
      const hours = Number(item.hours) || 0;
      const gst = Number(item.gst) || 0;

      item.baseAmount = item.type === 'labor' ? qty * hours * rate : qty * rate;
      item.gstAmount = (item.baseAmount * gst) / 100;
      item.total = item.baseAmount + item.gstAmount;

      subtotal += item.baseAmount;
      totalGST += item.gstAmount;
      if (item.gstAmount > 0) {
        gstMap[gst] = (gstMap[gst] || 0) + item.gstAmount;
      }
    });

    this.invoiceForm.subtotal = subtotal;
    this.invoiceForm.taxAmount = totalGST;
    this.invoiceForm.grandTotal = subtotal + totalGST;
    this.invoiceForm.gstBreakdown = Object.entries(gstMap)
      .map(([rateStr, amount]) => ({ rate: Number(rateStr), amount }))
      .sort((a, b) => a.rate - b.rate);
  }

  submitInvoice(): void {
    if (this.isSavingInvoice || !this.selectedVendor) return;
    this.isSavingInvoice = true;

    const payload = {
      project_id: this.invoiceForm.project_id,
      invoice_number: this.invoiceForm.number,
      invoice_date: this.invoiceForm.date,
      items: this.invoiceForm.items,
      subtotal: this.invoiceForm.subtotal,
      tax_rate: this.invoiceForm.taxRate ?? 0,
      tax_amount: this.invoiceForm.taxAmount,
      grand_total: this.invoiceForm.grandTotal,
    };

    this.invoiceService.createInvoice(this.selectedVendor.id, payload).subscribe({
      next: () => {
        this.isSavingInvoice = false;
        this.showInvoiceModal = false;
        this.vendorService.loadStats();
      },
      error: (err: any) => {
        this.isSavingInvoice = false;
        alert('Invoice submission failed: ' + (err?.error?.message ?? 'Server error'));
      },
    });
  }

  payInvoice(inv: VendorInvoice): void {
    this.selectedInvoice = inv;
    const selectedProjectId = inv.project_id ? Number(inv.project_id) : null;

    this.paymentForm = {
      amount: null,
      project_id: selectedProjectId,
      mode: '',
      reference: '',
      clearance_date: '',
    };

    this.selectedSettlementType = 'work_poc';
    this.selectedMilestoneIds = [];
    this.selectedSubMilestoneIds = [];
    this.selectedTaskIds = [];
    this.settlementCompletion = null;
    this.milestones = [];
    this.subMilestones = [];
    this.milestoneTasks = [];
    this.showSettlementCards = false;
    this.projectdata = null;

    this.paymentError = '';
    this.isProcessingPayment = false;
    this.payInvoiceeModal = true;
    if (selectedProjectId) {
      this.getProject(selectedProjectId);
    }
  }

  closePayModal(): void {
    this.payInvoiceeModal = false;
    this.selectedInvoice = null;
    this.paymentForm = { amount: null, project_id: null, mode: '', reference: '', clearance_date: '' };
    this.paymentError = '';
    this.isProcessingPayment = false;
    this.showSettlementCards = false;
    this.selectedSettlementType = 'work_poc';
    this.selectedMilestoneIds = [];
    this.selectedSubMilestoneIds = [];
    this.selectedTaskIds = [];
    this.settlementCompletion = null;
    this.milestones = [];
    this.subMilestones = [];
    this.milestoneTasks = [];
    this.projectdata = null;
    this.milestoneDropdownOpen = false;
    this.subMilestoneDropdownOpen = false;
    this.taskDropdownOpen = false;
  }

  onPaymentModeChange(mode: string): void {
    this.paymentForm.mode = mode;
    if (mode === 'Cash') {
      this.paymentForm.reference = '';
      this.paymentForm.clearance_date = '';
    }
    if (mode !== 'Cheque') {
      this.paymentForm.clearance_date = '';
    }
  }

  get todayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  get threeMonthsAgoDate(): string {
    const date = new Date();
    date.setMonth(date.getMonth() - 3);
    return date.toISOString().split('T')[0];
  }
  confirmPayment(): void {
    if (!this.selectedInvoice || this.isProcessingPayment) return;
    this.paymentError = '';

    if (!this.paymentForm.amount || this.paymentForm.amount <= 0) {
      this.paymentError = 'Please enter a valid amount.';
      return;
    }
    if (!this.paymentForm.mode) {
      this.paymentError = 'Please select a payment mode.';
      return;
    }
    if (this.paymentForm.mode === 'Cheque') {
      if (!this.paymentForm.clearance_date) {
        this.paymentError = 'Please select cheque clearance date.';
        return;
      }

      const selectedDate = new Date(this.paymentForm.clearance_date);
      const today = new Date();
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

      selectedDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      threeMonthsAgo.setHours(0, 0, 0, 0);

      if (selectedDate < threeMonthsAgo) {
        this.paymentError = 'Cheque clearance date cannot be more than 3 months in the past.';
        return;
      }

      if (selectedDate > today) {
        this.paymentError = 'Cheque clearance date cannot be in the future.';
        return;
      }
    }
    this.isProcessingPayment = true;

    const paidNow = Number(this.paymentForm.amount);
    const alreadyPaid = Number(this.selectedInvoice.paid_amount) || 0;
    const grandTotal = Number(this.selectedInvoice.grand_total);
    const totalAfterThis = alreadyPaid + paidNow;
    const resolvedStatus = totalAfterThis >= grandTotal ? 'Paid' : 'Partially Paid';

    const payload: any = {
      status: resolvedStatus,
      amount: paidNow,
      mode: this.paymentForm.mode,
      reference: this.paymentForm.reference || null,
      clearance_date: this.paymentForm.clearance_date || null,
    };

    if (this.showSettlementCards && this.paymentForm.project_id) {
      payload.settlement_type = this.selectedSettlementType;
      payload.settlement_completion = this.settlementCompletion;
      payload.milestone_ids = [...this.selectedMilestoneIds];
      payload.sub_milestone_ids = [...this.selectedSubMilestoneIds];
      payload.task_ids = [...this.selectedTaskIds];
    }

    this.invoiceService.updateStatus(this.selectedInvoice.id, payload).subscribe({
      next: () => {
        this.isProcessingPayment = false;
        this.closePayModal();
        if (this.selectedVendor) {
          this.invoiceService.loadInvoices(this.selectedVendor.id);
          this.vendorService.loadStats();
        }
      },
      error: (err: any) => {
        this.isProcessingPayment = false;
        this.paymentError = err?.error?.message ?? 'Payment failed. Please try again.';
      },
    });
  }

  openCancelInvoiceDialog(inv: VendorInvoice): void {
    this.selectedInvoice = inv;
    this.showCancelInvoiceModal = true;
  }

  closeCancelInvoiceDialog(): void {
    this.showCancelInvoiceModal = false;
    this.selectedInvoice = null;
  }

  confirmCancelInvoice(): void {
    if (!this.selectedInvoice || this.isCancellingInvoice) return;
    this.isCancellingInvoice = true;

    this.invoiceService.updateStatus(this.selectedInvoice.id, { status: 'Cancelled' }).subscribe({
      next: () => {
        this.isCancellingInvoice = false;
        this.closeCancelInvoiceDialog();
        if (this.selectedVendor) {
          this.invoiceService.loadInvoices(this.selectedVendor.id);
          this.vendorService.loadStats();
        }
      },
      error: (err: any) => {
        this.isCancellingInvoice = false;
        alert('Cancel failed: ' + (err?.error?.message ?? 'Server error'));
      },
    });
  }

  toggleMilestoneSelection(id: number): void {
    const idx = this.selectedMilestoneIds.indexOf(id);
    if (idx === -1) {
      this.selectedMilestoneIds.push(id);
    } else {
      this.selectedMilestoneIds.splice(idx, 1);
    }
    this.onMilestoneMultiSelect();
    this.milestoneDropdownOpen = false;
  }

  toggleSubMilestoneSelection(id: number): void {
    const idx = this.selectedSubMilestoneIds.indexOf(id);
    if (idx === -1) {
      this.selectedSubMilestoneIds.push(id);
    } else {
      this.selectedSubMilestoneIds.splice(idx, 1);
    }
    this.onSubMilestoneMultiSelect();
    this.subMilestoneDropdownOpen = false;
  }

  toggleTaskSelection(id: number): void {
    const idx = this.selectedTaskIds.indexOf(id);
    if (idx === -1) {
      this.selectedTaskIds.push(id);
    } else {
      this.selectedTaskIds.splice(idx, 1);
    }
    this.onTaskMultiSelect();
    this.taskDropdownOpen = false;
  }

  viewInvoice(inv: VendorInvoice): void {
    const vendor = this.selectedVendor;

    let invoiceItems: any[] = [];
    try {
      invoiceItems = Array.isArray(inv.items) ? inv.items : JSON.parse(inv.items as any);
    } catch { invoiceItems = []; }

    const gstMap: Record<number, number> = {};
    invoiceItems.forEach((item: any) => {
      const gstRate = Number(item.gst) || 0;
      const gstAmt = Number(item.gstAmount) || 0;
      if (gstAmt > 0) gstMap[gstRate] = (gstMap[gstRate] || 0) + gstAmt;
    });

    const taxBreakdownRows = Object.entries(gstMap)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([rate, amount]) =>
        `<div style="display:flex;justify-content:space-between;padding:5px 0 5px 12px;border-bottom:1px solid #f1f5f9;">
          <span style="color:#64748b;font-size:13px;">TAX @ ${rate}%</span>
          <span style="font-weight:600;">₹${Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
        </div>`
      ).join('');

    const hasLabor = invoiceItems.some((item: any) => item.type === 'labor');
    const itemRows = invoiceItems.map((item: any) => {
      const isLabor = item.type === 'labor';
      const typeLabel = item.type
        ? String(item.type).charAt(0).toUpperCase() + String(item.type).slice(1)
        : '—';
      return `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${typeLabel}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${item.description || '—'}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.quantity || 0}</td>
        ${hasLabor ? `<td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${isLabor ? (item.hours || 0) + 'h' : ''}</td>` : ''}
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;">₹${Number(item.unitPrice || 0).toLocaleString('en-IN')}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.gst || 0}%</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;">₹${Number(item.gstAmount || 0).toLocaleString('en-IN')}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:700;">₹${Number(item.total || 0).toLocaleString('en-IN')}</td>
      </tr>`;
    }).join('');

    const paymentHistory: any[] = Array.isArray(inv.payment_history) ? inv.payment_history : [];
    const paymentHistoryRows = paymentHistory.length > 0 ? `
      <div style="margin-top:32px;">
        <h3 style="font-size:15px;font-weight:900;margin-bottom:12px;color:#1e293b;">Payment History</h3>
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr style="background:#f1f5f9;">
              <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.05em;">#</th>
              <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.05em;">Date</th>
              <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.05em;">Mode</th>
              <th style="padding:8px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.05em;">Reference</th>
              <th style="padding:8px 12px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:.05em;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${paymentHistory.map((p: any, i: number) => `
              <tr>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${i + 1}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${new Date(p.paid_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${p.mode || '—'}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${p.reference || '—'}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:700;text-align:right;">₹${Number(p.amount).toLocaleString('en-IN')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>` : '';

    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Invoice ${inv.invoice_number}</title>
  <style>
    body { font-family: sans-serif; padding: 40px; color: #1e293b; }
    h1 { font-size: 24px; font-weight: 900; margin: 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    th { background: #f1f5f9; padding: 10px 12px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: .05em; }
    @media print { button { display: none !important; } }
  </style>
</head>
<body>
  <div style="display:flex;justify-content:space-between;align-items:flex-start;">
    <div>
      <h1>Tax Invoice</h1>
      <p style="color:#64748b;margin:4px 0 0;">${vendor?.name ?? ''}</p>
    </div>
    <div style="text-align:right;">
      <p style="font-weight:900;font-size:18px;margin:0;">${inv.invoice_number}</p>
      <p style="color:#64748b;margin:4px 0 0;">${this.formatDate(inv.invoice_date)}</p>
      <span style="display:inline-block;padding:4px 10px;border-radius:9999px;font-size:11px;font-weight:700;
        background:${inv.status === 'Paid' ? '#dcfce7' : inv.status === 'Cancelled' ? '#fee2e2' : '#fef3c7'};
        color:${inv.status === 'Paid' ? '#15803d' : inv.status === 'Cancelled' ? '#dc2626' : '#b45309'};margin-top:6px;">
        ${inv.status}
      </span>
    </div>
  </div>
  ${vendor ? `
  <div style="margin-top:24px;padding:16px;background:#f8fafc;border-radius:8px;">
    <p style="margin:0;font-weight:700;">Bill To: ${vendor.name}</p>
    <p style="margin:4px 0 0;color:#64748b;">${vendor.address?.street || ''} ${vendor.address?.pincode || ''}</p>
    <p style="margin:4px 0 0;color:#64748b;">GST: ${vendor.kyc?.gst || '—'} | PAN: ${vendor.kyc?.pan || '—'}</p>
  </div>` : ''}
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Description</th>
        <th style="text-align:center;">Qty</th>
        ${hasLabor ? '<th style="text-align:center;">Hours</th>' : ''}
        <th style="text-align:right;">Rate (₹)</th>
        <th style="text-align:center;">Tax %</th>
        <th style="text-align:right;">Tax (₹)</th>
        <th style="text-align:right;">Total (₹)</th>
      </tr>
    </thead>
    <tbody>${itemRows}</tbody>
  </table>
  <div style="margin-top:24px;max-width:340px;margin-left:auto;">
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e5e7eb;">
      <span style="color:#64748b;">Subtotal (excl. Tax)</span>
      <span style="font-weight:700;">₹${Number(inv.subtotal).toLocaleString('en-IN')}</span>
    </div>
    ${taxBreakdownRows}
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #e5e7eb;">
      <span style="color:#64748b;">Total Tax</span>
      <span style="font-weight:700;">₹${Number(inv.tax_amount).toLocaleString('en-IN')}</span>
    </div>
    <div style="display:flex;justify-content:space-between;padding:12px 0;">
      <span style="font-weight:900;">Grand Total</span>
      <span style="color:#4f46e5;font-size:18px;font-weight:900;">₹${Number(inv.grand_total).toLocaleString('en-IN')}</span>
    </div>
    ${Number(inv.paid_amount) > 0 ? `
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-top:2px solid #e5e7eb;">
      <span style="color:#16a34a;font-weight:700;">Paid Amount</span>
      <span style="color:#16a34a;font-weight:900;">₹${Number(inv.paid_amount).toLocaleString('en-IN')}</span>
    </div>
    <div style="display:flex;justify-content:space-between;padding:8px 0;">
      <span style="color:#dc2626;font-weight:700;">Remaining</span>
      <span style="color:#dc2626;font-weight:900;">₹${Math.max(0, Number(inv.grand_total) - Number(inv.paid_amount)).toLocaleString('en-IN')}</span>
    </div>` : ''}
  </div>
  ${paymentHistoryRows}
  <div style="margin-top:32px;text-align:center;">
    <button onclick="window.print()"
      style="background:#4f46e5;color:#fff;padding:10px 28px;border:none;border-radius:8px;font-weight:700;font-size:14px;cursor:pointer;">
      Print / Save as PDF
    </button>
  </div>
</body>
</html>`;

    const win = window.open('', '_blank');
    if (win) { win.document.write(html); win.document.close(); }
  }

  openBilling(): void {
    if (this.selectedVendor && this.invoices.length === 0) {
      this.invoiceService.loadInvoices(this.selectedVendor.id);
    }
    this.showBillingModal = true;
  }

  get totalBilled(): number {
    return this.invoices.reduce((acc, inv) => acc + Number(inv.grand_total), 0);
  }

  openAudit(): void {
    const latest = this.vendorAudits[0];
    this.auditForm = latest
      ? {
        quality: Number(latest.quality),
        timeliness: Number(latest.timeliness),
        safety: Number(latest.safety),
        observations: latest.observations ?? '',
      }
      : { quality: 5, timeliness: 5, safety: 5, observations: '' };
    this.showAuditModal = true;
  }

  get auditScore(): number {
    return Math.round(
      ((this.auditForm.quality + this.auditForm.timeliness + this.auditForm.safety) / 30) * 100
    );
  }

  submitAudit(): void {
    if (this.isSavingAudit || !this.selectedVendor) return;
    this.isSavingAudit = true;
    this.auditService.createAudit(this.selectedVendor.id, {
      quality: this.auditForm.quality,
      timeliness: this.auditForm.timeliness,
      safety: this.auditForm.safety,
      observations: this.auditForm.observations,
    }).subscribe({
      next: (res: any) => {
        this.isSavingAudit = false;
        this.showAuditModal = false;
        if (this.selectedVendor && res.data?.composite_score != null) {
          this.selectedVendor.compliance_score = Math.round(res.data.composite_score);
        }
        this.vendorService.loadVendors();
      },
      error: (err: any) => {
        this.isSavingAudit = false;
        alert('Audit failed: ' + (err?.error?.message ?? 'Server error'));
      },
    });
  }


  openVendorDetailData(): void {
    this.showVendorDetailModal = true;
  }

  updateVendorStatus(status: string): void {
    if (!this.selectedVendor) return;
    const statusKey = status.toLowerCase() as 'active' | 'pending' | 'inactive';
    this.vendorService.updateVendor(this.selectedVendor.id, { status: statusKey }).subscribe({
      next: () => {
        const updated = this.vendorService.getVendorById(this.selectedVendor!.id);
        if (updated) this.selectedVendor = updated;
      },
      error: (err: any) =>
        alert('Status update failed: ' + (err?.error?.message ?? 'Server error')),
    });
  }


  openLaborModal(): void {
    if (!this.selectedVendor) return;
    this.newLabor = this.defaultLabor();
    this.showAddLaborForm = false;
    this.laborError = '';
    this.editingLaborId = null;
    this.laborService.loadLaborForVendor(this.selectedVendor.id);
    this.showLaborModal = true;
  }

  closeLaborModal(): void {
    this.showLaborModal = false;
    this.showAddLaborForm = false;
    this.editingLaborId = null;
  }

  toggleAddLaborForm(): void {
    this.newLabor = this.defaultLabor();
    this.laborError = '';
    this.editingLaborId = null;
    this.showAddLaborForm = !this.showAddLaborForm;
  }

  submitLabor(): void {
    if (this.isSavingLabor || !this.selectedVendor) return;
    this.laborError = '';
    if (!this.newLabor.skill) { this.laborError = 'Skill is required.'; return; }

    const laborCount = Math.max(1, parseInt(this.newLabor.labor_count) || 1);
    const payload = {
      vendor_id: this.selectedVendor.id,
      skill: this.newLabor.skill,
      status: this.newLabor.status || 'active',
      daily_rate: parseFloat(this.newLabor.daily_rate) || 0,
      labor_count: laborCount,
      assign_worker: this.newLabor.assign_worker || null,
    };

    this.isSavingLabor = true;
    this.laborService.addWorker(payload).subscribe({
      next: () => {
        this.isSavingLabor = false;
        this.showAddLaborForm = false;
        this.newLabor = this.defaultLabor();
      },
      error: (err: any) => {
        this.isSavingLabor = false;
        this.laborError = err?.error?.message ?? 'Failed to add worker.';
      },
    });
  }

  editLaborWorker(id: number): void {
    const worker = this.laborWorkers.find(w => w.id === id);
    if (!worker) return;
    this.editingLaborId = id;
    this.editLaborForm = {
      skill: worker.skillRaw,
      status: worker.status,
      daily_rate: worker.daily_rate,
      labor_count: worker.labor_count,
      assign_worker: worker.assign_worker ?? '',
    };
  }

  saveLaborEdit(id: number): void {
    const payload = {
      skill: this.editLaborForm.skill,
      status: this.editLaborForm.status,
      daily_rate: parseFloat(this.editLaborForm.daily_rate) || 0,
      labor_count: Math.max(1, parseInt(this.editLaborForm.labor_count) || 1),
      assign_worker: this.editLaborForm.assign_worker ?? null,
    };
    this.laborService.updateWorker(id, payload).subscribe({
      next: () => { this.editingLaborId = null; },
      error: (err: any) =>
        alert('Update failed: ' + (err?.error?.message ?? 'Server error')),
    });
  }

  cancelLaborEdit(): void {
    this.editingLaborId = null;
  }

  deleteLaborWorker(id: number): void {
    if (!confirm('Remove this worker?')) return;
    this.laborService.deleteWorker(id).subscribe({
      error: (err: any) =>
        alert('Delete failed: ' + (err?.error?.message ?? 'Server error')),
    });
  }

  updateLaborStatus(worker: LaborWorker, status: string): void {
    this.laborService.updateWorker(worker.id, { status }).subscribe();
  }


  updateTaskStatus(task: any, statusRaw: string): void {
    this.projectService.updateTask(task.id, { status: statusRaw }).subscribe();
  }

  deleteTask(taskId: number): void {
    if (!confirm('Remove this task?')) return;
    this.projectService.deleteTask(taskId).subscribe({
      error: (err: any) =>
        alert('Delete failed: ' + (err?.error?.message ?? 'Server error')),
    });
  }


  getSkillBarWidth(count: number): number {
    const max = Math.max(...this.laborStats.skillComposition.map(s => s.count), 1);
    return Math.round((count / max) * 100);
  }

  getSkillBarColor(skill: string): string {
    const colors: Record<string, string> = {
      'Masonry': 'bg-blue-500',
      'Electrical': 'bg-yellow-500',
      'Structural Steel': 'bg-red-500',
      'Plumbing': 'bg-green-500',
      'HVAC': 'bg-purple-500',
      'Carpentry': 'bg-orange-400',
      'Painting': 'bg-pink-400',
      'Other': 'bg-slate-400',
    };
    return colors[skill] ?? 'bg-slate-400';
  }

  getTaskStatusColor(status: unknown): string {
    const normalizedStatus = String(status ?? '').toLowerCase().replace(/\s+/g, '_');
    const map: Record<string, string> = {
      'completed': 'bg-green-100 text-green-700',
      'in_progress': 'bg-blue-100 text-blue-700',
      'review': 'bg-purple-100 text-purple-700',
      'to_do': 'bg-amber-100 text-amber-700',
      'pending': 'bg-amber-100 text-amber-700',
      'on_hold': 'bg-slate-100 text-slate-500',
    };
    return map[normalizedStatus] ?? 'bg-slate-100 text-slate-500';
  }

  sanitizePhone(event: Event, field: 'spoc' | 'official'): void {
    const input = event.target as HTMLInputElement;
    const cleaned = input.value.replace(/\D/g, '').slice(0, 10);
    input.value = cleaned;
    if (field === 'spoc') {
      this.newVendor.spoc.phone = cleaned;
    } else {
      this.newVendor.phone = cleaned;
    }
  }

  private defaultVendor() {
    return {
      name: '', email: '', phone: '',
      spoc: { name: '', phone: '' },
      kyc: { gst: '', pan: '' },
      address: { street: '', pincode: '' },
      budget: '',
      skill: [] as string[],
      project_id: null as number | null,
    };
  }

  private getInvoicePrefix(): string {
    const rawName = String(this.selectedVendor?.name ?? '');
    const letters = rawName.replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase();
    const prefix = letters.padEnd(3, 'X');
    return prefix === 'XXX' ? 'VND' : prefix;
  }

  private generateInvoiceNumber(): string {
    const prefix = this.getInvoicePrefix();
    const existing = this.invoices || [];
    const regex = new RegExp('^(?:INV-)?' + prefix + '-(\\d{5})$', 'i');
    const maxNum = existing.reduce((max, inv) => {
      const match = String(inv.invoice_number || '').match(regex);
      return match ? Math.max(max, parseInt(match[1], 10)) : max;
    }, 0);
    const nextNum = String(maxNum + 1).padStart(5, '0');
    return `INV-${prefix}-${nextNum}`;
  }

  onInvoiceDateChange(value: string): void {
    if (!value) return;
    const date = new Date(value);
    this.invoiceForm.date = this.formatDate(date);
    this.invoiceForm.rawDate = value;
  }

  private defaultInvoice() {
    const today = new Date();
    return {
      project_id: this.selectedVendor?.project_id
        ? Number(this.selectedVendor.project_id)
        : null,
      number: this.generateInvoiceNumber(),
      date: this.formatDate(today),
      rawDate: today.toISOString().split('T')[0],
      items: [{
        type: '', description: '', quantity: 1, hours: 0,
        unitPrice: 0, gst: 18, baseAmount: 0, gstAmount: 0, total: 0,
      }],
      subtotal: 0, taxAmount: 0, taxRate: 0, grandTotal: 0,
      gstBreakdown: [] as { rate: number; amount: number }[],
    };
  }

  public formatDate(dateInput: string | Date | undefined | null): string {
    if (!dateInput) return '—';
    const d = dateInput instanceof Date ? dateInput : new Date(String(dateInput));
    if (isNaN(d.getTime())) return String(dateInput || '—');
    const dd = String(d.getDate()).padStart(2, '0');
    const mmm = d.toLocaleString('en-US', { month: 'short' });
    const yyyy = d.getFullYear();
    return `${dd}/${mmm}/${yyyy}`;
  }

  private defaultLabor() {
    return { skill: '', status: 'active', daily_rate: '', labor_count: 1, assign_worker: '' };
  }
}