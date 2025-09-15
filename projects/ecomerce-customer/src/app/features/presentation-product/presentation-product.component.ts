import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { WharehouseController } from '../../../../../services/src/public-api';
import { ProductDto } from '../../../../../services/src/lib/Infrastructure/dto/product-dto';
import { timeout } from 'rxjs';
import { Router } from '@angular/router';
declare function executeSlider(): void;
@Component({
  selector: 'app-presentation-product',
  standalone: false,
  templateUrl: './presentation-product.component.html',
  styleUrl: './presentation-product.component.scss'
})
export class PresentationProductComponent implements OnInit {
  products: ProductDto[] = [];
  isHidden: boolean = true;
  constructor(private wharehouseController: WharehouseController, private el: ElementRef, private renderer: Renderer2, private route: Router) {

  }
  ngOnInit(): void {
    this.getProductHome();
  }

  async getProductHome() {
    let result = await this.wharehouseController.getProductsHome(0, true);
    if (result.error) {
      return;
    }
    this.products = result.body ?? [];
    setTimeout(() => {
      executeSlider();
      this.isHidden = false;
    }, 10)
  }
  navigateDetail(model: ProductDto) {
    this.route.navigate(['/product-detail', model.productID]);
  }
}
