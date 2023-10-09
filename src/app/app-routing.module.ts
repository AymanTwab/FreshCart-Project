import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { authGuard } from './auth.guard';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "products", component: ProductsComponent },
  { path: "categories", component: CategoriesComponent },
  { path: "allorders", redirectTo: 'home', pathMatch: 'full' },
  { path: "wishlist", canActivate: [authGuard], component: WishlistComponent },
  { path: "cart", canActivate: [authGuard], component: CartComponent },
  { path: "checkout/:id", canActivate: [authGuard], component: CheckoutComponent },
  { path: "register", component: RegisterComponent },
  { path: "forgetPassword", component: ForgetPasswordComponent },
  { path: "resetPassword", component: ResetPasswordComponent },
  { path: "login", component: LoginComponent },
  { path: "product-details/:title/:id", component: ProductDetailsComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
