import { Component, inject, OnInit } from '@angular/core';
import { isNullOrUndefined, WharehouseController } from '../../../../../services/src/public-api';
import { ProductDto } from '../../../../../services/src/lib/Infrastructure/dto/product-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseController } from '../../../../../services/src/lib/domain/controllers/purchase-controller';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: ProductDto = {};
  purchaseController = inject(PurchaseController);
  wharehouseController = inject(WharehouseController);
  routeActivate = inject(ActivatedRoute);
  route = inject(Router);
  authService = inject(AuthService);
  router = inject(Router);
  ngOnInit(): void {
    this.routeActivate.params.subscribe((params) => {
      if (!isNullOrUndefined(params['id'])) {
        this.getProductById(params['id'] as number,);
      }
    });
  }
  async getProductById(id: number) {
    let result = await this.wharehouseController.getProducts(id);
    if (result.error) {
      return;
    }
    if (result.body?.length! > 0) {
      this.product = result.body![0];
    }
  }
  async addProduct(product: ProductDto) {
    if (!this.authService.isLoggin()) {
      this.router.navigate(["/login"]);
      return;
    }
    let result = await this.purchaseController.AddProductToShoppingCart(product.productID!, 1);
    if (result.error) {
      return;
    }
  }
  navigateDetail() {
    this.route.navigate(['/']);
  }
}
