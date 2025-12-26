import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: any[] = [];
  loading = false;
  error = '';

  showForm = false;
  isEdit = false;
  selectedId: number | null = null;

form: any = {
  username: '',
  name: '',
  role: 'user',
  password: '',
  password_confirmation: ''
};



toast = {
  show: false,
  message: '',
  type: 'success' as 'success' | 'error'
};


showConfirm = false;
deleteId: number | null = null;

keyword = '';
role: string = '';



  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getAll().subscribe({
      next: res => {
        this.users = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'ไม่สามารถโหลดข้อมูลผู้ใช้ได้';
        this.loading = false;
      }
    });
  }

openAdd() {
  this.isEdit = false;
  this.selectedId = null;
  this.form = {
    username: '',
    name: '',
    role: 'user',
    password: '',
    password_confirmation: ''
  };
  this.showForm = true;
}


openEdit(user: any) {
  this.isEdit = true;
  this.selectedId = user.id;
  this.form = {
    username: user.username,
    name: user.name,
    role: user.role,
    password: '',
    password_confirmation: ''
  };
  this.showForm = true;
}


  confirmDelete(id: number) {
    this.deleteId = id;
    this.showConfirm = true;
  }

  cancelDelete() {
    this.showConfirm = false;
    this.deleteId = null;
  }



  deleteUser() {
    if (!this.deleteId) return;

    this.userService.delete(this.deleteId).subscribe({
      next: () => {
        this.showToast('ลบผู้ใช้เรียบร้อย');
        this.loadUsers();
        this.cancelDelete();
      },
      error: () => {
        this.showToast('ไม่สามารถลบผู้ใช้ได้', 'error');
        this.cancelDelete();
      }
    });
  }




save() {
  if (this.isEdit && this.selectedId) {

    const payload = { ...this.form };
    if (!payload.password) {
      delete payload.password;
      delete payload.password_confirmation;
    }

    this.userService.update(this.selectedId, payload).subscribe({
      next: () => {
        this.showToast('แก้ไขผู้ใช้สำเร็จ');
        this.closeForm();
        this.loadUsers();
      },
      error: (err) => {
        this.handleError(err);
      }
    });

  } else {

    this.userService.create(this.form).subscribe({
      next: () => {
        this.showToast('เพิ่มผู้ใช้สำเร็จ');
        this.closeForm();
        this.loadUsers();
      },
      error: (err) => {
        this.handleError(err);
      }
    });

  }
}






  closeForm() {
    this.showForm = false;
  }


handleError(err: any) {
  if (err.status === 422 && err.error) {
    const messages = [];

    if (err.error.username) {
      messages.push('ชื่อผู้ใช้ซ้ำ');
    }
    if (err.error.password) {
      messages.push('รหัสผ่านไม่ถูกต้อง');
    }
    if (err.error.password_confirmation) {
      messages.push('ยืนยันรหัสผ่านไม่ตรงกัน');
    }

    this.showToast(messages.join(', '), 'error');
  } else {
    this.showToast('เกิดข้อผิดพลาด กรุณาลองใหม่', 'error');
  }
}



  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.toast.message = message;
    this.toast.type = type;
    this.toast.show = true;
    this.autoClearToast();
  }

  autoClearToast() {
    setTimeout(() => {
      this.toast.show = false;
    }, 3000);
  }




  search() {
    if (!this.keyword) {
      this.loadUsers();
      return;
    }

    this.userService.search_user(this.keyword).subscribe({
      next: (res) => {
        this.users = res;
      },
      error: () => {
        this.showToast('ไม่สามารถค้นหาผู้ใช้ได้', 'error');
      }
    });
  }



  search_role() {
    if (!this.role) {
      this.loadUsers();
      return;
    }

    this.userService.search_role(this.role).subscribe({
      next: (res) => {
        this.users = res;
      },
      error: () => {
        this.showToast('ไม่สามารถค้นหาผู้ใช้ได้', 'error');
      }
    });
  }




}
