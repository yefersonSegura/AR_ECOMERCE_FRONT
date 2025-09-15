import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAppConfig } from "../models/app-config";


@Injectable()
export class AppConfig {
    static appSetting: IAppConfig = {}
    static environment: string = "";
    constructor(private http: HttpClient) { }
    addEnviroment(value: string) {
        AppConfig.environment = value;
    }
    load() {
        const jsonFile = `config/app.config.${AppConfig.environment}.json`;
        return new Promise<void>((resolve, reject) => {
            this.http.get<IAppConfig>(jsonFile).subscribe({
                next: (data) => {
                    AppConfig.appSetting = data;
                },
                complete: () => {
                    resolve();
                },
                error: (err) => {
                    console.log(err);
                    reject(`Could not load file '${jsonFile}': ${JSON.stringify(err)}`);
                }
            });
        });
    }
}
