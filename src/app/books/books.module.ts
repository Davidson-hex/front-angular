import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { ListComponent } from './list/list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarModule } from '../components/navbar/navbar.module';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';
import { UpdateComponent } from './update/update.component';
import { RentComponent } from './detail/rent/rent.component';
import { MessageModule } from '../shared/message/message.module';
import { MovementComponent } from './movement/movement.component';
import { HistoricComponent } from './movement/historic/historic.component';

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    DetailComponent,
    UpdateComponent,
    RentComponent,
    MovementComponent,
    HistoricComponent,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FontAwesomeModule,
    NavbarModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
  ],
})
export class BooksModule {}
