import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../Infrastructure/reporitory/user-repository';
import { UserController } from './controllers/user-controller';
import { EmployeeController } from './controllers/employee-controller';
import { EmployeeService } from '../Infrastructure/reporitory/employee-repository';
import { CustomerController } from './controllers/customer-controller';
import { CustomerService } from '../Infrastructure/reporitory/customer-repository';
import { PromotionController } from './controllers/promotion-controller';
import { PromotionService } from '../Infrastructure/reporitory/promotion-repository';
import { HttpAppWeb } from '../config/https/http-backend';
import { AppConfig } from '../config/services/app.config.service';
import { provideHttpClient } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers:[
    provideHttpClient(),
    UserService,
    UserController,
    EmployeeService,
    EmployeeController,
    CustomerController,
    CustomerService,
    PromotionController,
    PromotionService,
    HttpAppWeb,
    AppConfig,
  ]
})
export class ServiceApiModule { }
