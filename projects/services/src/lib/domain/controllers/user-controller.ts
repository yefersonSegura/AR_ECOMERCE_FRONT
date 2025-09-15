import { Injectable } from '@angular/core';
import { UserService } from '../../Infrastructure/reporitory/user-repository';
import { ResponseController } from '../../config/models/common';
import { UserDto } from '../../Infrastructure/dto/user-dto';
import { Message } from 'primeng/api';
import { isNullOrUndefined } from '../functions/common.functions';
import { RolesDto } from '../../Infrastructure/dto/roles-dto';

@Injectable({
  providedIn: 'root'
})
export class UserController {
  constructor(private repository: UserService) { }

  loginAdmin(user: string, password: string) {
    return new Promise<ResponseController<UserDto>>((response) => {
      let controller: ResponseController<UserDto>;
      let msg: Message = {};
      this.repository.loginAmin(user, password).subscribe(result => {
        if (isNullOrUndefined(result)) {
          msg = { severity: 'info', summary: 'Error interno del servidor', detail: '' };
          controller = { messageAlert: msg, error: true, event: false };
        } else {
          if (!result?.isSuccessful) {
            msg = { severity: 'error', summary: '', detail: result?.message, };
            controller = { messageAlert: msg, error: true, event: false, help: result?.result };
          } else {
            controller = { body: result.data ?? {}, error: false, event: false };
          }
        }
        return response(controller);
      });
    });
  }
  getRoles(idRole: number) {
    return new Promise<ResponseController<RolesDto[]>>((response) => {
      let controller: ResponseController<RolesDto[]>;
      let msg: Message = {};
      this.repository.getRoles(idRole).subscribe(result => {
        if (isNullOrUndefined(result)) {
          msg = { severity: 'info', summary: 'Error interno del servidor', detail: '' };
          controller = { messageAlert: msg, error: true, event: false };
        } else {
          if (!result?.isSuccessful) {
            msg = { severity: 'error', summary: '', detail: result?.message, };
            controller = { messageAlert: msg, error: true, event: false, help: result?.result };
          } else {
            controller = { body: result.data ?? [], error: false, event: false };
          }
        }
        return response(controller);
      });
    });
  }
  loginCustomer(user: string, password: string) {
    return new Promise<ResponseController<UserDto>>((response) => {
      let controller: ResponseController<UserDto>;
      let msg: Message = {};
      this.repository.loginCustomer(user, password).subscribe(result => {
        if (isNullOrUndefined(result)) {
          msg = { severity: 'info', summary: 'Error interno del servidor', detail: '' };
          controller = { messageAlert: msg, error: true, event: false };
        } else {
          if (!result?.isSuccessful) {
            msg = { severity: 'error', summary: result?.message, detail:'', };
            controller = { messageAlert: msg, error: true, event: false, help: result?.result };
          } else {
            controller = { body: result.data ?? {}, error: false, event: false };
          }
        }
        return response(controller);
      });
    });
  }
}