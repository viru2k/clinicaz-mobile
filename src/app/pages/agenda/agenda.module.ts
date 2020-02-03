import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendaPageRoutingModule } from './agenda-routing.module';

import { AgendaPage } from './agenda.page';
/********************COMPONENTES DE PRIMENG *************************/
import { CalendarModule } from 'primeng/calendar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AgendaPageRoutingModule,
    CalendarModule
  ],
  declarations: [AgendaPage]
})
export class AgendaPageModule {}
