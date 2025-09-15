import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { routerOptions, routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './feature/login/login.component';
import { TemplateModule } from './shared/template/template.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { AppConfig } from '../../../services/src/lib/config/services/app.config.service';
import { EmployeeeComponent } from './feature/employeee/employeee.component';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CustomersComponent } from './feature/customers/customers.component';
import { ProductsComponent } from './feature/products/products.component';
import { CategoriesComponent } from './feature/categories/categories.component';
import { DropdownModule } from 'primeng/dropdown';
import { AvatarModule } from 'primeng/avatar';
import { CalendarModule } from 'primeng/calendar';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ColorPickerModule } from 'primeng/colorpicker';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeeComponent,
    CustomersComponent,
    ProductsComponent,
    CategoriesComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterOutlet,
    RouterModule.forRoot(routes, routerOptions),
    TemplateModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    DropdownModule,
    AvatarModule,
    CalendarModule,
    InputGroupModule,
    InputGroupAddonModule,
    ColorPickerModule
  ],
  providers:[
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function initializeApp(appConfig: AppConfig) {
  appConfig.addEnviroment(environment.name);
  return () => appConfig.load();
}
