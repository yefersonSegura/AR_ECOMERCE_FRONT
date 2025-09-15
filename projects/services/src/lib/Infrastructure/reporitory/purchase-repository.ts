import { Injectable } from "@angular/core";
import { HttpAppWeb } from "../../config/https/http-backend";
import { Observable } from "rxjs";
import { PromotionDto } from "../dto/promotion-dto";
import { IBaseResponse, IResponse } from "../../config/models/common";
import { HttpParams } from "@angular/common/http";
import { PurchaseApi } from "../../config/constants/purchase-constants";
import { AuthService } from "../../../../../ecomerce-customer/src/app/shared/services/auth.service";
import { CartItemModel } from "../../domain/models/cart-item-model";
import { InoviceModel } from "../../domain/models/invoice-model";

@Injectable({
    providedIn: 'root'
})
export class PrurchaseService {
    constructor(private http: HttpAppWeb, private authService: AuthService) { }
    AddProductToShoppingCart(productId: number, quantity: number): Observable<IBaseResponse | null> {
        let prms = new HttpParams();
        prms = prms.set('customerId', this.authService.getInfoUser().userID ?? 0);
        prms = prms.set('productId', productId);
        prms = prms.set('quantity', quantity);
        return this.http.get<IBaseResponse>(`${PurchaseApi.AddProductToShoppingCart}`, prms);
    }
    getCartItems(): Observable<IResponse<CartItemModel[]> | null> {
        let prms = new HttpParams();
        prms = prms.set('customerId', this.authService.getInfoUser().userID ?? 0);
        return this.http.get<IResponse<CartItemModel[]>>(`${PurchaseApi.GetShoppingCartByCustomer}`, prms);
    }
    calculateTotalCartItems(inoviceModel: InoviceModel): Observable<IResponse<InoviceModel> | null> {
        inoviceModel.userId = this.authService.getInfoUser().userID ?? 0;
        return this.http.post<IResponse<InoviceModel>>(`${PurchaseApi.CalculateTotalCartItems}`, inoviceModel);
    }
}