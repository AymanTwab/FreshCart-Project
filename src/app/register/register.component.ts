import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  errMessage: string = ''
  successMessage: string = ''
  loading: boolean = false
  constructor(private _AuthService: AuthService, private _Router: Router) {
    window.scrollTo(0, 0);
  }

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, { validators: this.rePasswordMatch })

  submitRegister(formData: FormGroup) {
    if (formData.valid == true) {
      this.loading = true
      this._AuthService.register(formData.value).subscribe({
        next: (data) => {
          if (data.message == 'success') {
            this._Router.navigate(['/login'])
          }
        },
        error: (err) => {
          this.errMessage = err.error.message
          this.loading = false
        }
      })
    }
  }

  rePasswordMatch(form: any) {
    let password = form.get('password')
    let rePassword = form.get('rePassword')
    if (password?.value == rePassword?.value) {
      return null

    } else {
      rePassword?.setErrors({ passMatch: 'RePassword and Password are not matched' })
      return { passMatch: 'RePassword and Password are not matched' }
    }
  }
}
