import { Component, OnInit } from '@angular/core';
import { ProductDto } from '../../../../../services/src/lib/Infrastructure/dto/product-dto';
import { ProductModel } from '../../../../../services/src/lib/domain/models/product-model';
import { alertsMessage, isNullOrUndefined, PromotionController, WharehouseController } from '../../../../../services/src/public-api';
import { CategoryDto } from '../../../../../services/src/lib/Infrastructure/dto/category-dto';
import { PromotionModel } from '../../../../../services/src/lib/domain/models/promotion-model';
import { PromotionsDto } from '../../../../../services/src/lib/Infrastructure/dto/promotions-dto';
import { DataView } from 'primeng/dataview';
import { ImageCacheService } from '../../../../../services/src/lib/config/services/Image.cache.service';
import { CommonService } from '../../../../../services/src/lib/config/services/common.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: ProductDto[] = [];
  visible: boolean = false;
  productModel: ProductModel = {};
  cols: any[] = [];
  submitted: boolean = false;
  loading: boolean = false;
  loadingSaveProduct: boolean = false;
  showdialogprometions: boolean = false;
  categories: CategoryDto[] = [];
  selectedCategory: CategoryDto = {};
  showdialogprometion: boolean = false;
  promotionModel: PromotionModel = {};
  selectedProduct: ProductDto = {};
  promotions: PromotionsDto[] = [];
  sortOrder: number = 0;
  sortField: string = '';
  constructor(private wharehouseController: WharehouseController,
    private promotionControler: PromotionController,
    private imageCache: ImageCacheService, private commonService: CommonService) { }
  ngOnInit(): void {
    this.cols = [
      { field: 'urlImage', header: 'Imagen', type: 'image', align: 'left', format: '', width: '100px', minWidth: '', maxWidth: '', display: 'table-cell' },
      { field: 'name', header: 'Nombre', type: '', align: 'left', format: '', width: '100px', minWidth: '', maxWidth: '', display: 'table-cell' },
      { field: 'description', header: 'Descripción', type: '', align: 'left', format: '', width: '250px', minWidth: '', maxWidth: '', display: 'table-cell' },
      { field: 'price', header: 'Precio', type: '', align: 'left', format: '', width: '50px', minWidth: '', maxWidth: '', display: 'table-cell' },
      { field: 'categoryName', header: 'Categoria', type: '', align: 'left', format: '', width: '150px', minWidth: '', maxWidth: '', display: 'table-cell' },
      { field: 'stock', header: 'Stock', type: '', align: 'left', format: '', width: '50px', minWidth: '', maxWidth: '', display: 'table-cell' },
    ];
    this.getCategories();
    this.getProducts();
  }
  onFilter(dv: DataView, event: Event) {
    dv.filter((event.target as HTMLInputElement).value);
  }
  async getProducts() {
    this.loading = true;
    let result = await this.wharehouseController.getProducts(0);
    this.loading = false;
    if (result.error) {
      return;
    }
    this.products = result.body ?? [];
  }
  async getCategories() {
    let result = await this.wharehouseController.getCategory();
    if (result.error) {
      return;
    }
    this.categories = result.body ?? [];
  }
  removeEdit(data: ProductDto) {
    this.productModel = data;
    this.selectedCategory = this.categories.filter(p => p.categoryID == data.categoryID)[0];
    this.visible = true;
  }
  newPromotion() {
    this.showdialogprometions = false;
    this.showdialogprometion = true;
  }
  removeEditPromotion(data: PromotionsDto) {
    this.showdialogprometions = false;
    this.promotionModel = { color: data.color, description: data.description, discount: data.discount, endDate: data.endDate ? new Date(data.endDate) : undefined, idCategory: data.idCategory, idProduct: data.idProduct, idPromotion: data.idPromotion, startDate: data.startDate ? new Date(data.startDate) : undefined, state: data.state, title: data.title };
    this.showdialogprometion = true;
  }
  async removeRow(data: ProductDto, event:Event) {
    let confirm = await this.commonService.confirmQuestion(event, "¿Seguro  que desea eliminar este producto?");
    if (!confirm) {
      return;
    }
    let result = await this.wharehouseController.deleteProduct(data.productID ?? 0);
    if (result.error) {
      alertsMessage('error', result.messageAlert?.summary ?? 'Error', result.messageAlert?.detail ?? "");
      return;
    }
    alertsMessage('success', "¡Hecho!", result.body ?? "");
    this.getProducts();
  }
  onShowModalPrometion(data: ProductDto) {
    this.selectedProduct = data;
    this.showdialogprometions = true;
    this.getPromotionsByProduct();
  }
  onFileSelectedfileimage(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result?.toString().split(',')[1];
        this.promotionModel.base64Url = base64String;
      };
      reader.readAsDataURL(file);
    }
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result?.toString().split(',')[1];
        this.productModel.base64Url = base64String;
      };
      reader.readAsDataURL(file);
    }
  }
  async saveProduct() {
    this.submitted = true;
    this.productModel.categoryID = this.selectedCategory.categoryID ?? 0;
    if (this.validatorFormNew()) {
      return;
    }
    this.submitted = false;
    this.loadingSaveProduct = true;
    let result = await this.wharehouseController.saveProduct(this.productModel);
    this.loadingSaveProduct = false;
    this.visible = false;
    if (result.error) {
      alertsMessage('error', result.messageAlert?.summary ?? 'Error', result.messageAlert?.detail ?? "");
      return;
    }
    alertsMessage('success', "¡Hecho!", result.body ?? "");
    this.productModel = {};
    this.getProducts();
  }
  validatorFormNew() {
    let state = false;
    state = (isNullOrUndefined(this.productModel.name) || isNullOrUndefined(this.productModel.description)
      || isNullOrUndefined(this.productModel.price) || isNullOrUndefined(this.productModel.stock) ||
      isNullOrUndefined(this.productModel.categoryID)
    );
    return state;
  }
  async savePromotion() {
    this.submitted = true;
    this.promotionModel.idProduct = this.selectedProduct.productID ?? 0;
    if (this.validatorFormPromotion()) {
      return;
    }
    this.submitted = false;
    this.loadingSaveProduct = true;
    let result = await this.promotionControler.savePromotion(this.promotionModel);
    this.loadingSaveProduct = false;
    this.showdialogprometion = false;
    if (result.error) {
      alertsMessage('error', result.messageAlert?.summary ?? 'Error', result.messageAlert?.detail ?? "");
      return;
    }
    alertsMessage('success', "¡Hecho!", result.body ?? "");
    this.promotionModel = {};
  }
  validatorFormPromotion() {
    let state = false;
    if (isNullOrUndefined(this.promotionModel.idPromotion)) {
      state = (isNullOrUndefined(this.promotionModel.title) || isNullOrUndefined(this.promotionModel.description)
        || isNullOrUndefined(this.promotionModel.startDate) || isNullOrUndefined(this.promotionModel.endDate) ||
        isNullOrUndefined(this.promotionModel.base64Url) || isNullOrUndefined(this.promotionModel.discount) ||
        isNullOrUndefined(this.selectedProduct.productID) || isNullOrUndefined(this.promotionModel.color)

      );
    } else {
      state = isNullOrUndefined(this.promotionModel.title) || isNullOrUndefined(this.promotionModel.description)
        || isNullOrUndefined(this.promotionModel.startDate) || isNullOrUndefined(this.promotionModel.endDate) ||
        isNullOrUndefined(this.promotionModel.discount) || isNullOrUndefined(this.selectedProduct.productID) || isNullOrUndefined(this.promotionModel.color)
    }
    return state;
  }
  async getPromotionsByProduct() {
    let result = await this.promotionControler.getPromotionsByProduct(this.selectedProduct.productID ?? 0);
    if (result.error) {
      return;
    }
    this.promotions = result.body ?? [];
  }
  async deteletePromotions(promotion: PromotionsDto, event: Event) {
    let confirm = await this.commonService.confirmQuestion(event, "¿Seguro  que desea eliminar esta promoción?");
    if (confirm) {
      let result = await this.promotionControler.deletePromotions(promotion.idPromotion ?? 0);
      this.showdialogprometions = false;
      if (result.error) {
        alertsMessage('error', result.messageAlert?.summary ?? 'Error', result.messageAlert?.detail ?? "");
        return;
      }
      alertsMessage('success', "¡Hecho!", result.body ?? "");
    }
  }
}
