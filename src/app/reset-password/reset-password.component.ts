import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  errMessage: string = ''
  successMessage: string = ''
  loading: boolean = false

  constructor(private _AuthService: AuthService, private _Router: Router) {
    window.scrollTo(0, 0);
  }

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)])
  })


  submitResetPassword(form: FormGroup) {
    this.loading = true
    this._AuthService.resetResetCode(form.value).subscribe({
      next: (data) => {
        if (data.token) {
          this._Router.navigate(['/login'])
        }
      },
      error: (err) => {
        this.errMessage = err.error.message
        this.loading = false

      },
    })
  }
}
