import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioHorarioPageRoutingModule } from './usuario-horario-routing.module';

import { UsuarioHorarioPage } from './usuario-horario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioHorarioPageRoutingModule
  ],
  declarations: [UsuarioHorarioPage]
})
export class UsuarioHorarioPageModule {}
