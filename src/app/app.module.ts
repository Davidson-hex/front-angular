import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { HomeModule } from './home/home.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { MessageModule } from './shared/message/message.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NavbarModule } from './components/navbar/navbar.module';
import { ComponentsModule } from './components/components.module';
import { Intercept } from './authentication/authentication.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthenticationModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule,
    SharedModule,
    MessageModule,
    BrowserAnimationsModule,
    MatSliderModule,
    ModalModule.forRoot(),
    ComponentsModule,
    NavbarModule,
    Intercept,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
