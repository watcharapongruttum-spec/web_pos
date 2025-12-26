import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // login
  login(data: { username: string; password: string }) {
    return this.http.post<any>(`${this.API_URL}/login/admin`, data);
  }

  // save token
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  // get token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // check login
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // logout
  logout() {
    localStorage.removeItem('token');
  }
}
