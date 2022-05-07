import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HorarioSelectedPage } from './horario-selected.page';

const routes: Routes = [
  {
    path: '',
    component: HorarioSelectedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorarioSelectedPageRoutingModule {}
