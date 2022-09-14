import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeRoutingModule } from '../home/home-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule, HomeRoutingModule, RouterModule],
})
export class ComponentsModule {}
