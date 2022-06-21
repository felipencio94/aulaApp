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
  },
  {
    path: 'ingresar-notas',
    loadChildren: () => import('./ingresar-notas/ingresar-notas.module').then( m => m.IngresarNotasPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotasPageRoutingModule {}
