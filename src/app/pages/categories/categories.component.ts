import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories: any[] = [];
  loading = false;
  error = '';

  showForm = false;
  isEdit = false;
  selectedId: number | null = null;

  form: any = {
    name: ''
  };

  // Toast
  toast = {
    show: false,
    message: '',
    type: 'success' as 'success' | 'error'
  };

  // Confirm delete
  showConfirm = false;
  deleteId: number | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;
    this.categoryService.getAll().subscribe({
      next: res => {
        this.categories = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'ไม่สามารถโหลดประเภทสินค้าได้';
        this.loading = false;
      }
    });
  }

  // Modal Add/Edit
  openAdd() {
    this.isEdit = false;
    this.selectedId = null;
    this.form = { name: '' };
    this.showForm = true;
  }

  openEdit(category: any) {
    this.isEdit = true;
    this.selectedId = category.id;
    this.form = { name: category.name };
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  // Save
  save() {
    if (this.isEdit && this.selectedId) {
      this.categoryService.update(this.selectedId, this.form).subscribe({
        next: () => {
          this.showToast('แก้ไขประเภทสินค้าเรียบร้อย');
          this.closeForm();
          this.loadCategories();
        },
        error: (err) => this.handleError(err)
      });
    } else {
      this.categoryService.create(this.form).subscribe({
        next: () => {
          this.showToast('เพิ่มประเภทสินค้าเรียบร้อย');
          this.closeForm();
          this.loadCategories();
        },
        error: (err) => this.handleError(err)
      });
    }
  }

  // Delete
  confirmDelete(id: number) {
    this.deleteId = id;
    this.showConfirm = true;
  }

  cancelDelete() {
    this.showConfirm = false;
    this.deleteId = null;
  }

  deleteCategory() {
    if (!this.deleteId) return;
    this.categoryService.delete(this.deleteId).subscribe({
      next: () => {
        this.showToast('ลบประเภทสินค้าเรียบร้อย');
        this.loadCategories();
        this.cancelDelete();
      },
      error: () => {
        this.showToast('ไม่สามารถลบประเภทสินค้าได้', 'error');
        this.cancelDelete();
      }
    });
  }

  // Toast
  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.toast.message = message;
    this.toast.type = type;
    this.toast.show = true;
    setTimeout(() => this.toast.show = false, 3000);
  }

  handleError(err: any) {
    if (err.status === 422 && err.error.name) {
      this.showToast('ชื่อประเภทสินค้าซ้ำ', 'error');
    } else {
      this.showToast('เกิดข้อผิดพลาด', 'error');
    }
  }

}
