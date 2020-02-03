import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController, ModalController } from '@ionic/angular';
import { AgendaTurno } from '../../models/agenda-turno.model';
import { MedicoObraSocial } from 'src/app/models/medico-obrasocial.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Paciente } from '../../models/paciente.model';
import { formatDate, DatePipe } from '@angular/common';
import { AgendaService } from './../../services/agenda.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { customDayShortNames } from '../../config/config';

import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { calendarioIdioma } from '../../config/config';
import { HistoriaClinicaPage } from './../historia-clinica/historia-clinica.page';
import { async } from 'rxjs/internal/scheduler/async';
import { HistoriaClinicaBuscarPage } from './../../pages/modals/historia-clinica-buscar/historia-clinica-buscar.page';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
  providers: [DatePipe]
})
export class AgendaPage implements OnInit {


  faCoffee = faCoffee;
  fechaHoy:Date;

  
  display: boolean = false;
  cols: any[];
  selectedItem: AgendaTurno;
  es:any;
  // LOADING
  DateForm: FormGroup;
  loading: boolean;
  elemento:AgendaTurno = null;  
  customDayShortNames;
  fecha:Date;
  _fechaHoy:string;
  
  selecteditems:AgendaTurno[] = [];
  usuario_id:string;
  busqueda: any[];
  pacienteForm: FormGroup;
  colsAgenda:any;
  popItemAgenda:AgendaTurno;
  elementosTurnos:AgendaTurno[] = null;
  popItemMedicoObraSocial:MedicoObraSocial;
  agendaTurno:AgendaTurno[];
  agendaTurnos:AgendaTurno[] =[];
  col:AgendaTurno= null;
  elementosFiltrados:AgendaTurno[] = [];
  elementosFiltradosImpresion:AgendaTurno[] = [];
  observacion:string;
  popItemPaciente:Paciente;
  condicion:string;
  columns: any[];
  checked: boolean = false;
   userData:any;
  buscar_paciente:string;
 
  motivo:string;
  presentes:number = 0;

  
  sobreturno:number = 0;
  pendiente:number = 0;
  presente:number = 0;
  llamando:number = 0;
  espera:number = 0;
  ingresado:number = 0;
  atendido:number = 0;
  constructor(public actionSheetController: ActionSheetController,private navCtrl:NavController,private miServicio:AgendaService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              public modalController: ModalController) {
      this.es = calendarioIdioma;
      this.DateForm = new FormGroup({
        fechaHoy: new FormControl('', Validators.required)
        });

     }

  ngOnInit() {
    this.fechaHoy = new Date();
    this.DateForm.patchValue({fechaHoy: this.fechaHoy});
    this.fecha = new Date();
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.popItemPaciente =  new Paciente('0','','','','','',new Date(),'','','','','','','','','0','0','','','0','','','','','','');
    this.popItemAgenda = new AgendaTurno('',new Date(),new Date(), new Date(), '','', '', '', '','','','','','','','','','','','','','','','','','','','','',new Date(),'','','','','', '','','','','','','','');
  
    this.loadList();
  }

  

  ionViewWillEnter(){
    this.loadList();
    console.log('entrando nuevamente a la pagina');
  }

  actualizarFecha(event){  
    this.fecha = event;
    this.fechaHoy = event;  
    this.loadList();
  }
  

  updateMyDate($event) {
    console.log($event.detail.value); // --> wil contains $event.day, $event.month and $event.year
    this.fecha = $event.detail.value;
    this.fechaHoy = $event.detail.value;
    this.loadList();
  }
  BackButton(){
    this.location.back();
  }

  goToHistoriaClinica(){
    this.navCtrl.navigateForward('historia-clinica');
  }

  async presentActionSheet(col:any) {
    console.log(col['agenda_estado_id']);
    const actionSheet = await this.actionSheetController.create({
      header: 'Turnos',
      buttons: [

        {
          text: 'Ingresado',
          role: 'destructive',
          icon: 'checkmark-circle-outline',
          cssClass:'es-ingresado',
          handler: () => {

              swal({
              title: 'Ingresar turno',
              text: '¿Desea ingresar el paciente '+col['paciente_apellido']+' '+col['paciente_nombre']+' ?',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#A5D6A7',
              cancelButtonColor: '#FF5733',
              confirmButtonText: 'Si',
              cancelButtonText: 'No'
            }).then((result) => {
              if (result.value) {
                col['agenda_estado_id']= '3';
                col['presente'] = this._fechaHoy;
                col['puesto_estado'] = 'LLAMANDO';
                console.log('Actualizar turno');
                this.actualizarTurno(col);
              }
            });
            
          }
        },
        {
          text: 'Atendido',
          role: 'destructive',
          cssClass:'es-atendido',
          icon: 'heart',
          handler: () => {
            col['agenda_estado_id'] = '4';
            col['atendido'] = this._fechaHoy;
            col['puesto_estado'] = 'ATENDIDO';
            console.log('turno atendido');
            this.actualizarTurno(col);
          }
        },
        {
        text: 'Dar otro turno',
        role: 'destructive',
        cssClass:'text-primary',
        icon: 'bookmarks',
        handler: () => {
          col['agenda_estado_id'] = '1';
          //await  this.actualizarTurno();          
          this.router.navigate(['/recepcion/turnos/(paciente: col)']);
          console.log('Delete clicked');
        }
      }, {
        text: 'Historia clínica',
        role: 'destructive',
        icon: 'pulse',
        handler: () => {

        this.openModal(col);

        }
      }, {
        text: 'Cancelar turno',
        role: 'destructive',
        icon: 'trash',
        cssClass:'text-danger',
        handler: () => {

          swal({
            title: 'Cancelar turno',
            text: '¿Desea cancelar el turno de '+col['paciente_apellido']+' '+col['paciente_nombre']+' ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#A5D6A7',
            cancelButtonColor: '#FF5733',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.value) {
              col.agenda_estado_id = '7';
              col.atendido = this._fechaHoy;
              this.cancelarTurno();
            }
          });
          console.log('Play clicked');
        }
      }, {
        text: 'Editar paciente', 
        role: 'destructive',
        icon: 'create',
        cssClass:'text-info',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    
    await actionSheet.present();

    
  }


  
  async openModal(col:any) {
    const modal = await this.modalController.create({
      component: HistoriaClinicaBuscarPage,
      componentProps: { paciente: col }
    /*  componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }*/
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        console.log('Paciente seleccionado: ');
        console.log(dataReturned.data);     
      }
    });

    return await modal.present();
  }
  
  obtenerFecha(event:any){
    console.log("hola");
    console.log(event);
    console.log(this.fechaHoy);
  }

  darTurno(){
    this.router.navigate(['/tabs/tabs/tabturno']);
    
  }
  
loadList(){
  console.log(this.fechaHoy);
  let userData = JSON.parse(localStorage.getItem('userData'));

  this.loading = true;
  this._fechaHoy = formatDate(this.fechaHoy, 'yyyy-MM-dd', 'en');
  console.log(userData['id']);

  if(this._fechaHoy!=''){
  console.log(this.col);
  if(this.popItemAgenda === undefined){
    this.popItemAgenda = this.col;
  }
  this.popItemAgenda.fecha_turno = this._fechaHoy;     
  this.popItemAgenda.usuario_id = userData['id']; 
  console.log(this.popItemAgenda);
  try {
      this.miServicio.getHorarioTurnoMedico(this.popItemAgenda)
      .subscribe(resp => {
       console.log(resp);

       if (resp[0]) {
          this.agendaTurno = resp;
          console.log(this.agendaTurno);
            } else{
              this.agendaTurno =null;
            }    
       this.loading = false;
      },
      error => { // error path
          console.log(error.message);
          console.log(error.status);

       });    
  } catch (error) {
  
  }  
} 

}



actualizarTurno(col){  
  this.loading = true;
  
  console.log( this.col);  
  try {
      this.miServicio.putItem( col,  col['agenda_dia_horario_atencion_id'])
      .subscribe(resp => {
          console.log(resp);    
          this.loading = false;    
          this.loadList(); 
      },
      error => { // error path
          console.log(error.message);
          console.log(error.status);
          console.log(error);
          swal({
            toast: false,
            type: 'warning',
            title: error.status,
            text: error.message,
            showConfirmButton: false,
            timer: 2000
          });
       });    
  } catch (error) {
  
  }  
  } 
  

  
cancelarTurno(){

  this.loading = true;
  try{
  console.log(this.condicion);
  this.miServicio.cancelarTurno( this.col.agenda_dia_horario_atencion_id)
  .subscribe(resp => {
      this.loading = false;
      if(this.condicion ==='reasignar'){
        this.router.navigate(['/recepcion/turnos'],{ state: { paciente: this.col } });
      }else{
        this.loadList();
      }
  },
  error => { // error path
      console.log(error.message);
      console.log(error.status);
      this.loading = false;
     // this.throwAlert('error','Error: '+error.status+'  Error al cargar los registros',error.message);
   });    
  } catch (error) {
  //this.throwAlert('error','Error al cargar los registros',error);
  
  } 
  
  }


colorRow(estado:string){
  

  if(estado == 'ATENDIDO') {
    return {'es-atendido'  :'null' };
  }
  if(estado == 'ATENDIDO') {
      return {'es-atendido'  :'null' };
  }
  if(estado == 'PENDIENTE') {
      return {'es-pendiente'  :'null' };
  }
  if(estado == 'AUSENTE') {
      return {'es-ausente'  :'null' };
  }
  if(estado == 'INGRESADO') {
      return {'es-ingresado'  :'null' };
  }
  if(estado == 'ESPERA') {
      return {'es-espera'  :'null' };
  }
  if(estado == 'PRESENTE') {
    return {'es-presente'  :'null' };
}
  if(estado == 'SOBRETURNO') {
    return {'es-sobreturno'  :'null' };
  }
  if(estado == 'TURNO') {
    return {'es-turno'  :'null' };
  }

  if(estado == 'DERIVADO') {
    return {'es-turno'  :'null' };
  }

  if(estado == 'CANCELADO') {  
    return {'es-cancelado'  :'null' };
  }  
 
  if(estado == 'LLAMANDO') {
    return {'es-llamando'  :'null' };
  }
}
  

}
