import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { isNullOrUndefined, UserController } from '../../../../../../services/src/public-api';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user: string = "";
  pass: string = "";
  constructor(private router: Router, private controller: UserController, private authApp: AuthService) { }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  async login() {
    if (isNullOrUndefined(this.user)) {
      this.showAlert("El usuario es requerido", 'warning');
      return;
    }
    if (isNullOrUndefined(this.pass)) {
      this.showAlert("La contraseña es requerida", 'warning');
      return;
    }
    let result = await this.controller.loginCustomer(this.user, this.pass);
    if (result.error) {
      this.showAlert(result.messageAlert?.summary ?? "", 'danger');
      return;
    }
    this.authApp.setAuth(result.body ?? {});
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
