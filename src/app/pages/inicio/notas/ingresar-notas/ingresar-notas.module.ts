import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresarNotasPageRoutingModule } from './ingresar-notas-routing.module';

import { IngresarNotasPage } from './ingresar-notas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresarNotasPageRoutingModule
  ],
  declarations: [IngresarNotasPage]
})
export class IngresarNotasPageModule {}
