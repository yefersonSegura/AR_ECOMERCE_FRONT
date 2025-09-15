import { Injectable } from '@angular/core';
import { UserService } from '../../Infrastructure/reporitory/user-repository';
import { ResponseController } from '../../config/models/common';
import { UserDto } from '../../Infrastructure/dto/user-dto';
import { Message } from 'primeng/api';
import { isNullOrUndefined } from '../functions/common.functions';
import { EmployeeDto } from '../../Infrastructure/dto/employee-dto';
import { EmployeeService } from '../../Infrastructure/reporitory/employee-repository';
import { EmployeeModel } from '../models/employee-model';
import { UserAdminModel } from '../models/user-admin.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeController {
    constructor(private repository: EmployeeService) { }

    getEmployee(id: number) {
        return new Promise<ResponseController<EmployeeDto[]>>((response) => {
            let controller: ResponseController<EmployeeDto[]>;
            let msg: Message = {};
            this.repository.getEmployee(id).subscribe(result => {
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
    saveEmployee(model: EmployeeModel) {
        return new Promise<ResponseController<string>>((response) => {
            let controller: ResponseController<string>;
            let msg: Message = {};
            this.repository.saveEmployee(model).subscribe(result => {
                if (isNullOrUndefined(result)) {
                    msg = { severity: 'info', summary: 'Error interno del servidor', detail: '' };
                    controller = { messageAlert: msg, error: true, event: false };
                } else {
                    if (!result?.isSuccessful) {
                        msg = { severity: 'error', summary: result?.message, detail: result?.errors?.join("\n"), };
                        controller = { messageAlert: msg, error: true, event: false, help: result?.message };
                    } else {
                        controller = { body: result.message ?? "", error: false, event: false, };
                    }
                }
                return response(controller);
            });
        });
    }
    deleteEmployee(id: number) {
        return new Promise<ResponseController<string>>((response) => {
            let controller: ResponseController<string>;
            let msg: Message = {};
            this.repository.deleteEmployee(id).subscribe(result => {
                if (isNullOrUndefined(result)) {
                    msg = { severity: 'info', summary: 'Error interno del servidor', detail: '' };
                    controller = { messageAlert: msg, error: true, event: false };
                } else {
                    if (!result?.isSuccessful) {
                        msg = { severity: 'error', summary: result?.message, detail: result?.errors?.join("\n"), };
                        controller = { messageAlert: msg, error: true, event: false, help: result?.message };
                    } else {
                        controller = { body: result.message ?? "", error: false, event: false, };
                    }
                }
                return response(controller);
            });
        });
    }


    saveUserAdmin(model: UserAdminModel) {
      return new Promise<ResponseController<string>>((response) => {
          let controller: ResponseController<string>;
          let msg: Message = {};
          this.repository.saveUserAdmin(model).subscribe(result => {
              if (isNullOrUndefined(result)) {
                  msg = { severity: 'info', summary: 'Error interno del servidor', detail: '' };
                  controller = { messageAlert: msg, error: true, event: false };
              } else {
                  if (!result?.isSuccessful) {
                      msg = { severity: 'error', summary: result?.message, detail: result?.errors?.join("\n"), };
                      controller = { messageAlert: msg, error: true, event: false, help: result?.message };
                  } else {
                      controller = { body: result.message ?? "", error: false, event: false, };
                  }
              }
              return response(controller);
          });
      });
    }
}
