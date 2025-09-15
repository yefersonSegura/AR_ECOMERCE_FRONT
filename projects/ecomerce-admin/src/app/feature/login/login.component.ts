import { Component } from '@angular/core';
import { UserController } from '../../../../../services/src/public-api';
import { AuthService } from '../../shared/services/auth.service';
import { isNullOrUndefined } from '../../../../../services/src/lib/domain/functions/common.functions';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user: string = "";
  pass: string = "";
  constructor(private controller: UserController, private authApp: AuthService) {

  }
  async login() {
    if (isNullOrUndefined(this.user)) {
      return;
    }
    if (isNullOrUndefined(this.pass)) {
      return;
    }
    let result = await this.controller.loginAdmin(this.user, this.pass);
    if (result.error) {
      console.log(result.body);
      return;
    }
    this.authApp.setAuth(result.body ?? {});
  }
}
