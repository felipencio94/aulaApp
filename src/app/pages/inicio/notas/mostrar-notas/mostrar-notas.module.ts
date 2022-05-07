import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarNotasPageRoutingModule } from './mostrar-notas-routing.module';

import { MostrarNotasPage } from './mostrar-notas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarNotasPageRoutingModule
  ],
  declarations: [MostrarNotasPage]
})
export class MostrarNotasPageModule {}
