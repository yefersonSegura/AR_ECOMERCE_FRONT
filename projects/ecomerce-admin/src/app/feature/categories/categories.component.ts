import { Component, OnInit } from '@angular/core';
import { WharehouseController } from '../../../../../services/src/lib/domain/controllers/wharehouse-controller';
import { CategoryModel } from '../../../../../services/src/lib/domain/models/category-model';
import { CategoryDto } from '../../../../../services/src/lib/Infrastructure/dto/category-dto';
import { isNullOrUndefined, alertsMessage } from '../../../../../services/src/lib/domain/functions/common.functions';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categories: CategoryDto[] = [];
  visible: boolean = false;
  categoryModel: CategoryModel = {};
  cols: any[] = [];
  submitted: boolean = false;
  loading: boolean = false;
  constructor(private wharehouseController: WharehouseController) { }
  ngOnInit(): void {
    this.getCategories();
    this.cols = [
      { field: 'categoryName', header: 'Nombre', type: '', align: 'left', format: '', width: '550px', minWidth: '', maxWidth: '', display: 'table-cell' },
      { field: 'description', header: 'Descripción', type: '', align: 'left', format: '', width: '650px', minWidth: '', maxWidth: '', display: 'table-cell' },
    ];
  }
  async getCategories() {
    let result = await this.wharehouseController.getCategory();
    if (result.error) {
      return;
    }
    this.categories = result.body ?? [];
  }
  async saveCategories() {
    this.submitted = true;
    if (this.validatorFormNew()) {
      return;
    }
    this.submitted = false;
    let result = await this.wharehouseController.saveCategory(this.categoryModel);
    if (result.error) {
      alertsMessage('error', result.messageAlert?.summary ?? 'Error', result.messageAlert?.detail ?? "");
      return;
    }
    alertsMessage('success', "¡Hecho!", result.body ?? "");
    this.visible = false;
    this.categoryModel = {};
    this.getCategories();

  }
  async removeEdit(model: CategoryModel) {
    this.categoryModel = model;
    this.visible = true;
  }
  async removeRow(model: CategoryModel) {
    let result = await this.wharehouseController.deleteCategory(model.categoryID ?? 0);
    if (result.error) {
      alertsMessage('error', result.messageAlert?.summary ?? 'Error', result.messageAlert?.detail ?? "");
      return;
    }
    alertsMessage('success', "¡Hecho!", result.body ?? "");
    this.getCategories();
  }

  validatorFormNew() {
    let state = false;
    state = (isNullOrUndefined(this.categoryModel.categoryName) || isNullOrUndefined(this.categoryModel.description)
    );
    return state;
  }
}