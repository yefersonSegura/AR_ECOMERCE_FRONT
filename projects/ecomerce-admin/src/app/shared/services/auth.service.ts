import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { UserDto } from '../../../../../services/src/lib/Infrastructure/dto/user-dto';
import { AuthConstants } from '../constants/auth.constants';
import { isNullOrUndefined } from '../../../../../services/src/lib/domain/functions/common.functions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private route: Router) {
  }
  setAuth(model: UserDto,) {
    localStorage.setItem(AuthConstants.token, model.token!);
    localStorage.setItem(AuthConstants.session, JSON.stringify(model));
    this.route.navigate(["/panel/"]);
  }
  loggout() {
    localStorage.removeItem(AuthConstants.token);
    localStorage.removeItem(AuthConstants.session);
    this.route.navigate(["/"]);
  }
  isLoggin() {
    let user = localStorage.getItem(AuthConstants.session);
    if (isNullOrUndefined(user)) {
      return false;
    }
    return true;
  }

  // isTokenExpired(): boolean {
  //   let token = localStorage.getItem(AuthConstants.token);
  //   if (isNullOrUndefined(token)) {
  //     return false;
  //   }
  //   return this.jwtHelper.isTokenExpired(token);
  // }
  getInfoUser(): UserDto {
    let userLocal = localStorage.getItem(AuthConstants.session);
    if (isNullOrUndefined(userLocal)) {
      return { token: undefined };
    }
    const decodedToken = JSON.parse(userLocal!) as UserDto;
    return decodedToken;
  }
}
