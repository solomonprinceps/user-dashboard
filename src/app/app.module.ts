import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { TopnavComponent } from './shared/topnav/topnav.component';
import { SharedModule } from './shared/shared.module';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { TokenInterceptor } from './core/interceptors/token-interceptor';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    LoadingBarModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
