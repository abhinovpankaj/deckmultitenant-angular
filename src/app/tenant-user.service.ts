import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenantUserService {

  options: any;
  constructor(private httpClient: HttpClient, private toast: HotToastService) { 
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

  updateUserDeviceId(username: string): Promise<any>{
    return new Promise<any>(
      (resolve, reject) =>{
        const data = {username, deviceId: null}
        this.httpClient.put(`${environment.apiUrl}/user/deviceId`,data, this.options).subscribe(
          (user)=>{
            resolve(user);
            this.toast.success('Device id reset successfully');
          },
          (error)=>{
            reject(error);
            this.toast.error('Reset device id failed!');
          }
        )
      }
    );
  }

  deleteUser(username: string): Promise<any>{
    return new Promise<any>(
      (resolve, reject) =>{
        const data = {username, deviceId: null}
        this.httpClient.delete(`${environment.apiUrl}/user/${username}`, this.options).subscribe(
          (user)=>{
            this.toast.success('User deleted successfully');
            resolve(user);
          },
          (error)=>{
            this.toast.error('Delete user failed!');
            reject(error);
          }
        )
      }
    );
  }
}
