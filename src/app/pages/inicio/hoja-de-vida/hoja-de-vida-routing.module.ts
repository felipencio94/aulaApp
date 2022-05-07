import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HojaDeVidaPage } from './hoja-de-vida.page';

const routes: Routes = [
  {
    path: '',
    component: HojaDeVidaPage
  },
  {
    path: 'nueva-hdv',
    loadChildren: () => import('./nueva-hdv/nueva-hdv.module').then( m => m.NuevaHdvPageModule)
  },
  {
    path: 'ver-hdv',
    loadChildren: () => import('./ver-hdv/ver-hdv.module').then( m => m.VerHdvPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HojaDeVidaPageRoutingModule {}
