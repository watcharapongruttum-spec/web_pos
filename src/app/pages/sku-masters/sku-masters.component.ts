import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SkuMasterService } from 'src/app/services/sku-master.service';
import { Category } from 'src/model/res/category';

import { CategoryService } from '../../services/category.service';
import { SkuMaster, SkuMasterPagination } from 'src/model/res/sku_master_pagination';



@Component({
  selector: 'app-sku-masters',
  templateUrl: './sku-masters.component.html',
  styleUrls: ['./sku-masters.component.scss']
})
export class SkuMastersComponent implements OnInit {

  skuMasters: SkuMaster[] = [];
  
  categories: Category[] = [];


  loading = false;
  error = '';

  // form
  showForm = false;
  isEdit = false;
  selectedId: number | null = 5;

  form = {
    name: '',
    category_id: 1,
    price: 0,
    amount: 0
  };



  errorMessage: string | null = null;
  successMessage: string | null = null;

  showDeleteConfirm = false;
  deleteId: number | null = null;


  currentPage = 1;
  perPage = 10;

  totalPages = 0;
  totalItems = 0;

  searchKeyword: string = '';
  selectedCategoryId?: number;





  search_cat = ''; 
  // search_cat: number | null = 0;




 

  constructor(private skuService: SkuMasterService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadSkuMasters();
    this.loadCategories();
  }




loadSkuMasters(string?: string) {
  this.loading = true;

  this.skuService.getAll(
    this.currentPage,
    this.perPage,
    this.selectedCategoryId, 
    this.searchKeyword  
    ,string
  ).subscribe({
    next: (res: SkuMasterPagination) => {
      this.skuMasters = res.sku_masters;
      this.totalItems = res.pagination.total;
      this.totalPages = Math.ceil(this.totalItems / this.perPage);
      this.loading = false;
    },
    error: () => {
      this.error = 'ไม่สามารถโหลดข้อมูลสินค้าได้';
      this.loading = false;
    }
  });
}



search() {
  this.currentPage = 1;
  this.loadSkuMasters();
}

search_category() {
  this.currentPage = 1;
  this.selectedCategoryId = this.search_cat ? Number(this.search_cat) : undefined;
  this.loadSkuMasters();
}




changePerPage(value: number) {
  this.perPage = value;
  this.currentPage = 1;
  this.loadSkuMasters();
}




goToPage(page: number) {
  if (page < 1 || page > this.totalPages) return;
  this.currentPage = page;
  this.loadSkuMasters();
}








  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        console.log(data);
        
      },
      error: () => {
        console.error('ไม่สามารถโหลดหมวดสินค้าได้');
      }
    });
  }





  openAdd() {
    this.showForm = true;
    this.isEdit = false;
    this.selectedId = null;
    this.form = { name: '', category_id: 1, price: 0, amount: 0 };
  }


openEdit(sku: SkuMaster) {
  this.showForm = true;
  this.isEdit = true;
  this.selectedId = sku.id;
  this.form = {
    name: sku.name,
    category_id: sku.category_id,
    price: Number(sku.price_float.toFixed(2)),
    amount: sku.amount
  };
}


save() {
  this.clearMessage();

  if (this.isEdit && this.selectedId) {
    this.skuService.update(this.selectedId, this.form).subscribe({
      next: () => {
        this.successMessage = 'แก้ไขสินค้าสำเร็จ';
        this.closeForm();
        this.loadSkuMasters();
        this.autoClear();
      },
      error: (err) => this.handleError(err)
    });
  } else {
    this.skuService.create(this.form).subscribe({
      next: () => {
        this.successMessage = 'เพิ่มสินค้าสำเร็จ';
        this.closeForm();
        this.loadSkuMasters();
        this.autoClear();
      },
      error: (err) => this.handleError(err)
    });
  }
}






handleError(err: any) {
  if (err.status === 422 && err.error) {
    if (err.error.name?.includes('has already been taken')) {
      this.errorMessage = 'ชื่อสินค้านี้มีอยู่แล้ว กรุณาใช้ชื่ออื่น';
      return;
    }

    this.errorMessage = 'ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง';
    return;
  }

  this.errorMessage = 'เกิดข้อผิดพลาดในการบันทึกข้อมูล';
}

clearMessage() {
  this.errorMessage = null;
  this.successMessage = null;
}

autoClear() {
  setTimeout(() => {
    this.clearMessage();
  }, 3000);
}







// 🗑️ เปิด confirm
confirmDelete(id: number) {
  this.deleteId = id;
  this.showDeleteConfirm = true;
}

// ❌ ยกเลิก
cancelDelete() {
  this.deleteId = null;
  this.showDeleteConfirm = false;
}


deleteConfirmed() {
  if (!this.deleteId) return;

  this.clearMessage();

  this.skuService.delete(this.deleteId).subscribe({
    next: () => {
      this.successMessage = 'ลบสินค้าสำเร็จ';
      this.loadSkuMasters();
      this.cancelDelete();
      this.autoClear();
    },
    error: () => {
      this.errorMessage = 'ไม่สามารถลบสินค้าได้';
      this.cancelDelete();
      this.autoClear();
    }
  });
}





  closeForm() {
    this.showForm = false;
  }
}

