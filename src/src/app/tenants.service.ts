import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tenant } from './models/tenant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TenantsService {
  options: any;
  constructor(private httpClient: HttpClient) {
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('authorization')!
    });
  
    // Include the headers in the request
    this.options = { headers: headers };
  }

  addTenant(data: Tenant): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/tenants/add`, data, this.options);
  }

  getAllTenants(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/tenants/alltenants`, this.options);
  }
}
