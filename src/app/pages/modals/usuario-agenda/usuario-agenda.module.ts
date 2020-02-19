import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioAgendaPageRoutingModule } from './usuario-agenda-routing.module';

import { UsuarioAgendaPage } from './usuario-agenda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioAgendaPageRoutingModule
  ],
  declarations: [UsuarioAgendaPage]
})
export class UsuarioAgendaPageModule {}
