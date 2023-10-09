import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cartNumber: number = 0
  constructor(private _AuthService: AuthService, private _Router: Router, private _CartService: CartService) {
    this.getNumberOfCart()
  }

  getNumberOfCart() {
    if (localStorage.getItem('token')) {
      this._CartService.numOfCartItems.subscribe({
        next: (val) => {
          this.cartNumber = val
        },
        error: (err) => {
        }
      })
    }
  }
  isLogin: any = null

  ngOnInit(): void {
    this.gettingUserData()
  }

  gettingUserData() {
    this._AuthService.userData.subscribe({
      next: () => {
        this.isLogin = this._AuthService.userData.getValue()
      }
    })
  }

  logout() {
    this._AuthService.logout()
  }
}
