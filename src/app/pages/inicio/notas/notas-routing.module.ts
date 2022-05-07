import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotasPage } from './notas.page';

const routes: Routes = [
  {
    path: '',
    component: NotasPage
  },
  {
    path: 'mostrar-notas',
    loadChildren: () => import('./mostrar-notas/mostrar-notas.module').then( m => m.MostrarNotasPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotasPageRoutingModule {}
