import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { LoginGuard } from './authentication/login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((module) => module.HomeModule),
    canLoad: [LoginGuard],
  },
  {
    path: 'livros',
    loadChildren: () =>
      import('./books/books.module').then((module) => module.BooksModule),
    canLoad: [AuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
