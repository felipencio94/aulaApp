import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresarAsistenciaPage } from './ingresar-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: IngresarAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresarAsistenciaPageRoutingModule {}
