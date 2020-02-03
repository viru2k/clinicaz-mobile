import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacienteBuscarPageRoutingModule } from './paciente-buscar-routing.module';

import { PacienteBuscarPage } from './paciente-buscar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacienteBuscarPageRoutingModule
  ],
  declarations: [PacienteBuscarPage]
})
export class PacienteBuscarPageModule {}
