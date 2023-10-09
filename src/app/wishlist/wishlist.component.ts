import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { WishlistService } from '../services/wishlist.service';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../services/cart.service';

declare let Swal: any
declare let $: any


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  products: any[] = []
  wishlist: BehaviorSubject<any> = new BehaviorSubject('')
  isEmpty: boolean = false
  constructor(private _ProductsService: ProductsService, private _WishlistService: WishlistService, private _CartService: CartService) {
    window.scrollTo(0, 0);
    this.getWishlistData()
  }

  getWishlistData() {
    this._WishlistService.getWishlist().subscribe({
      next: (data) => {
        this.wishlist.next(data)
      },
      complete: () => {
        $("#loading").fadeOut(1000)
      }
    })
  }

  ngOnInit(): void {
    this.wishlist.subscribe({
      next: (data) => {

        this.products = data.data
        if (data.count == 0) {
          this.isEmpty = true
        } else {
          this.isEmpty = false

        }
      }
    })
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

  removeFromWishlist(id: string) {
    this._WishlistService.removeFromWishlist(id).subscribe({
      next: (response) => {
        this.getWishlistData()
      }
    })
  }

}
