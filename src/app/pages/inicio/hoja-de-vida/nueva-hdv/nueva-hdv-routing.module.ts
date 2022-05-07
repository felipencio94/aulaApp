import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevaHdvPage } from './nueva-hdv.page';

const routes: Routes = [
  {
    path: '',
    component: NuevaHdvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevaHdvPageRoutingModule {}
