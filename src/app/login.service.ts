import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  currentlyLoggedInUsername: string;
  constructor(private httpClient: HttpClient) {}

  login(data: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/login/loginSuperUser`, data);
  }

  isLoggedIn() {
    const token = localStorage.getItem('authorization');
    if (token !== null && token !== undefined){
      const tokenPayload = jwtDecode(token!) as { exp: number };
      const expirationTime = tokenPayload.exp * 1000;

      // Get the current time in milliseconds
      const currentTime = new Date().getTime();
      return currentTime < expirationTime && localStorage.getItem('authToken') !== null;
    }
    return localStorage.getItem('authToken') !== null;
}
}
