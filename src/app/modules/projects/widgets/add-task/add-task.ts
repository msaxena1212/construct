import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ProjectService } from '../../services/project-service';
import { IProjectTask, IUser } from '../../../../shared/interfaces/project.interface';
import { CommonModule } from '@angular/common';
import { CommonDialogComponent } from '../../../../shared/components/common-dialog/common-dialog';
import { EquipmentInventoryService } from '../../../../shared/services/equipment-inventory/equipment-inventory';

@Component({
  selector: 'app-add-task',
  standalone: true,
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
  imports: [CommonModule, FormsModule, ToastrModule, ReactiveFormsModule, CommonDialogComponent],
})
export class AddTask implements OnInit {
  @Input() projectId: string | number = '';
  @Input() milestoneId: string | number | null = null;
  @Input() initialStatus: string = 'To Do';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  private projectService = inject(ProjectService);
  private toast = inject(ToastrService);
  private fb = inject(FormBuilder);
  private materialService = inject(EquipmentInventoryService);


  taskForm!: FormGroup;
  checklist: {
    equipmentQty: number;
    title: string;
    material_id: number;
    itemName: string;
    materialQty: number;
    stockIn: number;
    equipment_id: string;
    completed: boolean;
    requestedQty?: number;
    shortage?: number;
    pendingRequest?: boolean;
    stock_request_id?: number;
    startDate?: string;
    endDate?: string;
    labor_id?: string;
    no_of_labor?: number;
  }[] = [];

  showSubTaskForm = false;
  editingIndex: number | null = null;

  newSubTask = {
    title: '',
    materialId: null as number | null,
    itemName: '',
    stockIn: 0,
    materialQty: 1,
    equipment_id: '',
    equipmentQty: 1,
    startDate: '',
    endDate: '',
    labor_id: '',
    no_of_labor: 1,
  };

  dependencies: any[] = [];
  attachments: any[] = [];

  selectedPredecessorId = '';
  selectedDepType = 'FS';
  depLag = 0;
  allTasks: IProjectTask[] = [];

  priorities = [
    { label: 'High Priority', class: 'bg-red-100 text-red-700' },
    { label: 'Medium Priority', class: 'bg-blue-100 text-blue-700' },
    { label: 'Low Priority', class: 'bg-amber-100 text-amber-700' }
  ];

  dependencyTypes = [
    { id: 'FS', name: 'Finish-to-Start (FS)', desc: 'Predecessor must finish before Successor can start' },
    { id: 'SS', name: 'Start-to-Start (SS)', desc: 'Predecessor must start before Successor can start' },
    { id: 'FF', name: 'Finish-to-Finish (FF)', desc: 'Predecessor must finish before Successor can finish' },
    { id: 'SF', name: 'Start-to-Finish (SF)', desc: 'Predecessor must start before Successor can finish' }
  ];

  milestones: any[] = [];

  subMilestones: any[] = [];

  teamMembers: IUser[] = [];
  vendors: any[] = [];
  materials: any[] = [];
  equipmentList: any[] = [];

  ngOnInit() {
    this.initForm();
    this.projectService.getProjectTasks(this.projectId).subscribe((res: any) => {
      this.allTasks = res.data;
      console.log(this.allTasks, 'test');

    });
    if (this.projectId) {
      this.fetchTeamMembers();
      this.fetchVendors();
      this.fetchMaterials();
      this.materialService.loadMaterials();

      this.materialService.materials$.subscribe((m: any[]) => {

        this.equipmentList = m;
      })
    }
  }



  initForm() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      priority: ['Medium Priority'],
      status: [this.initialStatus],
      startDate: [new Date().toISOString().split('T')[0]],
      duration: [5],
      assigneeId: [''],
      vendorId: [''],
      initialComment: [''],
      milestone_id: [''],
      submilestone_id: [''],
    });
  }

  onMilestoneChange(event: any) {
    const milestoneId = event.target.value;

    const milestone = this.milestones.find(
      (m: any) => m.id == milestoneId
    );

    this.subMilestones = milestone?.children || [];
  }

  fetchTeamMembers() {
    this.projectService.getProjectById(this.projectId).subscribe({
      next: (res: any) => {

        this.teamMembers = res.data.team_members || [];
        this.milestones = res.data.milestones_with_child || [];

        // Milestone change listener
        this.taskForm.get('milestone_id')?.valueChanges.subscribe((milestoneId) => {

          const selectedMilestone = this.milestones.find(
            (m: any) => m.id == milestoneId
          );

          this.subMilestones = selectedMilestone?.children || [];

          // Reset sub milestone
          this.taskForm.patchValue({
            subMilestoneId: ''
          });

        });

        console.log(res, 'res');
      }
    });
  }

  fetchVendors() {
    this.projectService.getVendors().subscribe({
      next: (res) => {
        this.vendors = res.data || [];
      }
    });
  }

  fetchMaterials() {
    this.projectService.getMaterialByprojectId(this.projectId).subscribe({
      next: (res) => {

        console.log(res, 'res1');
        // Handle both array and wrapped response
        this.materials = Array.isArray(res.data) ? res.data : [res.data];
        console.log('Materials loaded:', this.materials);
      }
    });
  }

  private resetSubTaskForm() {
    this.newSubTask = {
      title: '', materialId: null, itemName: '', stockIn: 0, materialQty: 1, equipment_id: '', equipmentQty: 1, startDate: '',
      endDate: '',
      labor_id: '',
      no_of_labor: 1,
    };
    this.showSubTaskForm = false;
    this.editingIndex = null;
  }

  // Add these new properties
  showStockDialog = false;
  stockDialogData: {
    available: number;
    shortage: number;
    selectedItem: any;
    itemType: 'material' | 'equipment';
  } | null = null;


  addSubTask() {

    if (
      this.newSubTask.title.trim() &&
      this.newSubTask.materialId
    ) {

      const selectedMaterial = this.materials.find(
        m => m.id == this.newSubTask.materialId
      );

      // Check if material exists
      if (!selectedMaterial) {
        this.toast.error('Material not found');
        return;
      }

      // VALIDATE STOCK for material
      if (this.newSubTask.materialQty > selectedMaterial.stockUsed) {

        if (selectedMaterial.stockIn === 0 && selectedMaterial.stockUsed === 0) {
          // Zero stock — directly show dialog with full qty as shortage
          this.stockDialogData = {
            available: 0,
            shortage: this.newSubTask.materialQty,
            selectedItem: selectedMaterial,
            itemType: 'material'
          };
          this.showStockDialog = true;
          return;
        }

        // Partial stock — show dialog
        this.stockDialogData = {
          available: selectedMaterial.stockUsed,
          shortage: this.newSubTask.materialQty - selectedMaterial.stockUsed,
          selectedItem: selectedMaterial,
          itemType: 'material'
        };
        this.showStockDialog = true;
        return;  // ← don't save yet, wait for user confirmation
      }

      // VALIDATE STOCK for equipment (apply same dialog behavior)
      if (this.newSubTask.equipment_id) {
        const selectedEquipment = this.equipmentList.find(
          (e: any) => e.id == this.newSubTask.equipment_id
        );

        if (!selectedEquipment) {
          this.toast.error('Equipment not found');
          return;
        }

        if (this.newSubTask.equipmentQty > selectedEquipment.stockUsed) {

          if (selectedEquipment.stockIn === 0 && selectedEquipment.stockUsed === 0) {
            this.stockDialogData = {
              available: 0,
              shortage: this.newSubTask.equipmentQty,
              selectedItem: selectedEquipment,
              itemType: 'equipment'
            };
            this.showStockDialog = true;
            return;
          }

          this.stockDialogData = {
            available: selectedEquipment.stockUsed,
            shortage: this.newSubTask.equipmentQty - selectedEquipment.stockUsed,
            selectedItem: selectedEquipment,
            itemType: 'equipment'
          };
          this.showStockDialog = true;
          return;
        }
      }

      const payload = {
        title: this.newSubTask.title,
        material_id: selectedMaterial.id,
        itemName: selectedMaterial.name,
        stockIn: selectedMaterial.stockIn,
        materialQty: this.newSubTask.materialQty,
        equipment_id: this.newSubTask.equipment_id,
        equipmentQty: this.newSubTask.equipmentQty,
        completed: false,
        startDate: this.newSubTask.startDate,
        endDate: this.newSubTask.endDate,
        labor_id: this.newSubTask.labor_id,
        no_of_labor: this.newSubTask.no_of_labor,
      };

      // EDIT
      if (this.editingIndex !== null) {

        this.checklist[this.editingIndex] = payload;
        this.editingIndex = null;

      } else {

        // CREATE
        this.checklist.push(payload);

      }

      // RESET
      this.newSubTask = {
        title: '',
        materialId: null,
        itemName: '',
        stockIn: 0,
        materialQty: 1,
        equipment_id: '',
        equipmentQty: 1,
        startDate: '',
        endDate: '',
        labor_id: '',
        no_of_labor: 1,
      };

      this.showSubTaskForm = false;
    }
  }

  editSubTask(index: number) {

    const item = this.checklist[index];

    this.newSubTask = {
      title: item.title,
      materialId: item.material_id,
      itemName: item.itemName,
      stockIn: item.stockIn,
      materialQty: item.requestedQty ?? item.materialQty,
      equipment_id: item.equipment_id,
      equipmentQty: item.equipmentQty,
      startDate: item.startDate ?? '',
      endDate: item.endDate ?? '',
      labor_id: item.labor_id ?? '',
      no_of_labor: item.no_of_labor ?? 1,
    };

    this.editingIndex = index;
    this.showSubTaskForm = true;
  }

  confirmStockRequest() {

    if (!this.stockDialogData) return;

    const { available, shortage, selectedItem, itemType } = this.stockDialogData;

    // build a payload that works for both material and equipment
    const basePayload: any = {
      title: this.newSubTask.title,
      stockIn: available,
      materialQty: available,
      requestedQty: this.newSubTask.materialQty || this.newSubTask.equipmentQty,
      shortage,
      pendingRequest: true,
      startDate: this.newSubTask.startDate,
      endDate: this.newSubTask.endDate,
      labor_id: this.newSubTask.labor_id,
      no_of_labor: this.newSubTask.no_of_labor,
      completed: false
    };

    let payload: any;

    if (itemType === 'material') {
      payload = {
        ...basePayload,
        material_id: selectedItem.id,
        itemName: selectedItem.name,
        equipment_id: this.newSubTask.equipment_id,
        equipmentQty: this.newSubTask.equipmentQty,
      };
    } else {
      // equipment
      payload = {
        ...basePayload,
        equipment_id: selectedItem.id,
        itemName: selectedItem.name,
        equipmentQty: this.newSubTask.equipmentQty,
      };
    }

    // ================= EDIT =================

    if (this.editingIndex !== null) {

      const oldItem = this.checklist[this.editingIndex];

      // UPDATE CHECKLIST
      this.checklist[this.editingIndex] = {
        ...payload,
        stock_request_id: oldItem.stock_request_id
      };

      // PUT API
      if (!oldItem.stock_request_id) {
        this.toast.error('Stock request id not found');
        return;
      }

      // send update payload depending on item type
      const updatePayload: any = {
        task_title: this.newSubTask.title,
        requested_qty: shortage,
        available_qty: available,
        project_id: this.projectId
      };

      if (itemType === 'material') {
        updatePayload.material_id = selectedItem.id;
      } else {
        updatePayload.equipment_id = selectedItem.id;
      }

      this.projectService.updateAdditionalStockRequest(
        oldItem.stock_request_id,
        updatePayload
      ).subscribe({
        next: () => {
          this.toast.success('Stock request updated');
        },
        error: () => {
          this.toast.error('Failed to update stock request');
        }
      });

    }

    // ================= CREATE =================

    else {

      const reqPayload: any = {
        task_title: this.newSubTask.title,
        requested_qty: shortage,
        available_qty: available,
        project_id: this.projectId
      };

      if (itemType === 'material') {
        reqPayload.material_id = selectedItem.id;
      } else {
        reqPayload.equipment_id = selectedItem.id;
      }

      this.projectService.requestAdditionalStock(reqPayload).subscribe({

        next: (res: any) => {

          this.checklist.push({
            ...payload,
            stock_request_id: res.data.id
          });

          this.toast.success(`Request sent for ${shortage} items`);
        },

        error: () => {
          this.toast.error('Failed to send stock request');
        }

      });

    }

    this.showStockDialog = false;
    this.stockDialogData = null;
    this.resetSubTaskForm();
  }

  cancelStockRequest() {
    this.showStockDialog = false;
    this.stockDialogData = null;
    // Don't reset form — let user change qty
  }

  removeSubTask(index: number) {
    this.checklist.splice(index, 1);
  }

  addDependency() {
    if (this.selectedPredecessorId) {
      const pred = this.allTasks.find(t => t.id === Number(this.selectedPredecessorId));
      const typeObj = this.dependencyTypes.find(t => t.id === this.selectedDepType);
      this.dependencies.push({
        predecessor_id: Number(this.selectedPredecessorId),
        predecessorTitle: pred?.title,
        type: this.selectedDepType,
        typeName: typeObj?.name,
        lag: this.depLag
      });
      this.selectedPredecessorId = '';
    }
  }

  getSelectedDepDesc() {
    return this.dependencyTypes.find(t => t.id === this.selectedDepType)?.desc || '';
  }

  removeDependency(index: number) {
    this.dependencies.splice(index, 1);
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      this.attachments.push({
        name: files[i].name,
        size: (files[i].size / 1024).toFixed(1) + ' KB',
        icon: 'description',
        color: 'blue'
      });
    }
  }

  labors: any[] = [];

  loadLabors(event: Event) {
    const vendorId = (event.target as HTMLSelectElement)?.value;
    if (vendorId) {
      this.projectService.getLaborByVendor(Number(vendorId)).subscribe((res: any) => {
        this.labors = res.data || [];
      });
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const payload = {
        ...formValue,
        milestone_id: this.milestoneId,
        vendor_id: formValue.vendorId,
        sub_tasks: this.checklist,
        dependencies: this.dependencies,
        assignees: formValue.assigneeId ? [Number(formValue.assigneeId)] : [],
        due_date: this.calculateDueDate(formValue.startDate, formValue.duration)
      };

      this.projectService.createTask(this.projectId, payload).subscribe({
        next: (res) => {
          this.save.emit(res.data);
          this.toast.success('Task initialized successfully');
          this.close.emit();
        },
        error: () => this.toast.error('Failed to initialize task')
      });
    }
  }

  private calculateDueDate(startDate: string, duration: number): string {
    const date = new Date(startDate);
    date.setDate(date.getDate() + duration);
    return date.toISOString().split('T')[0];
  }
}
