import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../services/products.service';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';


declare let Swal: any
declare let $: any


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  searchTerm: string = ''
  wishList: any[] = []
  products: any[] = []
  productTitle: string = ''
  constructor(private _Router: Router, private _ProductsService: ProductsService, private _WishlistService: WishlistService, private _CartService: CartService) {
    window.scrollTo(0, 0);
    this.getProductsData()
  }

  getProductsData() {
    this._ProductsService.getProducts().subscribe(
      {
        next: (data) => {
          this.products = data.data;
        },
        complete: () => {
          $("#loading").fadeOut(1000)
        }
      }
    )
  }

  productDetails(id: string) {
    this._ProductsService.getProductsDetails(id).subscribe(
      (data) => {
      }
    )
  }

  AddToWishlist(id: string) {
    if (localStorage.getItem('token')) {

      this._WishlistService.AddToWishlist(id).subscribe({
        next: (data) => {
        }
      })
    } else {
      this._Router.navigate(['/login'])
    }
  }
  addToCart(id: string) {
    if (localStorage.getItem('token')) {
      this._CartService.addToCart(id).subscribe({
        next: (response) => {
          if (response.status == 'success') {
            this._CartService.numOfCartItems.next(response.numOfCartItems)
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: response.message,
              showConfirmButton: false,
              timer: 1500
            })
          }
        }
      })
    } else {
      this._Router.navigate(['/login'])
    }
  }
}
