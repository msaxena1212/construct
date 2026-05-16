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

  // Data
  skills: any[] = [];

  paginatedSkills: any[] = [];

  // Pagination
  page = 1;

  pageSize = 10;

  // Modal
  showAddModal = false;

  isEditMode = false;

  selectedSkillId: number | null = null;

  // Form
  newSkill = {
    company_id: 1,
    skill_name: '',
    status: 'ACTIVE',
  };

  ngOnInit(): void {

    this.getSkills();
  }

  // =========================
  // GET SKILLS
  // =========================
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

  // =========================
  // PAGINATION
  // =========================
  updatePagination() {

    const start = (this.page - 1) * this.pageSize;

    const end = start + this.pageSize;

    this.paginatedSkills =
      this.skills.slice(start, end);
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

  totalPages() {

    return Math.ceil(
      this.skills.length / this.pageSize
    );
  }

  // =========================
  // MODAL
  // =========================
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

  // =========================
  // ADD SKILL
  // =========================
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

  // =========================
  // EDIT
  // =========================
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

  // =========================
  // UPDATE
  // =========================
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

  // =========================
  // DELETE
  // =========================
  deleteSkill(id: number) {

    const confirmDelete =
      confirm('Are you sure you want to delete this skill?');

    if (!confirmDelete) return;

    this.skillService
      .deleteSkill(id)
      .subscribe({

        next: () => {

          this.toast.success(
            'Skill deleted successfully'
          );

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