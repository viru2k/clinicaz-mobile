import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacienteListaPageRoutingModule } from './paciente-lista-routing.module';

import { PacienteListaPage } from './paciente-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacienteListaPageRoutingModule
  ],
  declarations: [PacienteListaPage]
})
export class PacienteListaPageModule {}
