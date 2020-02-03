import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { calendarioIdioma } from '../../../../config/config';
import { PacienteService } from '../../../../services/paciente.service';
import { ObraSocial } from '../../../../models/obra-social.model';
import { Paciente } from '../../../../models/paciente.model';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-paciente-editar',
  templateUrl: './paciente-editar.page.html',
  styleUrls: ['./paciente-editar.page.scss'],
})
export class PacienteEditarPage implements OnInit {
  es:any;
  updateDataForm: FormGroup;
  edad:string;
  popItemObraSocial:ObraSocial;
  elemento:Paciente = null;
  elementos:Paciente[] = null;
  loading: boolean;
  paciente:Paciente;
  es_nuevo = true;
  

  constructor(private miServicio:PacienteService,private router:Router) { 
    this.es = calendarioIdioma;
    if(this.router.getCurrentNavigation()){
      if(this.router.getCurrentNavigation().extras.state != undefined){
     console.log(this.router.getCurrentNavigation().extras.state.paciente);
     this.paciente =this.router.getCurrentNavigation().extras.state.paciente;
     this.es_nuevo = false;
      }}
  }

  ngOnInit() {

    this.updateDataForm = new FormGroup({
      'paciente_id': new FormControl('0'),
      'nombre': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
       'dni': new FormControl('', [ Validators.required, Validators.maxLength(8)]),
      'domicilio': new FormControl('San Juan', Validators.required),
      'sexo': new FormControl('M', Validators.required),
      'email': new FormControl('sin_correo@delavision.com.ar', [Validators.required, Validators.email]),
      'fecha_nacimiento': new FormControl('', Validators.required),
      'ciudad': new FormControl('San Juan', Validators.required),
      'telefono_cel': new FormControl('0', Validators.required),
      'telefono_fijo': new FormControl('0', ),
      'tiene_whatsapp': new FormControl('false'),
      'obra_social_nombre': new FormControl(''),
      'obra_social_id': new FormControl('1'),
      'coseguro_nombre': new FormControl('PARTICULARES'),
      'coseguro_id': new FormControl('86'),
      'usuario_alta_id': new FormControl('0'), 
      'numero_afiliado': new FormControl('0'), 
      'barra_afiliado': new FormControl('0'),
      'plan': new FormControl('0'),
      'id': new FormControl('0'),
      'gravado_adherente': new FormControl('O'),
      'es_coseguro': new FormControl('N'),
  });
    if(this.paciente != null){
      console.log('paciente editar');
    console.log(this.paciente);
 
   // this.updateDataForm.patchValue(this.paciente);   
    
    this.updateDataForm.patchValue({apellido: this.paciente.apellido});   
    this.updateDataForm.patchValue({nombre: this.paciente.nombre});   
    this.updateDataForm.patchValue({dni:this.paciente.dni});
    this.updateDataForm.patchValue({domicilio:this.paciente.domicilio});
    this.updateDataForm.patchValue({sexo:this.paciente.sexo});
    this.updateDataForm.patchValue({email:this.paciente.email});
   
    let _fecha:Date = new Date(this.paciente.fecha_nacimiento);
    let dateFix = new Date(_fecha.getTime() + (_fecha.getTimezoneOffset() * 60 * 1000));      
    this.edad =String((new Date()).getFullYear() - (new Date(dateFix)).getFullYear());
    console.log((new Date()).getFullYear() - (new Date(dateFix)).getFullYear());
    console.log(dateFix);
    //this.config.data.fecha_nacimiento = dateFix;
    this.updateDataForm.patchValue({fecha_nacimiento: dateFix});
    this.updateDataForm.patchValue({paciente_id:this.paciente.id});
    this.updateDataForm.patchValue({telefono_cel:this.paciente.telefono_cel});
    this.updateDataForm.patchValue({ciudad:this.paciente.ciudad});
    this.updateDataForm.patchValue({tiene_whatsapp:this.paciente.tiene_whatsapp});
    this.updateDataForm.patchValue({numero_afiliado:this.paciente.numero_afiliado});
    this.updateDataForm.patchValue({plan:this.paciente.plan});
 
    this.updateDataForm.patchValue({obra_social_nombre:this.paciente.obra_social_nombre});
 
    this.updateDataForm.patchValue({barra_afiliado:this.paciente.barra_afiliado});
    this.updateDataForm.patchValue({numero_afiliado:this.paciente.numero_afiliado});
    this.updateDataForm.patchValue({paciente_obra_social_id:this.paciente.obra_social_id});
        
    this.updateDataForm.patchValue({edad: this.edad});
    console.log(this.updateDataForm);
    
  }
  }


  buscarObraSocial(){
    this.popItemObraSocial = new ObraSocial('','','','','','','','');
    let data:any; 
     /* const ref = this.dialogService.open(PopupObrasocialComponent, {
      data,
       header: 'Crear /Modificar registro', 
       width: '95%',
       height: '90%'
   });

   ref.onClose.subscribe((PopupObrasocialComponent:ObraSocial) => {
       if (PopupObrasocialComponent) {
       console.log(PopupObrasocialComponent);    
            this.popItem = PopupObrasocialComponent;
            this.config.data = this.updateDataForm.value;
            this.config.data.obra_social_nombre = this.popItem.nombre;
            this.config.data.obra_social_id = this.popItem.id;
            this.config.data.es_coseguro = this.popItem.es_coseguro;
            this.updateDataForm.patchValue(this.config.data);
       }
   });*/
  }

  loginForm(){
    this.loading = true;
    console.log(this.updateDataForm.value);
    if(this.es_nuevo){

      try { 
        this.miServicio.postItem(this.updateDataForm.value)
        .subscribe(resp => {
        this.elemento = resp;
        console.log(this.elemento);    
        this.loading = false;
      //  this.loadList();
        //this.resultSave = true;
        swal({
          toast: false,
          type: 'success',
          title: 'Guardado',
          text: 'Se creo el paciente',
          showConfirmButton: false,
          timer: 2000
        });
        },
        error => { // error path
            console.log(error.message);
            console.log(error.status);
            this.throwAlert('error','Error: '+error.status,  'Error al cargar los registros',error.status);
            this.loading = false;
          });
    } catch (error) {
        this.throwAlert('error','Error al cargar los registros',error,error.status);
    }

    }else{
      
      try {         
      //  console.log(this.popItem.id);
        this.miServicio.putItem(this.updateDataForm.value, this.updateDataForm.value.paciente_id)
        .subscribe(resp => {
          swal({
            toast: false,
            type: 'success',
            title: 'Guardado',
            text: 'Se guardo el paciente',
            showConfirmButton: false,
            timer: 2000
          });
        },   
        error => { // error path
            console.log(error.message);
       //     console.log(error.status);
            this.throwAlert('error','Error: '+error.status,'  Error al insertar los registros',error.status);
            this.loading = false;
 });    
    } catch (error) {
        this.throwAlert('error','Error al cargar los registros',error,error.status);
    }

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
