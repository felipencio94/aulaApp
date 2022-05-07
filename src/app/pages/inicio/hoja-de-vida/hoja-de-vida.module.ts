import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HojaDeVidaPageRoutingModule } from './hoja-de-vida-routing.module';

import { HojaDeVidaPage } from './hoja-de-vida.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HojaDeVidaPageRoutingModule
  ],
  declarations: [HojaDeVidaPage]
})
export class HojaDeVidaPageModule {}
