import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  errMessage: string = ''
  successMessage: string = ''
  loading: boolean = false

  constructor(private _AuthService: AuthService, private _Router: Router) {
    window.scrollTo(0, 0);
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)])
  })

  submitLogin(formData: FormGroup) {
    this.loading = true
    return this._AuthService.login(formData).subscribe({
      next: (data) => {
        this._AuthService.saveUserData(data)
        localStorage.setItem('token', data.token)
        this._Router.navigate(['/home'])
      }, error: (err) => {
        this.errMessage = err.error.message
        this.loading = false
      }
    });

  }
}
