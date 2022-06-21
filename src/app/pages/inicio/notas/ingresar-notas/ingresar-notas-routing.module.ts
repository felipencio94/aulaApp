import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresarNotasPage } from './ingresar-notas.page';

const routes: Routes = [
  {
    path: '',
    component: IngresarNotasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresarNotasPageRoutingModule {}
