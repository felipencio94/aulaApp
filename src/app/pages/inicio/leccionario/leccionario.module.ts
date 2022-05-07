import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeccionarioPageRoutingModule } from './leccionario-routing.module';

import { LeccionarioPage } from './leccionario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeccionarioPageRoutingModule
  ],
  declarations: [LeccionarioPage]
})
export class LeccionarioPageModule {}
