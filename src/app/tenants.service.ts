import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tenant } from './models/tenant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TenantsService {

  constructor(private httpClient: HttpClient) {}

  addTenant(data: Tenant): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/tenants/add`, data);
  }
}
