import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarPageRoutingModule } from './cambiar-routing.module';

import { CambiarPage } from './cambiar.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CambiarPage]
})
export class CambiarPageModule {}