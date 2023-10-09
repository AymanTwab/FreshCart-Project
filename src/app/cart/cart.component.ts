import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';

declare let $: any
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  products: any = []
  cartData: any = ''
  emptyCart: boolean = false
  errData: any = {
    "numOfCartItems": 0,
    "data": {
      "products": [],
      "__v": 0,
      "totalCartPrice": 0
    }
  }
  constructor(private _ProductsService: ProductsService, private _CartService: CartService) {
    this.getCartData()
    window.scrollTo(0, 0);
  }

  getCartData() {
    this._CartService.getCartData().subscribe({
      next: (data) => {
        if (data.status == "success") {
          this._CartService.numOfCartItems.next(data.numOfCartItems)
          this.products = data.data.products
          this.cartData = data
        }
      },
      error: (err) => {
        this._CartService.numOfCartItems.next(this.errData.numOfCartItems)
        this.products = this.errData.data.products
        this.cartData = this.errData
        $("#loading").fadeOut(1000)
      },
      complete: () => {
        $("#loading").fadeOut(1000)
      }
    })
  }


  removeFromCart(id: string) {
    this._CartService.removeFromCart(id).subscribe({
      next: (response) => {
        if (response.status) {
          this.getCartData()
        }


      },
      error: (err) => {
      }
    })
  }

  countUpdate(count: number, id: string) {

    if (count > 0) {
      this._CartService.updateProductCount(count, id).subscribe({
        next: (response) => {
          if (response.status) {
            this.cartData = response
            this.products = response.data.products
          }

        }
      })
    } else if (count == 0) {
      this.removeFromCart(id)
    }

  }

  clearCart() {
    this._CartService.clearCart().subscribe({
      next: (response) => {
        this.getCartData()
      }

    })
  }
}
