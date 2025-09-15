import { Injectable } from "@angular/core";
import { CustomerService } from "../../Infrastructure/reporitory/customer-repository";
import { CustomerDto } from "../../Infrastructure/dto/customer-dto";
import { ResponseController } from "../../config/models/common";
import { Message } from "primeng/api";
import { isNullOrUndefined } from "../functions/common.functions";
import { CustomerModel } from "../models/customer-model";
import { UserCustomerModel } from "../models/user-customer";

@Injectable({
    providedIn: 'root'
})
export class CustomerController {
    constructor(private repository: CustomerService) { }

    getCustomer(id: number) {
        return new Promise<ResponseController<CustomerDto[]>>((response) => {
            let controller: ResponseController<CustomerDto[]>;
            let msg: Message = {};
            this.repository.getCustomer(id).subscribe(result => {
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
    saveCustomer(model: CustomerModel) {
        return new Promise<ResponseController<string>>((response) => {
            let controller: ResponseController<string>;
            let msg: Message = {};
            this.repository.saveCustomer(model).subscribe(result => {
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
    saveUserCustomer(model: UserCustomerModel) {
        return new Promise<ResponseController<string>>((response) => {
            let controller: ResponseController<string>;
            let msg: Message = {};
            this.repository.saveUserCustomer(model).subscribe(result => {
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
    deleteCustomer(id: number) {
        return new Promise<ResponseController<string>>((response) => {
            let controller: ResponseController<string>;
            let msg: Message = {};
            this.repository.deleteCustomer(id).subscribe(result => {
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
