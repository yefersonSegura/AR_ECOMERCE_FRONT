import { inject, Injectable } from "@angular/core";
import { ResponseController } from "../../config/models/common";
import { PrurchaseService } from "../../Infrastructure/reporitory/purchase-repository";
import { Message } from "primeng/api";
import { isNullOrUndefined } from "../functions/common.functions";
import { CartItemModel } from "../models/cart-item-model";
import { InoviceModel } from "../models/invoice-model";

@Injectable({
    providedIn: 'root'
})
export class PurchaseController {
    private promotionService = inject(PrurchaseService);
    AddProductToShoppingCart(productId: number, quantity: number) {
        return new Promise<ResponseController<string>>((response) => {
            let controller: ResponseController<string>;
            let msg: Message = {};
            this.promotionService.AddProductToShoppingCart(productId, quantity).subscribe(result => {
                if (isNullOrUndefined(result)) {
                    msg = { severity: 'info', summary: 'Error interno del servidor', detail: '' };
                    controller = { messageAlert: msg, error: true, event: false };
                } else {
                    if (!result?.isSuccessful) {
                        msg = { severity: 'error', summary: '', detail: result?.message, };
                        controller = { messageAlert: msg, error: true, event: false, help: result?.result };
                    } else {
                        controller = { body: result.message, error: false, event: false };
                    }
                }
                return response(controller);
            });
        });
    }
    getCartItems() {
        return new Promise<ResponseController<CartItemModel[]>>((response) => {
            let controller: ResponseController<CartItemModel[]>;
            let msg: Message = {};
            this.promotionService.getCartItems().subscribe(result => {
                if (isNullOrUndefined(result)) {
                    msg = { severity: 'info', summary: 'Error interno del servidor', detail: '' };
                    controller = { messageAlert: msg, error: true, event: false };
                } else {
                    if (result?.isSuccessful) {
                        controller = { body: result.data, error: false, event: false };
                    } else {
                        msg = { severity: 'info', summary: result?.message, detail: '' };
                        controller = { messageAlert: msg, error: true, event: false };
                    }
                }
                return response(controller);
            });
        });
    }
    calculateTotalCartItems(inoviceModel:InoviceModel){
        return new Promise<ResponseController<InoviceModel>>((response) => {
            let controller: ResponseController<InoviceModel>;
            let msg: Message = {};
            this.promotionService.calculateTotalCartItems(inoviceModel).subscribe(result => {
                if (isNullOrUndefined(result)) {
                    msg = { severity: 'info', summary: 'Error interno del servidor', detail: '' };
                    controller = { messageAlert: msg, error: true, event: false };
                } else {
                    if (result?.isSuccessful) {
                        controller = { body: result.data, error: false, event: false };
                    } else {
                        msg = { severity: 'info', summary: result?.message, detail: '' };
                        controller = { messageAlert: msg, error: true, event: false };
                    }
                }
                return response(controller);
            });
        });
    }
}