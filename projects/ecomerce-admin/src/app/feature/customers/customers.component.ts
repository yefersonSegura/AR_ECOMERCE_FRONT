import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined, alertsMessage } from '../../../../../services/src/lib/domain/functions/common.functions';
import { CustomerController } from '../../../../../services/src/public-api';
import { CustomerDto } from '../../../../../services/src/lib/Infrastructure/dto/customer-dto';
import { CustomerModel } from '../../../../../services/src/lib/domain/models/customer-model';
import { UserCustomerModel } from '../../../../../services/src/lib/domain/models/user-customer';

@Component({
  selector: 'app-customers',
  standalone: false,
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent implements OnInit {
  customers: CustomerDto[] = [];
  loading: boolean = false;
  cols: any[] = [];
  visible: boolean = false;
  customerModel: CustomerModel = {};
  submitted: boolean = false;
  visibleModalUserCustomer: boolean = false;
  loadingUserCustomer: boolean = false;
  userModel: UserCustomerModel = {};
  constructor(private controller: CustomerController) { }
  ngOnInit(): void {
    this.cols = [
      { field: 'firstName', header: 'Primer Nombre', type: '', align: 'left', format: '', width: '250px', minWidth: '', maxWidth: '', display: 'table-cell' },
      { field: 'lastName', header: 'Segundo Nombre', type: '', align: 'left', format: '', width: '290px', minWidth: '170px', maxWidth: '', display: 'table-cell' },
      { field: 'email', header: 'Email', type: '', align: 'left', format: 'dd/MM/yyyy', width: '270px', minWidth: '170px', maxWidth: '', display: 'table-cell' },
      { field: 'phone', header: 'Celular', type: '', align: 'left', format: '', width: '200px', minWidth: '200px', maxWidth: '', display: 'table-cell' },
      { field: 'address', header: 'Dirección', type: '', align: 'left', format: '', width: '100px', minWidth: '', maxWidth: '', display: 'table-cell' },
      { field: 'city', header: 'Ciudad', type: '', align: 'left', format: '', width: '250px', minWidth: '', maxWidth: '', display: 'table-cell' }
    ]
    this.getCustomer();
  }

  async getCustomer() {
    this.loading = true;
    let result = await this.controller.getCustomer(0);
    this.loading = false;
    if (result.error) {
      return;
    }
    this.customers = result.body ?? [];
  }

  async saveCustomer() {
    this.submitted = true;
    if (this.validatorFormNew()) {
      return;
    }
    this.submitted = false;
    let result = await this.controller.saveCustomer(this.customerModel);
    if (result.error) {
      alertsMessage('error', result.messageAlert?.summary ?? 'Error', result.messageAlert?.detail ?? "");
      return;
    }
    alertsMessage('success', "¡Hecho!", result.body ?? "");
    this.visible = false;
    this.customerModel = {};
    this.getCustomer();

  }
  async removeRow(model: CustomerModel) {
    let result = await this.controller.deleteCustomer(model.customerID ?? 0);
    if (result.error) {
      alertsMessage('error', result.messageAlert?.summary ?? 'Error', result.messageAlert?.detail ?? "");
      return;
    }
    alertsMessage('success', "¡Hecho!", result.body ?? "");
    this.getCustomer();
  }
  async removeEdit(model: CustomerModel) {
    this.customerModel = model;
    this.visible = true;
  }
  async assignUser(model: CustomerModel) {
    this.visibleModalUserCustomer = true;
    this.customerModel = model;
    this.submitted = false;
  }
  async saveUser() {
    this.submitted = true;
    if (this.validatorFormUser()) {
      return;
    }
    this.submitted = false;
    if (this.userModel.confirm_password_User != this.userModel.password_User) {
      this.visibleModalUserCustomer = false;
      alertsMessage('error', 'Error', "Las contraseñas no coinciden");
      return;
    }
    this.userModel.customerID = this.customerModel.customerID;
    this.loadingUserCustomer = true;
    let resultUser = await this.controller.saveUserCustomer(this.userModel);
    this.loadingUserCustomer = false;
    this.visibleModalUserCustomer = false;
    if (resultUser.error) {
      alertsMessage('error', resultUser.messageAlert?.summary ?? 'Error', resultUser.messageAlert?.detail ?? "");
      return;
    }
    alertsMessage('success', "¡Hecho!", resultUser.body ?? "");
    this.userModel = {};
    this.getCustomer();
  }
  validatorFormUser() {
    let state = false;
    state = (isNullOrUndefined(this.userModel.userName) || isNullOrUndefined(this.userModel.password_User) || isNullOrUndefined(this.userModel.confirm_password_User)
    );
    return state;
  }
  validatorFormNew() {
    let state = false;
    state = (isNullOrUndefined(this.customerModel.firstName) || isNullOrUndefined(this.customerModel.lastName)
      || isNullOrUndefined(this.customerModel.email) || isNullOrUndefined(this.customerModel.phone)
      || isNullOrUndefined(this.customerModel.address) || isNullOrUndefined(this.customerModel.city)
    );
    return state;
  }

}
