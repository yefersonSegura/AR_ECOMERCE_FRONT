import { Component, OnInit } from '@angular/core';
import { EmployeeController, UserController } from '../../../../../services/src/public-api';
import { EmployeeDto } from '../../../../../services/src/lib/Infrastructure/dto/employee-dto';
import { EmployeeModel } from '../../../../../services/src/lib/domain/models/employee-model';
import { isNullOrUndefined, alertsMessage } from '../../../../../services/src/lib/domain/functions/common.functions';
import { UserAdminModel } from '../../../../../services/src/lib/domain/models/user-admin.model';
import { RolesDto } from '../../../../../services/src/lib/Infrastructure/dto/roles-dto';

@Component({
  selector: 'app-employeee',
  standalone: false,
  templateUrl: './employeee.component.html',
  styleUrl: './employeee.component.scss'
})
export class EmployeeeComponent implements OnInit {
  employees: EmployeeDto[] = [];
  loading: boolean = false;
  cols: any[] = [];
  visible: boolean = false;
  employeeModel: EmployeeModel = {};
  visibleModalUserAdmin: boolean = false;
  loadingUserAdmin: boolean = false;
  userModel: UserAdminModel = {};
  submitted: boolean = false;
  roles: RolesDto[] = [];
  constructor(private controller: EmployeeController, private userController: UserController) { }
  ngOnInit(): void {
    this.cols = [
      { field: 'firstName', header: 'Primer Nombre', type: '', align: 'left', format: '', width: '250px', minWidth: '', maxWidth: '', display: 'table-cell' },
      { field: 'lastName', header: 'Segundo Nombre', type: '', align: 'left', format: '', width: '290px', minWidth: '170px', maxWidth: '', display: 'table-cell' },
      { field: 'email', header: 'Email', type: '', align: 'left', format: 'dd/MM/yyyy', width: '270px', minWidth: '170px', maxWidth: '', display: 'table-cell' },
      { field: 'phone', header: 'Celular', type: '', align: 'left', format: '', width: '200px', minWidth: '200px', maxWidth: '', display: 'table-cell' },
      { field: 'address', header: 'Dirección', type: '', align: 'left', format: '', width: '100px', minWidth: '', maxWidth: '', display: 'table-cell' },
      { field: 'city', header: 'Ciudad', type: '', align: 'left', format: '', width: '250px', minWidth: '', maxWidth: '', display: 'table-cell' }
    ]
    this.getEmployee();
    this.getRoles();
  }

  async getEmployee() {
    this.loading = true;
    let result = await this.controller.getEmployee(0);
    this.loading = false;
    if (result.error) {
      return;
    }
    this.employees = result.body ?? [];
  }
  async getRoles() {
    let result = await this.userController.getRoles(0);
    if (result.error) {
      return;
    }
    this.roles = result.body ?? [];
  }
  async saveEmployee() {
    this.submitted = true;
    if (this.validatorFormNew()) {
      return;
    }
    this.submitted = false;
    let result = await this.controller.saveEmployee(this.employeeModel);
    if (result.error) {
      alertsMessage('error', result.messageAlert?.summary ?? 'Error', result.messageAlert?.detail ?? "");
      return;
    }
    alertsMessage('success', "¡Hecho!", result.body ?? "");
    this.visible = false;
    this.employeeModel = {};
    this.getEmployee();

  }
  async removeRow(model: EmployeeModel) {
    let result = await this.controller.deleteEmployee(model.employeeID ?? 0);
    if (result.error) {
      alertsMessage('error', result.messageAlert?.summary ?? 'Error', result.messageAlert?.detail ?? "");
      return;
    }
    alertsMessage('success', "¡Hecho!", result.body ?? "");
    this.getEmployee();
  }

  async removeEdit(model: EmployeeModel) {
    this.employeeModel = model;
    this.visible = true;
  }
  async assignUser(model: EmployeeModel) {
    this.visibleModalUserAdmin = true;
    this.employeeModel = model;
    this.submitted = false;
    this.userModel.userName = model.email;
  }

  async saveUser() {
    this.submitted = true;
    if (this.validatorFormUser()) {
      return;
    }
    this.submitted = false;
    if (this.userModel.confirm_password_User != this.userModel.password_User) {
      this.visibleModalUserAdmin = false;
      alertsMessage('error', 'Error', "Las contraseñas no coinciden");
      return;
    }
    this.userModel.employeeID = this.employeeModel.employeeID;
    this.loadingUserAdmin = true;
    let resultUser = await this.controller.saveUserAdmin(this.userModel);
    this.loadingUserAdmin = false;
    this.visibleModalUserAdmin = false;
    if (resultUser.error) {
      alertsMessage('error', resultUser.messageAlert?.summary ?? 'Error', resultUser.messageAlert?.detail ?? "");
      return;
    }
    alertsMessage('success', "¡Hecho!", resultUser.body ?? "");
    this.userModel = {};
    this.getEmployee();
  }

  validatorFormUser() {
    let state = false;
    state = (isNullOrUndefined(this.userModel.userName) || isNullOrUndefined(this.userModel.password_User) || isNullOrUndefined(this.userModel.confirm_password_User)
      || isNullOrUndefined(this.userModel.roleID)
    );
    return state;
  }

  validatorFormNew() {
    let state = false;
    state = (isNullOrUndefined(this.employeeModel.firstName) || isNullOrUndefined(this.employeeModel.lastName)
      || isNullOrUndefined(this.employeeModel.email) || isNullOrUndefined(this.employeeModel.phone)
      || isNullOrUndefined(this.employeeModel.address) || isNullOrUndefined(this.employeeModel.city)
    );
    return state;
  }

}
