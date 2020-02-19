import { Component, OnInit } from '@angular/core';
import { MedicoObraSocial } from './../../../models/medico-obrasocial.model';


import { calendarioIdioma } from '../../../config/config';
import { AgendaService } from '../../../services/agenda.service';
import { ObraSocial } from './../../../models/obra-social.model';
import { Medico } from './../../../models/medico.model';
import { Paciente } from './../../../models/paciente.model';
import { Agenda } from './../../../models/agenda.model';

import { FormControl, Validators, FormGroup, Form } from '@angular/forms';

import swal from 'sweetalert2';
import { AgendaMedico } from '../../../models/agenda-medico.model';
import { DatePipe, formatDate, Location } from '@angular/common';
import { AgendaTurno } from '../../../models/agenda-turno.model';
import { PacienteService } from 'src/app/services/paciente.service';
import { Router, ActivatedRoute } from '@angular/router';


import { User } from '../../../models/user.model';
import { UserService } from './../../../services/user.service';
import { ModalController } from '@ionic/angular';
import { BuscarPage } from './../../paciente/buscar/buscar.page';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.page.html',
  styleUrls: ['./turno.page.scss'],
})
export class TurnoPage implements OnInit {
  date1: Date;

  resultSave: boolean;
  colsAgenda: any;
  selectedItem: Agenda;

  es: any;
  agendaMedico: AgendaMedico;
  loading: boolean;
  loadingAccion: boolean;
  elemento: AgendaTurno = null;
  elementoPaciente: Paciente = null;
  elementoPacienteInicio: AgendaTurno = null;
  elementos: AgendaTurno[];
  agendaTurno: AgendaTurno[] = null;
  calendarioBloqueado: any[] = null;
  popItemPaciente: Paciente;
  popItemMedicoObraSocial: MedicoObraSocial;
  cities: any[];
  es_sobreturno = false;
  formPaciente: FormGroup;
  AgendaForm: FormGroup;
  _fechaHoy: string;
  fechaHoy: Date;
  invalidDate: Date;
  invalidDates: Date[] = [];
  invalidDatesCompleta: Array<Date>;
  usuario_id: string;
  paciente_id: string;
  observaciones: string;
  motivo_atencion = '';
  dia: any[];
  checked = false;
 DateForm: FormGroup;
 esInvocado = false; // cuando es invocada la pagina desde afuera
 display: boolean;
 formasPago: any[];
 motivoObservaciones: any[] = [];
 sobreturno = 'NO';

 selectedMotivo: string;
 selectedEstudio: string;
 selectedMedicoEfector: string;
 observacion: string;
 motivoatencion: any[];
 estudios: any[];
 motivos: any[];
 usuarios: User[];
 medico_nombre: string;
 apellido: string;
 nombre: string;
 obra_social_nombre: string;
 dni: string;
 fecha_nacimiento: Date;
 userData: any;
 boton_habilitado = true;

 dataReturned: any;

 
 isToday:boolean;


  constructor( private miServicoPaciente: PacienteService ,
               private miUserServico: UserService,
               private miServico: AgendaService, private datePipe: DatePipe,
               private route: ActivatedRoute,
               private router: Router,
               private location: Location,
               public modalController: ModalController) {

                this.userData = JSON.parse(localStorage.getItem('userData'));
                this.popItemPaciente =  new Paciente('0', '', '', '', '', '', new Date(), '', '', '', '', '', '', '', '', '0', '0', '', '', '0', '', '', '', '', '', '');
                if (this.router.getCurrentNavigation().extras.state != undefined) {
                  console.log(this.router.getCurrentNavigation().extras.state.paciente);
                  this.elementoPacienteInicio = this.router.getCurrentNavigation().extras.state.paciente;
                  this.esInvocado = true;
                  // console.log('es invocado '+ this.esInvocado);
                  console.log(this.elementoPacienteInicio);
                }
                this.es = calendarioIdioma;
                this.colsAgenda = [
                    {field: 'dia_nombre', header: 'Dia' },
                    {field: 'hora_desde', header: 'Hora desde' },
                  // {field: 'nombreyapellido', header: 'Usuario' },
                    {field: 'boton', header: '' },
                    ];

                this.DateForm = new FormGroup({
                      fechaHoy: new FormControl('', Validators.required)
                      });


                }
                async openModal() {
                  const modal = await this.modalController.create({
                    component: BuscarPage,
                  /*  componentProps: {
                      "paramID": 123,
                      "paramTitle": "Test Title"
                    }*/
                  });

                  modal.onDidDismiss().then((dataReturned) => {
                    if (dataReturned !== null) {
                      console.log('Paciente seleccionado: ');
                      console.log(dataReturned.data);
                      this.dataReturned = dataReturned.data;
                     // this.elemento = dataReturned.data;
                      this.popItemPaciente = this.dataReturned;
                       this.formPaciente.patchValue(this.dataReturned);
                      this.apellido = this.dataReturned.apellido;
                      this.nombre = this.dataReturned.nombre;
                      this.obra_social_nombre = this.dataReturned.obra_social_nombre;
                      this.dni =  this.dataReturned.dni;       
                      this.fecha_nacimiento =  this.dataReturned.fecha_nacimiento; 
                      this.loadListTurno();
                 //     this.elemento.paciente_id = dataReturned.data.id;
                      // alert('Modal Sent Data :'+ dataReturned);
                    }
                  });

                  return await modal.present();
                }
    ngOnInit() {
      
      const invalidDate = new Date();
    
      this.invalidDatesCompleta = [invalidDate, invalidDate];
      this.formPaciente = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    dni: new FormControl('', Validators.required),
    obra_social_nombre: new FormControl(''),
    fecha_nacimiento: new FormControl('')
      });


      this.AgendaForm = new FormGroup({
        medico_nombre: new FormControl(''),
        obra_social: new FormControl(''),
        });
      this.AgendaForm.patchValue({medico_nombre: this.userData.id});
    //  this.getUsuarioMedico();

      const newDate = new Date();
      this.DateForm.patchValue({fechaHoy: this.fechaHoy});
      if (this.esInvocado) {
        // console.log(this.elementoPacienteInicio);
      this.cargarAgendaInicio(this.elementoPacienteInicio);
  }
  this.fechaHoy = new Date();
  this.DateForm.patchValue({fechaHoy: this.fechaHoy});
    }

    BackButton() {
      this.location.back();
    }

    navAgenda(){
      this.router.navigate(['/tabs/tabs/tabagenda']);
    }
 

    updateMyDate($event) {
      console.log($event.detail.value); // --> wil contains $event.day, $event.month and $event.year

      this.fechaHoy = $event.detail.value;
      this._fechaHoy = formatDate(new Date(this.fechaHoy), 'yyyy-MM-dd HH:mm', 'en');
      console.log(this.fechaHoy);
      this.loadListTurno();

    }

    actualizarFecha(event) {
      console.log(event);
      this.fechaHoy = event;
      console.log(new Date(this.fechaHoy));
      this._fechaHoy = formatDate(new Date(this.fechaHoy), 'yyyy-MM-dd HH:mm', 'en');
      console.log(this.fechaHoy);
      this.loadListTurno();
    }

    agregarPaciente(){
      this.router.navigate(['/paciente/editar']);
    }

    quitarPaciente() {
      this.formPaciente.reset();
    }
    getUsuarioMedico() {
      this.loadingAccion = true;
      try {
        this.miUserServico.getItems()
        .subscribe(resp => {
        this.usuarios = resp;
        console.log(resp);
        this.selectedMedicoEfector = resp[0].nombreyapellido ;
        this.loadingAccion = false;
        },
        error => { // error path
          this.loadingAccion = false;
          console.log(error.message);
          console.log(error.status);
          swal({
              toast: false,
              type: 'error',
              title: 'Algo salio mal...',
              text: error.status + ' ' + error.message ,
              showConfirmButton: false,
              timer: 2000
            });
        });
    } catch (error) {
      swal({
        toast: false,
        type: 'error',
        title: 'Algo salio mal...',
        text: error.status + ' ' + error.message ,
        showConfirmButton: false,
        timer: 2000
      });
    }

  }


cargarAgendaInicio(agenda: AgendaTurno) {

  this.popItemPaciente.id =   agenda.paciente_id;
  this.popItemPaciente.nombre =   agenda.paciente_nombre;
  this.popItemPaciente.apellido = agenda.paciente_apellido;
  this.popItemPaciente.dni =      agenda.paciente_dni;
  this.popItemPaciente.obra_social_nombre =   agenda.paciente_obra_social_nombre;
  this.formPaciente.patchValue({nombre: agenda.paciente_nombre});
  this.formPaciente.patchValue({apellido: agenda.paciente_apellido});
  this.formPaciente.patchValue({dni: agenda.paciente_dni});
  this.formPaciente.patchValue({obra_social_nombre: agenda.paciente_obra_social_nombre});
  this.usuario_id = this.userData.id;
  this.AgendaForm.patchValue({medico_nombre: this.userData.id});
  this.formPaciente.patchValue({fecha_nacimiento: agenda.paciente_fecha_nacimiento});
}

loadListTurno() {

  this.es_sobreturno = false;
  this._fechaHoy = formatDate(this.fechaHoy, 'yyyy-MM-dd ', 'en');
  console.log(this._fechaHoy);
  if (this._fechaHoy != '') {

     this.loading = true;
     try {
       console.log(this._fechaHoy + ' 1 ' + this.userData.id);
       this.miServico.getHorarioTurnoDisponibleByUsuario(this._fechaHoy, '1', this.userData.id)
         .subscribe(resp => {

         this.agendaTurno = resp;
         this.loading = false;
         console.log(resp);
         },
         error => { // error path
           this.loading = false;
           console.log(error.message);
           console.log(error.status);
           swal({
               toast: false,
               type: 'error',
               title: 'Algo salio mal...',
               text: error.status + ' ' + error.message ,
               showConfirmButton: false,
               timer: 2000
             });
          });
     } catch (error) {

       swal({
         toast: false,
         type: 'error',
         title: 'Algo salio mal...',
         text: error.status + ' ' + error.message ,
         showConfirmButton: false,
         timer: 2000
       });
     }
   } else {
     this.throwAlert('error', 'Error: ' + 404 + '  No se selecciono una fecha', 'Error en la fecha', '400');

   }
 }





 generarTurno(event: AgendaTurno) {
  this.boton_habilitado = false;
  console.log(this.motivoObservaciones);
  console.log(this.popItemPaciente.id);

  const fecha = new Date(this.fechaHoy);
  console.log(fecha);
  this._fechaHoy = formatDate(fecha, 'yyyy-MM-dd', 'en');
  event.fecha_turno = this._fechaHoy;
  console.log(this._fechaHoy);
  event.paciente_id = this.popItemPaciente.id;
  const userData = JSON.parse(localStorage.getItem('userData'));

  // valido si la consulta proviene de un turno regular o sobreturno
  if (this.es_sobreturno) {
    this.sobreturno = 'SI';
    event.agenda_estado_id = '6';
  } else {
    event.agenda_estado_id = '1';
  }
  event.es_alerta = 'N'; // no debe ir vacio
  this.motivo_atencion = '-';
  this.observaciones = '-';
  this.elemento = event;
  
  this.elemento.observacion = this.observaciones;
  this.elemento.es_observacion = this.motivo_atencion;
  this.elemento.usuario_id =  userData['id'];
  this.elemento.es_sobreturno =  this.sobreturno;
  console.log(event);
  console.log(this.elemento);
  if (this.elemento.paciente_id) {
  let datos_validos = false;
  console.log(this.elemento);
  try {
    // valido datos del paciente y observacion
    this.loadingAccion = true;
    if (this.elemento.paciente_id !== '0') {
      datos_validos = true;
    } else {
      this.throwAlert('error', 'El id del paciente es 0, verifique los datos del paciente ', 'Datos de paciente invalidos', '500');
    }

    if (datos_validos) {
      console.log('turno');
      console.log(this.elemento);
      this.miServico.agendarTurno(this.elemento)
    .subscribe(resp => {
      this.loadingAccion = false;
      this.boton_habilitado = true;
      this.throwAlert('success', 'Se creo agendo el paciente ' + this.popItemPaciente.apellido + ' ' + this.popItemPaciente.nombre + ' con el medico ' + event.nombreyapellido, '', '200');

      swal({
        title: '¿Dar otro turno?',
        text: '¿Desea dar otro turno para el paciente' + this.popItemPaciente.apellido + ' ' + this.popItemPaciente.nombre + ' con el medico ' + event.nombreyapellido + ' ?',
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: '#A5D6A7',
        cancelButtonColor: '#F9A825',
        confirmButtonText: 'Si, dar otro turno',
        cancelButtonText: 'No, ir a mi agenda'
      }).then((result) => {
        if (result.value) {
        console.log('datos conservados');
        this.calendarioBloqueado = null;
        this.popItemMedicoObraSocial = null;
        this.AgendaForm.reset();

        } else {
          // LIMPIAR DATOS
          console.log('datos limpiados');
          this.formPaciente.reset();
          this.AgendaForm.reset();
          this.DateForm.reset();
          this.invalidDate = new Date();
          this.DateForm.patchValue({fechaHoy: new Date()});
          this.agendaTurno = [];
          this.invalidDate = null;
          this.invalidDates = [];
          this.es_sobreturno = false;
          this.sobreturno = 'NO';
          this.calendarioBloqueado = null;
          this.motivoObservaciones = [];

          /***************  POR SEGURRIDAD RESETEO TODOS LOS DATOS */
          this.selectedItem = null;
          this.agendaMedico = null;
          this.elemento = null;
          this.elementoPaciente = null;
          this.elementoPacienteInicio = null;
          this.elementos = null;
          this.popItemPaciente = null;
          this.popItemMedicoObraSocial = null;
          this.usuario_id = '';
          this.paciente_id = '';
          this.observaciones = '';
          this.motivo_atencion = '';
          this.checked = false;
          this.esInvocado = false;
          this.sobreturno = '';

          this.router.navigate(['/tabs/tabs/tabagenda']);

        }
      });


      this.loadingAccion = false;
      this.loadListTurno();
      this.resultSave = true;
    },
    error => { // error path
      this.boton_habilitado = true;
      console.log(error.message);
      console.log(error.status);
      swal({
          toast: false,
          type: 'error',
          title: 'Algo salio mal...',
          text: error.status + ' ' + error.message ,
          showConfirmButton: false,
          timer: 2000
        });
      this.resultSave = false;
      this.loadingAccion = false;
      });
    }
} catch (error) {
  this.boton_habilitado = true;
  this.loadingAccion = false;
  swal({
    toast: false,
    type: 'error',
    title: 'Algo salio mal...',
    text: error.status + ' ' + error.message ,
    showConfirmButton: false,
    timer: 2000
  });
}
  } else {
    
    this.throwAlert('warning', 'Debe seleccionar un paciente',  'Faltan datos', '100');
  }
  return this.resultSave;

}

throwAlert(estado: string, mensaje: string, motivo: string, errorNumero: string) {
  let tipoerror: string;

  if (estado == 'success') {
      swal({
          type: 'success',
          title: 'Exito',
          text: mensaje
        });
  }


  if (estado == 'warning') {
    swal({
        type: 'warning',
        title: 'Faltan datos',
        text: mensaje
      });
}

  if (estado == 'error') {
    if (errorNumero == '422') {
        mensaje = 'Los datos que esta tratando de guardar son iguales a los que ya poseia';
    }
    if (errorNumero == '400 ') {
        mensaje = 'Bad Request ';
    }
    if (errorNumero == '404') {
        mensaje = 'No encontrado ';
    }
    if (errorNumero == '401') {
        mensaje = 'Sin autorización';
    }
    if (errorNumero == '403') {
        mensaje = ' Prohibido : La consulta fue valida, pero el servidor rechazo la accion. El usuario puede no tener los permisos necesarios, o necesite una cuenta para operar ';
    }
    if (errorNumero == '405') {
        mensaje = 'Método no permitido';
    }
    if (errorNumero == '500') {
        mensaje = 'Error interno en el servidor';
    }
    if (errorNumero == '503') {
        mensaje = 'Servidor no disponible';
    }
    if (errorNumero == '502') {
        mensaje = 'Bad gateway';
    }

    swal({
          type: 'error',
          title: 'Oops...',
          text: mensaje,
          footer: motivo
        });
  }
}
}
