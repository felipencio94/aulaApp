import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HorariosPage } from './horarios.page';

const routes: Routes = [
  {
    path: '',
    component: HorariosPage
  },
  {
    path: 'horario-selected',
    loadChildren: () => import('./horario-selected/horario-selected.module').then( m => m.HorarioSelectedPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorariosPageRoutingModule {}
