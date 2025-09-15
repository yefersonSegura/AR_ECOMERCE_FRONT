import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerModel } from '../../../../../../services/src/lib/domain/models/customer-model';
import { CustomerService } from '../../../../../../services/src/lib/Infrastructure/reporitory/customer-repository';
import { CustomerController, EmployeeController } from '../../../../../../services/src/public-api';

@Component({
  selector: 'app-register-user',
  standalone: false,
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {
  model: CustomerModel = {};
  constructor(private router: Router, private customerService: CustomerController) { }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  async saveCustomer() {
    if (this.validateForm()) {
      const response = await this.customerService.saveCustomer(this.model);
      if (response.error) {
        this.showAlert(response.messageAlert?.summary ?? "", 'danger');
        return;
      }
      this.router.navigate(['/login']);
    } else {
      this.showAlert('Por favor, complete todos los campos', 'warning');
    }
  }

  validateForm() {
    return this.model.firstName && this.model.lastName && this.model.email && this.model.password;
  }
  showAlert(message: string, type: 'success' | 'danger' | 'warning' | 'info') {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
    alertPlaceholder?.append(wrapper)
  }
}
