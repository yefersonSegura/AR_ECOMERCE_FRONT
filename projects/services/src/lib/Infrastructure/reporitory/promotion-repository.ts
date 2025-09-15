import { Injectable } from "@angular/core";
import { HttpAppWeb } from "../../config/https/http-backend";
import { HttpParams } from "@angular/common/http";
import { IBaseResponse, IResponse } from "../../config/models/common";
import { Observable } from "rxjs";
import { PromotionDto } from "../dto/promotion-dto";
import { PromotionApi } from "../../config/constants/promotion-constant";
import { PromotionsDto } from "../dto/promotions-dto";

@Injectable({
    providedIn: 'root'
})
export class PromotionService {
    constructor(private http: HttpAppWeb) { }
    getPromotions(date: Date): Observable<IResponse<PromotionDto[]> | null> {
        let prms = new HttpParams();
        prms = prms.set('date', date.toISOString());
        return this.http.get<IResponse<PromotionDto[]>>(`${PromotionApi.getPromotions}`, prms);
    }
    getPromotionsByProduct(idProduct: number): Observable<IResponse<PromotionsDto[]> | null> {
        let prms = new HttpParams();
        prms = prms.set('idProduct', idProduct);
        return this.http.get<IResponse<PromotionsDto[]>>(`${PromotionApi.getPromotionsByProductId}`, prms);
    }
    savePromotion(promotion: PromotionDto): Observable<IBaseResponse | null> {
        return this.http.post<IResponse<PromotionDto>>(`${PromotionApi.savePromotion}`, promotion);
    }
}
