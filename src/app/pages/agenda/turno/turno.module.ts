import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TurnoPageRoutingModule } from './turno-routing.module';

import { TurnoPage } from './turno.page';
/********************COMPONENTES DE PRIMENG *************************/
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  imports: [
 

  CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TurnoPageRoutingModule,
  
    CalendarModule
    
  ],
  declarations: [TurnoPage]
})
export class TurnoPageModule {}
