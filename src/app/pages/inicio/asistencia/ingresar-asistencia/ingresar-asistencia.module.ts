import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresarAsistenciaPageRoutingModule } from './ingresar-asistencia-routing.module';

import { IngresarAsistenciaPage } from './ingresar-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresarAsistenciaPageRoutingModule
  ],
  declarations: [IngresarAsistenciaPage]
})
export class IngresarAsistenciaPageModule {}
