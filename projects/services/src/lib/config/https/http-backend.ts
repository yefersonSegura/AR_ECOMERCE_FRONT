import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "../services/app.config.service";
import { catchError, of, retry } from "rxjs";

@Injectable({ providedIn: 'root' })
export class HttpAppWeb {
  urlBase: String = "";
  constructor(private http: HttpClient) {
    this.urlBase = AppConfig.appSetting.appUris?.backend_api ?? "";
  }
  get<T>(url: string, prms?: HttpParams) {
    return this.http.get<T>(`${this.urlBase}${url}`, { observe: 'body', params: prms }).pipe(
      retry(3),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }
  delete<T>(url: string, prms?: HttpParams) {
    return this.http.delete<T>(`${this.urlBase}${url}`, { observe: 'body', params: prms }).pipe(
      retry(3),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }
  post<T>(url: string, body: any, prms?: HttpParams, varretry: number = 3) {
    return this.http.post<T>(`${this.urlBase}${url}`, body, { observe: 'body', params: prms }).pipe(
      retry(varretry),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }


  put<T>(url: string, body: any, prms?: HttpParams) {
    return this.http.put<T>(`${this.urlBase}${url}`, body, { observe: 'body', params: prms }).pipe(
      retry(3),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    );
  }
}
