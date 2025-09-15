import { Injectable } from "@angular/core";
import { PromotionService } from "../../Infrastructure/reporitory/promotion-repository";
import { ResponseController } from "../../config/models/common";
import { PromotionDto } from "../../Infrastructure/dto/promotion-dto";
import { Message } from "primeng/api";
import { isNullOrUndefined } from "../functions/common.functions";
import { PromotionsDto } from "../../Infrastructure/dto/promotions-dto";

@Injectable({
    providedIn: 'root'
})
export class PromotionController {
    constructor(private repository: PromotionService) { }
    getPromotions(date: Date) {
        return new Promise<ResponseController<PromotionDto[]>>((response) => {
            let controller: ResponseController<PromotionDto[]>;
            let msg: Message = {};
            this.repository.getPromotions(date).subscribe(result => {
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
    getPromotionsByProduct(idProduct: number) {
        return new Promise<ResponseController<PromotionsDto[]>>((response) => {
            let controller: ResponseController<PromotionsDto[]>;
            let msg: Message = {};
            this.repository.getPromotionsByProduct(idProduct).subscribe(result => {
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
    savePromotion(promotion: PromotionDto) {
        return new Promise<ResponseController<string>>((response) => {
            let controller: ResponseController<string>;
            let msg: Message = {};
            this.repository.savePromotion(promotion).subscribe(result => {
                if (isNullOrUndefined(result)) {
                    msg = { severity: 'info', summary: 'Error interno del servidor', detail: '' };
                    controller = { messageAlert: msg, error: true, event: false };
                } else {
                    if (!result?.isSuccessful) {
                        msg = { severity: 'error', summary: '', detail: result?.message, };
                        controller = { messageAlert: msg, error: true, event: false, help: result?.result };
                    } else {
                        controller = { body: result.message ?? 'Promoción Guardada', error: false, event: false };
                    }
                }
                return response(controller);
            });
        });
    }
}