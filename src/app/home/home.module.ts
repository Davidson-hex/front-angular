import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { NewUserComponent } from './new-user/new-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from '../shared/message/message.module';
import { NavbarModule } from '../components/navbar/navbar.module';

@NgModule({
  declarations: [HomeComponent, LoginComponent, NewUserComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    NavbarModule,
  ],
})
export class HomeModule {}
