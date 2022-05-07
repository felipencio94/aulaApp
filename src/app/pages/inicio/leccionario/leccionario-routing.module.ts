import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeccionarioPage } from './leccionario.page';

const routes: Routes = [
  {
    path: '',
    component: LeccionarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeccionarioPageRoutingModule {}
