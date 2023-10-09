import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';
declare let Swal: any
declare let $: any


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  productData: any = []
  productImages: any = []
  constructor(private _ActivatedRoute: ActivatedRoute, private _ProductsService: ProductsService, private _CartService: CartService, private _WishlistService: WishlistService, private _Router: Router) {
    window.scrollTo(0, 0);
    _ActivatedRoute.params.subscribe(
      (data) => {
        _ProductsService.getProductsDetails(data['id']).subscribe({
          next: (data) => {
            this.productData = data.data;
            this.productImages = data.data.images;
          },
          complete: () => {
            $("#loading").fadeOut(1000)
          }
        })
      }
    )
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }


  addToCart(id: string) {
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
}
