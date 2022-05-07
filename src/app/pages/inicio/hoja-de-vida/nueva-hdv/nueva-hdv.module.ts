import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaHdvPageRoutingModule } from './nueva-hdv-routing.module';

import { NuevaHdvPage } from './nueva-hdv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaHdvPageRoutingModule
  ],
  declarations: [NuevaHdvPage]
})
export class NuevaHdvPageModule {}
