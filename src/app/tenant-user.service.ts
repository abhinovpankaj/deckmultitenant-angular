import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenantUserService {

  options: any;
  constructor(private httpClient: HttpClient) { 
    const headers = new HttpHeaders({
      'Authorization': localStorage.getItem('authorization')!
    });
  
    // Include the headers in the request
    this.options = { headers: headers };
  }

  getAllUsers(companyIdentifier: string): Promise<any>{
    return new Promise<any>(
      (resolve, reject)=>{
        this.httpClient.get(`${environment.apiUrl}/user/allusersbytenant?company=${companyIdentifier}`, this.options).subscribe(
          (users)=>{
            resolve(users);
          },
          (error)=>{
            reject(error);
          }
        )
      }
    );
    
  }
}
