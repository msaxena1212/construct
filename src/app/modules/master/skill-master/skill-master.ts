import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SkillMasterServices } from './skill-master-services';

@Component({
  selector: 'app-skill-master',
  standalone: false,
  templateUrl: './skill-master.html',
  styleUrl: './skill-master.scss',
})
export class SkillMaster implements OnInit {

  private skillService = inject(SkillMasterServices);

  private toast = inject(ToastrService);

  skills: any[] = [];

  paginatedSkills: any[] = [];
  page = 1;

  pageSize = 5;

  showAddModal = false;

  showDeleteModal = false;

  skillToDelete: any = null;

  isEditMode = false;

  selectedSkillId: number | null = null;

  newSkill = {
    company_id: 1,
    skill_name: '',
    status: 'ACTIVE',
  };
  selectedTab = 'All Materials';
  searchQuery: any;

  ngOnInit(): void {

    this.getSkills();
  }

  getSkills() {

    this.skillService.loadSkills().subscribe({

      next: () => {

        this.skillService.skills$.subscribe((res) => {

          this.skills = res;

          this.updatePagination();
        });
      },

      error: (err) => {

        console.error(err);

        this.toast.error('Failed to load skills');
      }
    });
  }

  updatePagination() {

    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.paginatedSkills =
      this.filteredSkills.slice(start, end);
  }

  nextPage() {
    if (this.page < this.totalPages()) {
      this.page++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.updatePagination();
    }
  }

  goToPage(p: number) {
    this.page = p;
    this.updatePagination();
  }

  totalPages() {
    return Math.ceil(this.skills.length / this.pageSize);
  }

  get endItem(): number {
    return Math.min(
      this.page * this.pageSize,
      this.skills.length
    );
  }

  onSearchChange() {

    this.page = 1;

    this.updatePagination();
  }

  get filteredSkills(): any[] {

    let filtered = [...this.skills];

    // 🔥 Tab Filter
    if (this.selectedTab !== 'All Materials') {

      filtered = filtered.filter(
        m =>
          (m.category || '')
            .trim()
            .toLowerCase() ===
          this.selectedTab.trim().toLowerCase()
      );
    }

    // 🔥 Search Filter
    if (this.searchQuery) {

      const q = this.searchQuery.toLowerCase();

      filtered = filtered.filter((material: any) =>
        material.name?.toLowerCase().includes(q) ||
        material.sku?.toLowerCase().includes(q)
      );
    }

    return filtered;
  }

  openAddModal() {

    this.isEditMode = false;

    this.selectedSkillId = null;

    this.newSkill = {
      company_id: 1,
      skill_name: '',
      status: 'ACTIVE',
    };

    this.showAddModal = true;
  }

  closeModal() {

    this.showAddModal = false;
  }

  closeDeleteModal() {

    this.showDeleteModal = false;

    this.skillToDelete = null;
  }

  addSkill() {

    this.skillService
      .addSkill(this.newSkill)
      .subscribe({

        next: () => {

          this.toast.success(
            'Skill added successfully'
          );

          this.closeModal();

          this.getSkills();
        },

        error: (err) => {

          console.error(err);

          this.toast.error(
            err?.error?.message ||
            'Failed to add skill'
          );
        }
      });
  }

  openEditModal(skill: any) {

    this.isEditMode = true;

    this.selectedSkillId = skill.id;

    this.newSkill = {
      company_id: skill.company_id,
      skill_name: skill.skill_name,
      status: skill.status,
    };

    this.showAddModal = true;
  }

  updateSkill() {

    if (!this.selectedSkillId) return;

    this.skillService
      .updateSkill(
        this.selectedSkillId,
        this.newSkill
      )
      .subscribe({

        next: () => {

          this.toast.success(
            'Skill updated successfully'
          );

          this.closeModal();

          this.getSkills();
        },

        error: (err) => {

          console.error(err);

          this.toast.error(
            err?.error?.message ||
            'Failed to update skill'
          );
        }
      });
  }

  deleteSkill(skill: any) {

    this.skillToDelete = skill;

    this.showDeleteModal = true;
  }

  confirmDelete() {

    if (!this.skillToDelete?.id) return;

    this.skillService
      .deleteSkill(this.skillToDelete.id)
      .subscribe({

        next: () => {

          this.toast.success(
            'Skill deleted successfully'
          );

          this.showDeleteModal = false;

          this.skillToDelete = null;

          this.getSkills();
        },

        error: (err) => {

          console.error(err);

          this.toast.error(
            err?.error?.message ||
            'Failed to delete skill'
          );
        }
      });
  }
}