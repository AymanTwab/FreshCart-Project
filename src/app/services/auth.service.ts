import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem('token')) {
      let token: string | null = localStorage.getItem('token')
      if (token != null) {
        let data: string = jwtDecode(token)
        this.saveUserData(data)
      }
    }
  }

  baseUrl: string = 'https://ecommerce.routemisr.com'
  userToken: string | null = localStorage.getItem('token')
  userData: BehaviorSubject<any> = new BehaviorSubject(null)




  saveUserData(data: any) {
    this.userData.next(data)
  }
  register(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup`, data);
  }
  login(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin`, data);
  }
  forgetPassword(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/forgotPasswords`, data);
  }
  verifyResetCode(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`, data);
  }
  resetResetCode(data: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/auth/resetPassword`, data);
  }



  logout() {
    localStorage.removeItem('token')
    this.saveUserData(null)
    this._Router.navigate(['/login'])
  }


}
