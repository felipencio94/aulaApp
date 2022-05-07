import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerHdvPageRoutingModule } from './ver-hdv-routing.module';

import { VerHdvPage } from './ver-hdv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerHdvPageRoutingModule
  ],
  declarations: [VerHdvPage]
})
export class VerHdvPageModule {}
