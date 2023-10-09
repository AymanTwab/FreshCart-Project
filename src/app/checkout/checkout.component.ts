import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  cartId: any = ''
  constructor(private _CartService: CartService, private _ActivatedRoute: ActivatedRoute) {
    window.scrollTo(0, 0);
    _ActivatedRoute.params.subscribe((data: any) => {
      this.cartId = data.id
    })
  }

  shippingForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
  })

  checkPayment(form: FormGroup) {

    this._CartService.checkPayment(this.cartId, form).subscribe({
      next: (response: any) => {
        window.location.href = response.session.url

      }
    })
  }

}
