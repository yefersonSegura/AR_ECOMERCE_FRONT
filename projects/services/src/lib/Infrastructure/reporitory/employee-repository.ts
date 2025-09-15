import { Injectable } from "@angular/core";
import { HttpAppWeb } from "../../config/https/http-backend";
import { Observable } from "rxjs";
import { IBaseResponse, IResponse } from "../../config/models/common";
import { HttpParams } from "@angular/common/http";
import { EmployeeApi } from "../../config/constants/user-constants";
import { EmployeeDto } from "../dto/employee-dto";
import { EmployeeModel } from "../../domain/models/employee-model";
import { UserAdminModel } from "../../domain/models/user-admin.model";
import { RolesDto } from "../dto/roles-dto";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    constructor(private http: HttpAppWeb) { }
    getEmployee(id: number): Observable<IResponse<EmployeeDto[]> | null> {
        let prms = new HttpParams();
        prms = prms.set('idEmployee', id);
        return this.http.get<IResponse<EmployeeDto[]>>(`${EmployeeApi.getEmployee}`, prms);
    }
    saveEmployee(model: EmployeeModel): Observable<IBaseResponse | null> {
        return this.http.post<IBaseResponse>(`${EmployeeApi.saveEmployee}`, model);
    }
    deleteEmployee(id: number): Observable<IResponse<IBaseResponse> | null> {
        let prms = new HttpParams();
        prms = prms.set('employeeID', id);
        return this.http.delete<IResponse<IBaseResponse>>(`${EmployeeApi.deleteEmployee}`, prms);
    }
    saveUserAdmin(model: UserAdminModel): Observable<IBaseResponse | null> {
        return this.http.post<IBaseResponse>(`${EmployeeApi.saveUserAdmin}`, model);
    }
}
