import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciaPage } from './asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciaPage
  },
  {
    path: 'asistencia-alumnos',
    loadChildren: () => import('./asistencia-alumnos/asistencia-alumnos.module').then( m => m.AsistenciaAlumnosPageModule)
  },
  {
    path: 'ver-asistencia',
    loadChildren: () => import('./ver-asistencia/ver-asistencia.module').then( m => m.VerAsistenciaPageModule)
  },
  {
    path: 'ingresar-asistencia',
    loadChildren: () => import('./ingresar-asistencia/ingresar-asistencia.module').then( m => m.IngresarAsistenciaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciaPageRoutingModule {}
