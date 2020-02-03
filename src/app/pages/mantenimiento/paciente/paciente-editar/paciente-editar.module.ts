import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacienteEditarPageRoutingModule } from './paciente-editar-routing.module';

import { PacienteEditarPage } from './paciente-editar.page';
import { CalendarModule } from 'primeng/calendar';
@NgModule({
  imports: [
  
  CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PacienteEditarPageRoutingModule,
    CalendarModule
  ],
  declarations: [PacienteEditarPage]
})
export class PacienteEditarPageModule {}
