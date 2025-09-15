import { ExtraOptions, Routes } from '@angular/router';
import { LoginComponent } from './feature/login/login.component';
import { AppLayoutComponent } from './shared/template/components/app.layout.component';
import { authGuard, authGuardLogin } from './shared/services/auth.guard';
import { EmployeeeComponent } from './feature/employeee/employeee.component';
import { CustomersComponent } from './feature/customers/customers.component';
import { CategoriesComponent } from './feature/categories/categories.component';
import { ProductsComponent } from './feature/products/products.component';

export const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};
export const routes: Routes = [
    { path: '', component: LoginComponent, canActivate: [authGuardLogin] },
    {
        path: 'panel', component: AppLayoutComponent, canActivate: [authGuard],
        children: [
            { path: 'employee', component: EmployeeeComponent },
            { path: 'customer', component: CustomersComponent },
            { path: 'categories', component: CategoriesComponent },
            { path: 'products', component: ProductsComponent }
        ],
    }
];
