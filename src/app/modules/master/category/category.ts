import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryServeice } from '../../../shared/services/master/category-serveice';
@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category implements OnInit {
private categoryService = inject(CategoryServeice);

  private toast = inject(ToastrService);

  categories: any[] = [];

  paginatedCategories: any[] = [];
  page = 1;

  pageSize = 5;

  showAddModal = false;

  isEditMode = false;

  selectedSkillId: number | null = null;

  newCategory = {
    company_id: 1,
    category_name: '',
    category_type: '',
    status: 'ACTIVE',
  };
  selectedTab = 'All Materials';
  searchQuery: any;

  ngOnInit(): void {

    this.getSkills();
  }

  getSkills() {

    this.categoryService.loadCategories().subscribe({

      next: () => {

        this.categoryService.categories$.subscribe((res) => {

          this.categories = res;

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

  this.paginatedCategories =
    this.filteredCategories.slice(start, end);
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
    return Math.ceil(this.categories.length / this.pageSize);
  }

  get endItem(): number {
  return Math.min(
    this.page * this.pageSize,
    this.categories.length
  );
}

    onSearchChange() {

  this.page = 1;

  this.updatePagination();
}

get filteredCategories(): any[] {

  let filtered = [...this.categories];

  // 🔥 Tab Filter
   if (this.selectedTab !== 'All Materials') {

    filtered = filtered.filter(
      c =>
        (c.category_name || '')
          .trim()
          .toLowerCase() ===
        this.selectedTab.trim().toLowerCase()
    );
  }

  // 🔥 Search Filter
  if (this.searchQuery) {

    const q = this.searchQuery.toLowerCase();

    filtered = filtered.filter((category: any) =>
      category.category_name?.toLowerCase().includes(q) ||
      category.category_type?.toLowerCase().includes(q)
    );
  }

  return filtered;
}

  openAddModal() {

    this.isEditMode = false;

    this.selectedSkillId = null;

    this.newCategory = {
      company_id: 1,
      category_name: '',
      category_type: '',
      status: 'ACTIVE',
    };

    this.showAddModal = true;
  }

  closeModal() {

    this.showAddModal = false;
  }


  addCategory() {

    this.categoryService
      .addCategory(this.newCategory)
      .subscribe({

        next: () => {

          this.toast.success(
            'Category added successfully'
          );

          this.closeModal();

          this.getSkills();
        },

        error: (err) => {

          console.error(err);

          this.toast.error(
            err?.error?.message ||
            'Failed to add category'
          );
        }
      });
  }

  openEditModal(category: any) {

    this.isEditMode = true;

    this.selectedSkillId = category.id;

    this.newCategory = {
      company_id: category.company_id,
      category_name: category.category_name,
      category_type: category.category_type,
      status: category.status,
    };

    this.showAddModal = true;
  }

  updateCategory() {

    if (!this.selectedSkillId) return;

    this.categoryService
      .updateCategory(
        this.selectedSkillId,
        this.newCategory
      )
      .subscribe({

        next: () => {

          this.toast.success(
            'Category updated successfully'
          );

          this.closeModal();

          this.getSkills();
        },

        error: (err) => {

          console.error(err);

          this.toast.error(
            err?.error?.message ||
            'Failed to update category'
          );
        }
      });
  }

  deleteSkill(id: number) {

    const confirmDelete =
      confirm('Are you sure you want to delete this skill?');

    if (!confirmDelete) return;

    this.categoryService
      .deleteCategory(id)
      .subscribe({

        next: () => {

          this.toast.success(
            'Category deleted successfully'
          );

          this.getSkills();
        },

        error: (err) => {

          console.error(err);

          this.toast.error(
            err?.error?.message ||
            'Failed to delete category'
          );
        }
      });
  }
}