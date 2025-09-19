import { Injectable } from "@angular/core";
import { ConfirmationService } from "primeng/api";

@Injectable({ providedIn: 'root' })
export class CommonService {
    constructor(private confirmationService: ConfirmationService) {

    }
    confirmQuestion(event: Event, textConfirm: string) {
        return new Promise<boolean>((resolve) => {
            this.confirmationService.confirm({
                target: event.target as EventTarget,
                message: textConfirm,
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                acceptIcon: "none",
                rejectIcon: "none",
                rejectButtonStyleClass: "p-button-text",
                accept: () => {
                    resolve(true);
                },
                reject: () => {
                    resolve(false);
                }
            });
        });
    }
} 