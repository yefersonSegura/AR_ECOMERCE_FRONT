import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { PurchaseController } from '../../../../../services/src/lib/domain/controllers/purchase-controller';
import { CartItemModel } from '../../../../../services/src/lib/domain/models/cart-item-model';
import { ProductDto } from '../../../../../services/src/lib/Infrastructure/dto/product-dto';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { InoviceModel } from '../../../../../services/src/lib/domain/models/invoice-model';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  purchaseController = inject(PurchaseController);
  invoice: InoviceModel = {}
  cartItems: CartItemModel[] = [];
  authService = inject(AuthService);
  router = inject(Router);
  renderer = inject(Renderer2);
  ngOnInit(): void {
    this.getCartItems();
  }
  async getCartItems() {
    let result = await this.purchaseController.getCartItems();
    if (result.error) {
      return;
    }
    this.cartItems = result.body ?? [];
    if (this.cartItems.length === 0) {
      this.invoice = {};
      return;
    }
    this.calculateTotalCartItems();
    this.loadCulqiScript();
  }
  quantity: number = 1;
  idProduct: number = 0;
  async addProduct() {
    if (!this.authService.isLoggin()) {
      this.router.navigate(["/login"]);
      return;
    }
    let result = await this.purchaseController.AddProductToShoppingCart(this.idProduct, this.quantity);
    if (result.error) {
      return;
    }
    this.getCartItems();
  }
  async removeProduct(idProduct: number) {
    let result = await this.purchaseController.AddProductToShoppingCart(idProduct, 0);
    if (result.error) {
      return;
    }
    this.getCartItems();
  }
  async calculateTotalCartItems() {
    this.invoice = {
      items: this.cartItems.map(item => ({
        productID: item.productID,
        name: item.name,
        description: item.description,
        price: item.price,
        stock: item.stock,
        categoryID: item.categoryID,
        urlImage: item.urlImage,
        categoryName: item.categoryName,
        quantity: item.quantity,
        discount: item.discount
      })),
    };
    let result = await this.purchaseController.calculateTotalCartItems(this.invoice);
    if (result.error) {
      return;
    }
    this.invoice = result.body ?? {};
  }

  loadCulqiScript() {
    const script = this.renderer.createElement('script');
    script.src = 'https://js.culqi.com/checkout-js';
    script.onload = () => this.newVerion();
    this.renderer.appendChild(document.body, script);
  }

  setupCulqi() {
    // Configuración de Culqi después de que se cargue el script
    const amountInCents = Math.round((this.invoice.totalGrandPrix ?? 0) * 100);
    (window as any).Culqi.publicKey = 'pk_test_Zs5btffktUJNRZBW';
    (window as any).Culqi.settings({
      title: 'AR ACCESORIOS',
      currency: 'PEN',
      amount: amountInCents,
      order: 'ord_live_0CjjdWhFpEAZlxlz',
      xculqirsaid: 'ea8c5696-b0f6-4f61-88cd-12ffe3a1eef1',
      rsapublickey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDAjHMDiwnXeuVsUyPIEfJpRXShphSr5HaVrpMCjVYc4hSHu8Hus/81UuqXLzD8oWDpQdPDixn5YcBCSp4UjPM5FlRYdMEIP9r9NCea3iodbTktsayOunxUgF1MacPg1S4uBmPCa6GeDqghwvWlD6MbYCQ2lMYeSRR6zuv0XUC0rwIDAQAB',
    });

    (window as any).Culqi.options({
      lang: "es",
      installments: false,
      paymentMethods: {
        tarjeta: true,
        yape: true,
        bancaMovil: false,
        agente: false,
        billetera: false,
        cuotealo: false,
      },
      style: {
        logo: "https://static.culqi.com/v2/v2/static/img/logo.png",
      }
    });
  }
  settings: any;
  client: any;
  paymentMethods: any;
  options: any;
  newVerion() {
    const amountInCents = Math.round((this.invoice.totalGrandPrix ?? 0) * 100);
    this.settings = {
      title: 'Culqi  store 2',
      currency: 'PEN', // Este parámetro es requerido para realizar pagos yape
      amount: amountInCents, // Este parámetro es requerido para realizar pagos yape(80.00)
      order: 'ord_live_d1P0Tu1n7Od4nZdp', // Este parámetro es requerido para realizar pagos con pagoEfectivo, billeteras y Cuotéalo
      xculqirsaid: 'ea8c5696-b0f6-4f61-88cd-12ffe3a1eef1',
      rsapublickey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDAjHMDiwnXeuVsUyPIEfJpRXShphSr5HaVrpMCjVYc4hSHu8Hus/81UuqXLzD8oWDpQdPDixn5YcBCSp4UjPM5FlRYdMEIP9r9NCea3iodbTktsayOunxUgF1MacPg1S4uBmPCa6GeDqghwvWlD6MbYCQ2lMYeSRR6zuv0XUC0rwIDAQAB'
    }
    this.client = {
      email: 'yefersonsegura25@demo.com',
    }
    this.paymentMethods = {// las opciones se ordenan según se configuren
      tarjeta: true,
      yape: true,
      billetera: false,
      bancaMovil: false,
      agente: false,
      cuotealo: false,
    }

    this.options = {
      lang: 'auto',
      installments: false, // Habilitar o deshabilitar el campo de cuotas
      modal: true,
      container: "", // Opcional - Div donde quieres cargar el checkout
      paymentMethods: this.paymentMethods,
      paymentMethodsSort: Object.keys(this.paymentMethods), // las opciones se ordenan según se configuren en paymentMethods
    }
  }
  openCulqi() {
    let config = {
      settings: this.settings,
      client: this.client,
      options: this.options
    };
    const publicKey = 'pk_test_Zs5btffktUJNRZBW';
    const Culqi = new (window as any).CulqiCheckout(publicKey, config);
    Culqi.open();
  }
}
