import { Observable } from "rxjs";
import { HttpAppWeb } from "../../config/https/http-backend";
import { IBaseResponse, IResponse } from "../../config/models/common";
import { HttpParams } from "@angular/common/http";
import { ProductDto } from "../dto/product-dto";
import { WharehouseApi } from "../../config/constants/wharehouse-constants";
import { Injectable } from "@angular/core";
import { ProductModel } from "../../domain/models/product-model";
import { CategoryDto } from "../dto/category-dto";
import { CategoryModel } from "../../domain/models/category-model";

@Injectable({
    providedIn: 'root'
})
export class wharehouseService {
    constructor(private http: HttpAppWeb) { }
    getProducts(id: number): Observable<IResponse<ProductDto[]> | null> {
        let prms = new HttpParams();
        prms = prms.set('productID', id);
        return this.http.get<IResponse<ProductDto[]>>(`${WharehouseApi.getProduct}`, prms);
    }
    getProductsHome(id: number, isFeature: boolean): Observable<IResponse<ProductDto[]> | null> {
        let prms = new HttpParams();
        prms = prms.set('productID', id);
        prms = prms.set('isFeatured', isFeature);
        return this.http.get<IResponse<ProductDto[]>>(`${WharehouseApi.getProductById}`, prms);
    }
    getProductsByIdCategory(id: number): Observable<IResponse<ProductDto[]> | null> {
        let prms = new HttpParams();
        prms = prms.set('idCategory', id);
        return this.http.get<IResponse<ProductDto[]>>(`${WharehouseApi.getProductById}`, prms);
    }
    saveProduct(model: ProductModel): Observable<IBaseResponse | null> {
        return this.http.post<IBaseResponse>(`${WharehouseApi.saveProduct}`, model);
    }
    deleteProduct(id: number): Observable<IResponse<IBaseResponse> | null> {
        let prms = new HttpParams();
        prms = prms.set('productID', id);
        return this.http.delete<IResponse<IBaseResponse>>(`${WharehouseApi.deleteProducts}`, prms);
    }
    getCategories(): Observable<IResponse<CategoryDto[]> | null> {
        return this.http.get<IResponse<CategoryDto[]>>(`${WharehouseApi.getCategory}`);
    }
    saveCategory(model: CategoryModel): Observable<IBaseResponse | null> {
        return this.http.post<IBaseResponse>(`${WharehouseApi.saveCategory}`, model);
    }
    deleteCategory(id: number): Observable<IResponse<IBaseResponse> | null> {
        let prms = new HttpParams();
        prms = prms.set('categoryID', id);
        return this.http.delete<IResponse<IBaseResponse>>(`${WharehouseApi.deleteCategory}`, prms);
    }
}