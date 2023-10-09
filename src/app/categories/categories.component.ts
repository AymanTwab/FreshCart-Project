import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';
import { product } from '../products';
import { Router } from '@angular/router';


declare let Swal: any
declare let $: any


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  categories: any[] = []
  products: product[] = []
  categoryId: string = '6439d58a0049ad0b52b9003f'

  constructor(private _Router: Router, private _ProductsService: ProductsService, private _CartService: CartService, private _WishlistService: WishlistService) {
    window.scrollTo(0, 0);
    this.getProducts()
    this.getCategories()
  }

  getCategoryProducts(id: string) {
    this.categoryId = id
    this.getProducts()

  }

  getProducts() {
    this._ProductsService.getProducts().subscribe(
      (data) => {
        this.products = data.data;
      }
    )
  }

  getCategories() {
    this._ProductsService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.data
      },
      complete: () => {
        $("#loading").fadeOut(1000)
      }
    })
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
}
