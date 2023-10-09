import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private _HttpClient: HttpClient, private _AuthService: AuthService) {
    this.getNumOfCart()

  }

  baseUrl: string = this._AuthService.baseUrl
  numOfCartItems = new BehaviorSubject(0)

  getNumOfCart() {
    if (localStorage.getItem('token')) {
      this.getCartData().subscribe({
        next: (response) => {
          if (response.status == "success") {
            this.numOfCartItems.next(response.numOfCartItems)
          }
        },
      })
    }
  }

  getCartData(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`)
  }

  addToCart(id: string): Observable<any> {
    let body: any = { "productId": id }
    return this._HttpClient.post(`${this.baseUrl}/api/v1/cart`, body)
  }

  removeFromCart(id: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${id}`)
  }

  updateProductCount(count: number, id: string): Observable<any> {
    let body: any = { "count": count }
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${id}`, body)
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart`)
  }

  checkPayment(cartId: string, shippingData: any): Observable<any> {
    let body = {
      "shippingAddress": shippingData
    }
    return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`, body)

  }
}
