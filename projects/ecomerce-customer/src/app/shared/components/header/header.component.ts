import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { SignalRService } from '../../../../../../services/src/lib/config/singalr/signalr';
import { AppConfig } from '../../../../../../services/src/lib/config/services/app.config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private signalRService = inject(SignalRService);
  cantShoppingCart = signal<number>(0);
  constructor(private router: Router) { }
  ngOnInit(): void {
    let urlBase = AppConfig.appSetting.appUris?.backend_api;
    this.signalRService.startConnection(urlBase + "sockets/app");
    this.signalRService.listenToEvent('refreshshoppingcart', (user: string, message: string) => {
      this.cantShoppingCart.set(Number.parseInt(user));
    });
    this.signalRService.listenToEvent('userconected', (user: string, message: string) => {
      this.signalRService.sendEvent("OnNotifyShoppingCart", 1);
    });
  }
  ngOnDestroy(): void {
  }
  navigateToCart() {
    this.router.navigate(["/cart"]);
  }
}
