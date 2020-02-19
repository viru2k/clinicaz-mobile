import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MedicoService } from '../../../services/medico.service';
import { HistoriaClinica } from '../../../models/historia-clinica.model';
import { URL_ARCHIVO,calendarioIdioma } from './../../../config/config';
import swal from 'sweetalert2';

@Component({
  selector: 'app-historia-clinica-nuevo',
  templateUrl: './historia-clinica-nuevo.page.html',
  styleUrls: ['./historia-clinica-nuevo.page.scss'],
})
export class HistoriaClinicaNuevoPage implements OnInit {

  dataForm:FormGroup;
  elemento_temp:HistoriaClinica;
  elemento:HistoriaClinica;
  _fecha:string; 
  uploadedFiles: any[] = [];
  userData:any;
public url:string  = URL_ARCHIVO;

  constructor( 
      private miServicio:MedicoService,
      private router: Router,
    ) { 
    if (this.router.getCurrentNavigation().extras.state != undefined) {
      console.log('paciente');
      console.log(this.router.getCurrentNavigation().extras.state.paciente);
      this.elemento = this.router.getCurrentNavigation().extras.state.paciente;
      this.elemento_temp = this.router.getCurrentNavigation().extras.state.paciente;
   //   this.elementoPacienteInicio = this.router.getCurrentNavigation().extras.state.paciente;
     // this.esInvocado = true;
      // console.log('es invocado '+ this.esInvocado);
    //  console.log(this.elementoPacienteInicio);
    }
  }

  ngOnInit() {
   /* this._fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    console.log(this.config.data);  
    this.elemento_temp = this.config.data;*/
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.dataForm = new FormGroup({

      'edad': new FormControl(''),
      'numero_afiliado': new FormControl(''),
      'plan': new FormControl(''),
      'dni': new FormControl(''),  
      'domicilio': new FormControl(''),  
      'paciente_fecha_nacimiento': new FormControl(''),
      'paciente_id': new FormControl(''),
      'paciente_nombre': new FormControl(''),
      'paciente_apellido': new FormControl(''),
      'obra_social_nombre': new FormControl(''),

      'FECHA': new FormControl(''),
      'MC': new FormControl(''),
      'AEA': new FormControl(''),
      'APP': new FormControl(''),
      'AF': new FormControl(''),
      'BIO': new FormControl(''),
      'COMENTARIO': new FormControl(''),
      'FO': new FormControl(''),
      'CVC': new FormControl(''),
      'OBSERVACION': new FormControl(''),
      'SINTOMAS': new FormControl(''),
      'TRATAMIENTO': new FormControl(''),
      'medico_nombre': new FormControl(''),
      'medico_id': new FormControl('0'),
      'nombreyapellido': new FormControl(''),    
      'usuario_id': new FormControl(''),
      'DIAGNOSTICO': new FormControl(''),
      'SINTOMAS_SIGNOS': new FormControl(''),
      'TRATAMIENTO_MEDICO': new FormControl(''),
      'TRATAMIENTO_QUIRURGICO': new FormControl(''),
      'obra_social_id': new FormControl(''),    
      'barra_afiliado': new FormControl(''),
      'historia_clinica': new FormControl([]),
      'estudio_id': new FormControl(''),
      'estudio_nombre': new FormControl(''), 
      'ESTUDIOS': new FormControl(''),
      'MEDICACION': new FormControl(''), 
      'url_estudio': new FormControl('')
      
      });
  }

  loginForm(){
    
    console.log(this.dataForm.value);
    this.elemento = this.dataForm.value;
    //this.dataForm.patchValue({PACIENTE: this.elemento_temp.PACIENTE});
    this.dataForm.patchValue({medico_id: this.userData['id']});
    this.dataForm.patchValue({paciente_id: this.elemento_temp.paciente_id});
    this.dataForm.patchValue({MEDICONOM: this.elemento_temp.MEDICONOM});
    this.dataForm.patchValue({MEDICO: this.elemento_temp.MEDICO});
    this.dataForm.patchValue({nombreyapellido: this.elemento_temp.nombreyapellido});
    this.dataForm.patchValue({numero_afiliado: this.elemento.numero_afiliado});
    this.dataForm.patchValue({domicilio: this.elemento.domicilio});
    this.dataForm.patchValue({edad: this.elemento.edad});
    this.dataForm.patchValue({obra_social_nombre: this.elemento.obra_social_nombre});
    this.dataForm.patchValue({paciente_nombre: this.elemento.paciente_nombre});    
    this.dataForm.patchValue({plan: this.elemento.plan});
    
    try {
      this.miServicio.setHistoriaClinicaFicha(this.dataForm.value)
      .subscribe(resp => {
        swal({
          toast: false,
          type: 'success',
          title: 'Guardado',
          text: 'Se guardo la historia clínica',
          showConfirmButton: false,
          timer: 2000
        });
      
        console.log(resp);
        this.dataForm.reset();
        this.router.navigate(['/tabs/tabs/tabagenda']);
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
       });    
  } catch (error) {
  
  }  
    
  }
  
  onUpload(){
    swal({
      toast: false,
      type: 'success',
      title: 'Guardado',
      text: 'Se guardo la historia clínica',
      showConfirmButton: false,
      timer: 2000
    });
    this.dataForm.reset();
    this.router.navigate(['/tabs/tabs/tabagenda']);
  }

  onError(error){
    swal({
      toast: false,
      type: 'warning',
      title: 'El archivo no pudo subirse',
      text: error,
      showConfirmButton: true
    });
  }

}
