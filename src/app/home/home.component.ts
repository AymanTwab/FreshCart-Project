import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../services/products.service';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

declare let Swal: any
declare let $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  products: any[] = []
  categories: any[] = []
  productTitle: string = ''
  // wishlist: BehaviorSubject<any> = new BehaviorSubject('')
  wishlist: any[] = []

  constructor(private _Router: Router, private _ProductsService: ProductsService, private _WishlistService: WishlistService, private _CartService: CartService) {
    window.scrollTo(0, 0);
    this.getWishlistData()
    this.getProductsData()
    this.getCategories()
  }






  getProductsData() {
    this._ProductsService.getProducts().subscribe(
      {
        next: (data) => {
          this.products = data.data;
        },
        error: (err) => {

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

  getCategories() {
    this._ProductsService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.data
      }
    })
  }


  Category: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 4
      },
      740: {
        items: 5
      },
      940: {
        items: 7
      }
    },
    nav: true
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

  getWishlistData() {
    if (localStorage.getItem('token')) {
      this._WishlistService.getWishlist().subscribe({
        next: (data) => {
          this.wishlist = data.data
        },
        error: (err) => {

        }
      })
    }
  }

  addToCart(id: string) {
    if (localStorage.getItem('token')) {

      this._CartService.addToCart(id).subscribe({
        next: (response) => {
          if (response.status == 'success') {
            this._CartService.numOfCartItems.next(response.numOfCartItems)
            this.getWishlistData()
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: response.message,
              showConfirmButton: false,
              timer: 1500
            })
          }
        },
        error: (err) => {

        }
      })
    } else {
      this._Router.navigate(['/login'])
    }
  }
}
