import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { ResSkuAll, SkuMaster } from 'src/model/res/res_sku_all';
import { SkuMasterPagination } from 'src/model/res/sku_master_pagination';

@Injectable({
  providedIn: 'root'
})
export class SkuMasterService {

  private API_URL = environment.apiUrl+'/sku_masters';

  constructor(private http: HttpClient) {}









  getAll(
    page: number = 1,
    perPage: number = 10,
    categoryId?: number,
    search?: string,
    sort?: string
  ): Observable<SkuMasterPagination> {
    let params = `?page=${page}&per_page=${perPage}`;

    if (categoryId) {
      params += `&category_id=${categoryId}`;
    }

    if (search) {
      params += `&search=${encodeURIComponent(search)}`;
    }

    if (sort) {
      params += `&sort=${sort}`;
    }

    return this.http.get<SkuMasterPagination>(`${this.API_URL}/sku_master_pagination${params}`);
  }












  create(data: any) {
    try {
      return this.http.post(this.API_URL, data);
    } catch (error) {
      console.error('Error creating SKU:', error);
      throw error;
    }

  }


  update(id: number, data: any) {

    return this.http.put(`${this.API_URL}/${id}`, data);
  }


  delete(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
