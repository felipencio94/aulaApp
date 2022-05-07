import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorarioSelectedPageRoutingModule } from './horario-selected-routing.module';

import { HorarioSelectedPage } from './horario-selected.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorarioSelectedPageRoutingModule
  ],
  declarations: [HorarioSelectedPage]
})
export class HorarioSelectedPageModule {}
