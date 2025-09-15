import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from './services/app.layout.service';
import { MenuService } from './services/app.menu.service';
import { AppLayoutComponent } from './components/app.layout.component';
import { AppMenuProfileComponent } from './components/app.menuprofile.component';
import { AppTopbarComponent } from './components/app.topbar.component';
import { AppMenuComponent } from './components/app.menu.component';
import { AppSidebarComponent } from './components/app.sidebar.component';
import { AppMenuitemComponent } from './components/app.menuitem.component';
import { AppFooterComponent } from './components/app.footer.component';
import { AppBreadcrumbComponent } from './components/app.breadcrumb.component';
import { AppRightMenuComponent } from './components/app.rightmenu.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigModule } from './config/app.config.module';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [
    AppLayoutComponent,
    AppBreadcrumbComponent,
    AppMenuProfileComponent,
    AppTopbarComponent,
    AppRightMenuComponent,
    AppMenuComponent,
    AppSidebarComponent,
    AppMenuitemComponent,
    AppFooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    StyleClassModule,
    InputTextModule,
    SidebarModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    TooltipModule,
    MegaMenuModule,
    RippleModule,
    RouterModule,
    ButtonModule,
    MenuModule,
    AppConfigModule,
  ],
  providers: [LayoutService, MenuService, provideHttpClient()]
})
export class TemplateModule { }
