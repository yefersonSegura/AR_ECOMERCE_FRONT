import { Injectable } from '@angular/core';
import { HttpAppWeb } from '../../config/https/http-backend';
import { Observable } from 'rxjs';
import { IResponse } from '../../config/models/common';
import { UserDto } from '../dto/user-dto';
import { HttpParams } from '@angular/common/http';
import { UserApi } from '../../config/constants/user-constants';
import { RolesDto } from '../dto/roles-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpAppWeb) { }
  loginAmin(user: string, password: string): Observable<IResponse<UserDto> | null> {
    let prms = new HttpParams();
    prms = prms.set('user', user);
    prms = prms.set('pass', password);
    return this.http.get<IResponse<UserDto>>(`${UserApi.login}`, prms);
  }
  getRoles(idRole: number): Observable<IResponse<RolesDto[]> | null> {
    let prms = new HttpParams();
    prms = prms.set('idRole', idRole);
    return this.http.get<IResponse<RolesDto[]>>(`${UserApi.getRoles}`);
  }
  loginCustomer(user: string, password: string): Observable<IResponse<UserDto> | null> {
    let prms = new HttpParams();
    prms = prms.set('user', user);
    prms = prms.set('pass', password);
    return this.http.get<IResponse<UserDto>>(`${UserApi.loginCustomer}`, prms);
  }
}