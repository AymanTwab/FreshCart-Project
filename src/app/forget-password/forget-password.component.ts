import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  errMsgEmail: string = ''
  errMsgCode: string = ''
  loading: boolean = false
  constructor(private _AuthService: AuthService, private _Router: Router) {
    window.scrollTo(0, 0);

  }
  forgetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })


  forgetPasswordSubmit(form: FormGroup) {
    this.loading = true
    this._AuthService.forgetPassword(form.value).subscribe({
      next: (data) => {
        this.loading = false
        if (data.statusMsg == 'success') {
          document.querySelector('.forgetPassword')?.classList.add('d-none')
          document.querySelector('.resetCode')?.classList.remove('d-none')
        }

      },
      error: (err) => {
        this.loading = false
        this.errMsgEmail = err.error.message
      }
    })
  }


  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)])
  })


  resetCodeSubmit(form: FormGroup) {
    this.loading = true
    this._AuthService.verifyResetCode(form.value).subscribe({
      next: (data) => {
        this.loading = false
        if (data.status == 'Success') {
          this._Router.navigate(['/resetPassword'])
        }

      },
      error: (err) => {
        this.loading = false
        this.errMsgCode = err.error.message

      }
    })
  }
}


