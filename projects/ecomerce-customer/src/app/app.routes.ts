import { ExtraOptions, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { CartComponent } from './features/cart/cart.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterUserComponent } from './features/auth/register-user/register-user.component';
import { authGuard, authGuardLogin } from './shared/services/auth.guard';
import { AboutComponent } from './features/about/about.component';
import { PrivacityComponent } from './features/privacity/privacity.component';
import { TermsComponent } from './features/terms/terms.component';
import { ClaimsComponent } from './features/claims/claims.component';
import { ExchangeandReturnPolicyComponent } from './features/exchangeand-return-policy/exchangeand-return-policy.component';

export const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'product-detail/:id', component: ProductDetailComponent },
    { path: 'cart', component: CartComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent, canActivate: [authGuardLogin] },
    { path: 'register', component: RegisterUserComponent, canActivate: [authGuardLogin] },
    { path: 'about', component: AboutComponent },
    { path: 'privacity', component: PrivacityComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'claims', component: ClaimsComponent },
    { path: 'exchange-return-policy', component: ExchangeandReturnPolicyComponent }
];
