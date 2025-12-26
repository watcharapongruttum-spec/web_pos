import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] 
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

login() {
  if (this.loginForm.invalid) {
    return;
  }

  const { username, password } = this.loginForm.value;

  this.auth.login({ username, password }).subscribe({
    next: (res) => {
      this.auth.saveToken(res.token);
      this.router.navigate(['/dashboard/sku-masters']);
    },
    error: () => {
      this.error = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
    }
  });
}



}
