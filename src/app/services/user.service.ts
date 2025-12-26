import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}



  search_user(keyword: string) {
      return this.http.get<any[]>(
        `${this.apiUrl}/search?keyword=${keyword}`
      );
    }


  search_role(role: string) {
    return this.http.get<any[]>(
      `${this.apiUrl}/roles?role=${role}`
    );
  }

  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  create(data: any) {
    return this.http.post(this.apiUrl, { user: data });
  }

  update(id: number, data: any) {
    return this.http.patch(`${this.apiUrl}/${id}`, { user: data });
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
