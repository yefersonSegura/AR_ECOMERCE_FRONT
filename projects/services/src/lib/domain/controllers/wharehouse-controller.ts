import { Injectable } from "@angular/core";
import { wharehouseService } from "../../Infrastructure/reporitory/wharehouse-repository";
import { ResponseController } from "../../config/models/common";
import { CategoryDto } from "../../Infrastructure/dto/category-dto";
import { Message } from "primeng/api";
import { isNullOrUndefined } from "../functions/common.functions";
import { CategoryModel } from "../models/category-model";
import { ProductDto } from "../../Infrastructure/dto/product-dto";
import { ProductModel } from "../models/product-model";

@Injectable({
    providedIn: 'root'
})
export class WharehouseController {
    constructor(private repository: wharehouseService) { }

    getCategory() {
        return new Promise<ResponseController<CategoryDto[]>>((response) => {
            let controller: ResponseController<CategoryDto[]>;
            let msg: Message = {};
            this.repository.getCategories().subscribe(result => {
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
    saveCategory(model: CategoryModel) {
        return new Promise<ResponseController<string>>((response) => {
            let controller: ResponseController<string>;
            let msg: Message = {};
            this.repository.saveCategory(model).subscribe(result => {
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
    deleteCategory(id: number) {
        return new Promise<ResponseController<string>>((response) => {
            let controller: ResponseController<string>;
            let msg: Message = {};
            this.repository.deleteCategory(id).subscribe(result => {
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

    getProducts(id: number) {
        return new Promise<ResponseController<ProductDto[]>>((response) => {
            let controller: ResponseController<ProductDto[]>;
            let msg: Message = {};
            this.repository.getProducts(id).subscribe(result => {
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
    getProductsHome(id: number, isFeature: boolean) {
        return new Promise<ResponseController<ProductDto[]>>((response) => {
            let controller: ResponseController<ProductDto[]>;
            let msg: Message = {};
            this.repository.getProductsHome(id, isFeature).subscribe(result => {
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
    saveProduct(model: ProductModel) {
        return new Promise<ResponseController<string>>((response) => {
            let controller: ResponseController<string>;
            let msg: Message = {};
            this.repository.saveProduct(model).subscribe(result => {
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
    deleteProduct(id: number) {
        return new Promise<ResponseController<string>>((response) => {
            let controller: ResponseController<string>;
            let msg: Message = {};
            this.repository.deleteProduct(id).subscribe(result => {
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