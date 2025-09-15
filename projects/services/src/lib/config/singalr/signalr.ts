import { Injectable } from "@angular/core";
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class SignalRService {
    private hubConnection!: signalR.HubConnection;
    // Iniciar conexión
    startConnection(hubUrl: string): void {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl) // URL del servidor SignalR
            .withAutomaticReconnect() // Reintenta automáticamente si la conexión falla
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.hubConnection
            .start()
            .then(() => console.log('Conexión a SignalR iniciada.'))
            .catch((err) => console.error('Error iniciando conexión a SignalR:', err));
    }

    // Escuchar eventos del servidor
    listenToEvent(eventName: string, callback: (...args: any[]) => void): void {
        this.hubConnection.on(eventName, callback);
    }

    // Enviar eventos al servidor
    sendEvent(eventName: string, data: any): Promise<void> {
        return this.hubConnection.invoke(eventName, data).catch((err) => {
            console.error('Error enviando evento a SignalR:', err);
        });
    }
    stopConnection(): void {
        this.hubConnection.stop().then(() => console.log('Conexión a SignalR cerrada.'));
    }
}