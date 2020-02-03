import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoriaClinicaBuscarPageRoutingModule } from './historia-clinica-buscar-routing.module';

import { HistoriaClinicaBuscarPage } from './historia-clinica-buscar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoriaClinicaBuscarPageRoutingModule
  ],
  declarations: [HistoriaClinicaBuscarPage]
})
export class HistoriaClinicaBuscarPageModule {}
