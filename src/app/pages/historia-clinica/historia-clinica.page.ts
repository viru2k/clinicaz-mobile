import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MedicoService } from './../../services/medico.service';
import { AgendaTurno } from './../../models/agenda-turno.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HistoriaClinica } from '../../models/historia-clinica.model';
import swal from 'sweetalert2';
import { NavParams, NavController, ModalController } from '@ionic/angular';
import { BuscarPage } from './../paciente/buscar/buscar.page';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.page.html',
  styleUrls: ['./historia-clinica.page.scss'],
})
export class HistoriaClinicaPage implements OnInit {

  es:any;
  fechaHoy:Date;
  loading: boolean;
  edad:number;
  paciente:AgendaTurno = null;
  formPaciente:FormGroup;
  elemento:HistoriaClinica;
  elementos:HistoriaClinica[];
  userData:any;
  paciente_id:string;

  constructor(private miServico:MedicoService,private router: Router,public navCtrl: NavController, private route: ActivatedRoute,  public modalController: ModalController) {
    console.log('llamando constructor');
    this.userData = JSON.parse(localStorage.getItem('userData'));
    if(this.router.getCurrentNavigation()){
       if(this.router.getCurrentNavigation().extras.state != undefined){
      console.log(this.router.getCurrentNavigation().extras.state.paciente);
      // si es llamado desde la agenda del paciente busco los datos
      this.paciente = this.router.getCurrentNavigation().extras.state.paciente;
      this.paciente_id = this.paciente.paciente_id;
      console.log(this.paciente);
      this.userData = JSON.parse(localStorage.getItem('userData'));
      
    }
    }
   

    this.formPaciente = new FormGroup({
    
      'edad': new FormControl('', Validators.required),
      'numero_afiliado': new FormControl('', Validators.required),
      'plan': new FormControl('', Validators.required),
      'dni': new FormControl('', Validators.required),  
      'domicilio': new FormControl('', Validators.required),  
      'paciente_fecha_nacimiento': new FormControl('', Validators.required),
      'paciente_id': new FormControl('', Validators.required),
      'paciente_nombre': new FormControl('', Validators.required),
      'paciente_apellido': new FormControl('', Validators.required),
      'obra_social_nombre': new FormControl('', Validators.required),
      'NUMERO': new FormControl('', Validators.required),
      'PACIENTE': new FormControl('', Validators.required),
      'FECHA': new FormControl('', Validators.required),
      'MC': new FormControl('', Validators.required),
      'AEA': new FormControl('', Validators.required),
      'APP': new FormControl('', Validators.required),
      'AF': new FormControl('', Validators.required),
      'BIO': new FormControl('', Validators.required),
      'COMENTARIO': new FormControl('', Validators.required),
      'FO': new FormControl('', Validators.required),
      'CVC': new FormControl('', Validators.required),
      'OBSERVACION': new FormControl('', Validators.required),
      'SINTOMAS': new FormControl('', Validators.required),
      'TRATAMIENTO': new FormControl('', Validators.required),
      'medico_nombre': new FormControl('', Validators.required),
      'medico_id': new FormControl('0', Validators.required),
      'nombreyapellido': new FormControl('', Validators.required),    
      'usuario_id': new FormControl('', Validators.required),
      'DIAGNOSTICO': new FormControl('', Validators.required),
      'SINTOMAS_SIGNOS': new FormControl('', Validators.required),
      'TRATAMIENTO_MEDICO': new FormControl('', Validators.required),
      'TRATAMIENTO_QUIRURGICO': new FormControl('', Validators.required),
      'obra_social_id': new FormControl('', Validators.required),    
      'barra_afiliado': new FormControl('', Validators.required),
      'historia_clinica': new FormControl([], Validators.required),
      'estudio_id': new FormControl('', Validators.required),
      'estudio_nombre': new FormControl('', Validators.required), 
      'ESTUDIOS': new FormControl('', Validators.required),
      'MEDICACION': new FormControl('', Validators.required)

      
      });
  


   }

  ngOnInit() {
  
    if(this.paciente != null){
      console.log(this.paciente);
      if(this.paciente.plan === '0'){
        this.formPaciente.patchValue({plan: ''});   
      }
      this.formPaciente.patchValue({paciente_nombre: this.paciente.paciente_apellido + ' '+this.paciente.paciente_nombre});   
      this.formPaciente.patchValue({paciente_fecha_nacimiento:this.paciente.paciente_fecha_nacimiento});
      this.formPaciente.patchValue({paciente_id:this.paciente.id});
      this.formPaciente.patchValue({numero_afiliado:this.paciente.numero_afiliado});
      this.formPaciente.patchValue({plan:this.paciente.plan});
      this.formPaciente.patchValue({domicilio:this.paciente.domicilio});
      this.formPaciente.patchValue({obra_social_nombre:this.paciente.paciente_obra_social_nombre});
      this.formPaciente.patchValue({dni:this.paciente.paciente_dni});
      this.formPaciente.patchValue({barra_afiliado:this.paciente.barra_afiliado});
      this.formPaciente.patchValue({numero_afiliado:this.paciente.numero_afiliado});
      this.formPaciente.patchValue({paciente_obra_social_id:this.paciente.paciente_obra_social_id});
      
      this.edad =(new Date()).getFullYear() - (new Date(this.paciente.paciente_fecha_nacimiento)).getFullYear();
      this.formPaciente.patchValue({edad: this.edad});
      console.log(this.formPaciente);
    this.loadhistoriaClinica();
    }else{ //10029750
      this.paciente = new AgendaTurno('',new Date(), new Date(), new Date(),'','','','','','','',this.userData['id'],'','','','','','','888888','' ,'','','','','','','','','', new Date(),'','','','','', '','','','','','','','');
    //  this.historiaClinica();
    }
  }

  ionViewWillEnter(){
   
   
    console.log('entrando nuevamente a la pagina');
  }

  ionViewDidEnter(){
    console.log("ionViewDidEnter")
}

  ionViewDidLeave(){
    console.log('entrando nuevamente');
  this.navCtrl.pop();
    
  }


  async openModal() {
    const modal = await this.modalController.create({
      component: BuscarPage
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== undefined) {
        console.log('Paciente seleccionado: ');
        console.log(dataReturned.data);
        this.paciente = dataReturned.data;
        
        if(this.paciente.plan === '0'){
          this.formPaciente.patchValue({plan: ''});   
        }
        this.paciente_id = dataReturned.data.id;
        this.formPaciente.patchValue({paciente_nombre: dataReturned.data.apellido + ' '+dataReturned.data.nombre});   
        this.formPaciente.patchValue({paciente_fecha_nacimiento: dataReturned.data.fecha_nacimiento});
        this.formPaciente.patchValue({paciente_id:this.paciente.id});
        this.formPaciente.patchValue({numero_afiliado: dataReturned.data.numero_afiliado});
        this.formPaciente.patchValue({plan: dataReturned.data.plan});
        this.formPaciente.patchValue({domicilio: dataReturned.data.domicilio});
        this.formPaciente.patchValue({obra_social_nombre: dataReturned.data.obra_social_nombre});
        this.formPaciente.patchValue({dni: dataReturned.data.dni});
        this.formPaciente.patchValue({barra_afiliado: dataReturned.data.barra_afiliado});
        this.formPaciente.patchValue({numero_afiliado: dataReturned.data.numero_afiliado});
        this.formPaciente.patchValue({paciente_obra_social_id: dataReturned.data.obra_social_id});
        
        this.edad =(new Date()).getFullYear() - (new Date(dataReturned.data.fecha_nacimiento)).getFullYear();
        this.formPaciente.patchValue({edad: this.edad});
        console.log(this.formPaciente);
        this.paciente.paciente_nombre = dataReturned.data.nombre;
        this.paciente.paciente_apellido = dataReturned.data.apellido;
        this.paciente.paciente_fecha_nacimiento = dataReturned.data.fecha_nacimiento;
        this.paciente.paciente_dni = dataReturned.data.dni;
        this.paciente.paciente_id = dataReturned.data.id;
        this.paciente.numero_afiliado = dataReturned.data.numero_afiliado;
        this.paciente.plan =  dataReturned.data.plan;
        this.paciente.domicilio = dataReturned.data.domicilio;
        this.paciente.paciente_obra_social_nombre = dataReturned.data.obra_social_nombre;

        this.loadhistoriaClinica();
      }
    });

    return await modal.present();
  }
  
  
agregarHistoria(){
  if(this.paciente){
    console.log(this.paciente_id);
    console.log(this.formPaciente.value);
  let userData = JSON.parse(localStorage.getItem('userData'));
  if((this.paciente_id != '')){
  //userData["id"], userData["nombreyapellido"]
  this.elemento = new HistoriaClinica(this.paciente_id,'',userData["id"],userData["nombreyapellido"],userData["id"],'','','','','','','','','',userData["id"],'',this.paciente.paciente_nombre,this.userData['id'],'',this.paciente.plan,this.paciente.numero_afiliado,'0',this.paciente.paciente_obra_social_nombre,'','','',this.paciente.paciente_dni,'','','',this.paciente.domicilio,this.paciente.paciente_obra_social_id,this.paciente.barra_afiliado, this.formPaciente.value.historia_clinica,'0','','','','','');
 
  this.router.navigate(['/historiaclinica/nuevo'],{ state: { paciente: this.paciente } });
  //console.log(this.formPaciente.value.historia_clinica);
 
  }
  }
}

   
loadhistoriaClinica(){ 
  this.loading = true; 
  try { 
      this.miServico.getHistoriaClinicaByPaciente(this.paciente_id, this.userData['id'])
      .subscribe(resp => {
      this.elementos = resp;
      console.log(resp);      
      
      this.formPaciente.patchValue({historia_clinica: resp})
      console.log(this.formPaciente);
      this.loading = false;
      //this.loadList();
      //this.resultSave = true;
      },
      error => { // error path
          console.log(error.message);
          console.log(error.status);
          swal({
            toast: false,
            type: 'warning',
            title: error.status,
            text: error.message,
            showConfirmButton: false,
            timer: 2000
          });
     //     this.resultSave = false;
          this.loading = false;
        });    
  } catch (error) {
    
  }
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
  


