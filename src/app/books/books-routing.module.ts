import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { HistoricComponent } from './movement/historic/historic.component';
import { MovementComponent } from './movement/movement.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'novolivro',
    component: CreateComponent,
  },
  {
    path: ':bookId',
    component: DetailComponent,
  },
  {
    path: ':bookId/edit',
    component: UpdateComponent,
  },
  {
    path: ':idUser/movimentacao',
    component: MovementComponent,
  },
  {
    path: ':idUser/historico',
    component: HistoricComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
