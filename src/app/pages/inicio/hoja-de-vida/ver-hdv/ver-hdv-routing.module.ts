import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerHdvPage } from './ver-hdv.page';

const routes: Routes = [
  {
    path: '',
    component: VerHdvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerHdvPageRoutingModule {}
