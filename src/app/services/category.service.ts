import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrl+'/categories';

  constructor(private http: HttpClient) {}

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
  }





  






  getAll(): Observable<any[]> {
    console.log(this.apiUrl);
    
    return this.http.get<any[]>(this.apiUrl, this.getHeaders());
  }

  create(data: any): Observable<any> {
    return this.http.post(this.apiUrl, { category: data }, this.getHeaders());
  }

  update(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { category: data }, this.getHeaders());
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}
