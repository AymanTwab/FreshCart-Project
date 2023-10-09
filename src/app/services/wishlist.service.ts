import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient: HttpClient, private _AuthService: AuthService) { }

  baseUrl: string = this._AuthService.baseUrl

  getWishlist(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/wishlist`)
  }
  AddToWishlist(id: string): Observable<any> {
    let body: any = {
      "productId": id
    }
    return this._HttpClient.post(`${this.baseUrl}/api/v1/wishlist`, body)
  }
  removeFromWishlist(id: string): Observable<any> {

    return this._HttpClient.delete(`${this.baseUrl}/api/v1/wishlist/${id}`)
  }
}
