import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarNotasPage } from './mostrar-notas.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarNotasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarNotasPageRoutingModule {}
