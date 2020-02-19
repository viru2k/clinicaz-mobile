import { Component, OnInit } from '@angular/core';
import { AgendaService } from './../../services/agenda.service';
import swal from 'sweetalert2';
import { ModalController } from '@ionic/angular';
import { UsuarioAgendaPage } from './../modals/usuario-agenda/usuario-agenda.page';

import { UsuarioHorarioPage } from './../modals/usuario-horario/usuario-horario.page';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  elementos:any;
  loading;
  constructor(private agendaService: AgendaService, public modalController: ModalController) { }

  ngOnInit() {
    
  }

  
  async openModal() {
    const modal = await this.modalController.create({
      component: UsuarioHorarioPage,
    /*  componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }*/
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        console.log('Paciente seleccionado: ');
        console.log(dataReturned.data);
    /*     this.dataReturned = dataReturned.data;
   
        this.popItemPaciente = this.dataReturned;
         this.formPaciente.patchValue(this.dataReturned);
        this.apellido = this.dataReturned.apellido;
        this.nombre = this.dataReturned.nombre;
        this.obra_social_nombre = this.dataReturned.obra_social_nombre;
        this.dni =  this.dataReturned.dni;       
        this.fecha_nacimiento =  this.dataReturned.fecha_nacimiento; 
        this.loadListTurno(); */
   //     this.elemento.paciente_id = dataReturned.data.id;
        // alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }

  async openModalHorario(){
    const modal = await this.modalController.create({
      component: UsuarioHorarioPage,
    /*  componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }*/
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        console.log('Paciente seleccionado: ');
        console.log(dataReturned.data);
    /*     this.dataReturned = dataReturned.data;
   
        this.popItemPaciente = this.dataReturned;
         this.formPaciente.patchValue(this.dataReturned);
        this.apellido = this.dataReturned.apellido;
        this.nombre = this.dataReturned.nombre;
        this.obra_social_nombre = this.dataReturned.obra_social_nombre;
        this.dni =  this.dataReturned.dni;       
        this.fecha_nacimiento =  this.dataReturned.fecha_nacimiento; 
        this.loadListTurno(); */
   //     this.elemento.paciente_id = dataReturned.data.id;
        // alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }
  
}
