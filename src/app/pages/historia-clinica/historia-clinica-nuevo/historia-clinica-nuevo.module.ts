import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoriaClinicaNuevoPageRoutingModule } from './historia-clinica-nuevo-routing.module';

import { HistoriaClinicaNuevoPage } from './historia-clinica-nuevo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HistoriaClinicaNuevoPageRoutingModule
  ],
  declarations: [HistoriaClinicaNuevoPage]
})
export class HistoriaClinicaNuevoPageModule {}
