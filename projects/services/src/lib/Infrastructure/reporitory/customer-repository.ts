import { Injectable } from "@angular/core";
import { HttpAppWeb } from "../../config/https/http-backend";
import { CustomerDto } from "../dto/customer-dto";
import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { IBaseResponse, IResponse } from "../../config/models/common";
import { CustomerModel } from "../../domain/models/customer-model";
import { CustomerApi } from "../../config/constants/customer-constants";
import { UserCustomerModel } from "../../domain/models/user-customer";

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    constructor(private http: HttpAppWeb) { }
    getCustomer(id: number): Observable<IResponse<CustomerDto[]> | null> {
        let prms = new HttpParams();
        prms = prms.set('idCustomer', id);
        return this.http.get<IResponse<CustomerDto[]>>(`${CustomerApi.getCustomer}`, prms);
    }
    saveCustomer(model: CustomerModel): Observable<IBaseResponse | null> {
        return this.http.post<IBaseResponse>(`${CustomerApi.saveCustomer}`, model);
    }
    deleteCustomer(id: number): Observable<IResponse<IBaseResponse> | null> {
        let prms = new HttpParams();
        prms = prms.set('customerID', id);
        return this.http.delete<IResponse<IBaseResponse>>(`${CustomerApi.deleteCustomer}`, prms);
    }
    saveUserCustomer(model: UserCustomerModel): Observable<IBaseResponse | null> {
        return this.http.post<IBaseResponse>(`${CustomerApi.saveUserCustomer}`, model);
    }


}
