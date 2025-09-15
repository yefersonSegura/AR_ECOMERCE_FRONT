import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { routerOptions, routes } from './app.routes';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './features/home/home.component';
import { PromotionComponent } from './features/promotion/promotion.component';
import { ServiceApiModule } from '../../../services/src/public-api';
import { AppConfig } from '../../../services/src/lib/config/services/app.config.service';
import { PresentationProductComponent } from './features/presentation-product/presentation-product.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { RegisterUserComponent } from './features/auth/register-user/register-user.component';
import { LoginComponent } from './features/auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { MethodPaymentComponent } from './features/method-payment/method-payment.component';
import { CartComponent } from './features/cart/cart.component';
import { environment } from '../environments/environment';
import { AboutComponent } from './features/about/about.component';
import { PrivacityComponent } from './features/privacity/privacity.component';
import { ClaimsComponent } from './features/claims/claims.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PromotionComponent,
    PresentationProductComponent,
    ProductDetailComponent,
    RegisterUserComponent,
    LoginComponent,
    MethodPaymentComponent,
    CartComponent,
    AboutComponent,
    FooterComponent,
    PrivacityComponent,
    ClaimsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterOutlet,
    RouterModule.forRoot(routes, routerOptions),
    ServiceApiModule,
    FormsModule
  ],
  providers:[
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], multi: true
    },
  ],
  bootstrap:[AppComponent]
})
export class AppModule { }
export function initializeApp(appConfig: AppConfig) {
  appConfig.addEnviroment(environment.name);
  return () => appConfig.load();
}

