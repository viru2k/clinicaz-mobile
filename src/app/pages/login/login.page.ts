import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../../services/authentication.service';

import { CuentaService } from './../../services/cuenta.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { User } from '../../models/user.model';
import swal from 'sweetalert2';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  user: User;
  loggedIn = false;
  basico = true;
  factura_electronica = true;
  operacion_cobro = true;
  estudios = true;
  recepcion = true;
  rendicion = true;
  gestion_obra_social = true;
  recepcion_telefonista = true;
  recepcion_consulta = true;
  mantenimiento_basico = true;
  mantenimiento_agenda = true;
  quirofano_administracion = true;
  quirofano_consulta = true;
  gerencia = true;
  mantenimiento_medico = true;
  medico = true;
  estudios_control = true;
  estudios_consulta = true;
  medico_consulta = true;
  operacion_cobro_basico = true;


  public username: string;
  public puesto: string;
  elemento: User = null;
  elementoModulo: [] = null;
  loginForm: FormGroup;
  loading = false;
  loading_mensaje: string;
  loading_error: boolean;
  submitted = false;
  returnUrl: string;
  error = '';
  notificaciones= 0;
  chats: boolean;
  userData: any;
  constructor(    private cuentaService: CuentaService,
                  private authenticationService: AuthenticationService,
                  private formBuilder: FormBuilder,
                  private route: ActivatedRoute,
                  private router: Router,
                  private miServico: UserService) {

  }
  ngOnInit() {

    /*======== JQUERY DEL LOGUIN =========*/
    $(document).ready
    (function($) {
      'use strict';


      /*==================================================================
      [ Focus Contact2 ]*/
      $('.input100').each(function() {
          $(this).on('blur', function() {
              if ($(this).val().trim() != '') {
                  $(this).addClass('has-val');
              } else {
                  $(this).removeClass('has-val');
              }
          })
      });


      /*==================================================================
      [ Validate ]*/
      let input = $('.validate-input .input100');

      $('.validate-form').on('submit', function() {
          let check = true;

          for (let i = 0; i < input.length; i++) {
              if (validate(input[i]) == false) {
                  showValidate(input[i]);
                  check = false;
              }
          }

          return check;
      });


      $('.validate-form .input100').each(function() {
          $(this).focus(function() {
             hideValidate(this);
          });
      });

      function validate(input) {
          if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
              if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                  return false;
              }
          } else {
              if ($(input).val().trim() == '') {
                  return false;
              }
          }
      }

      function showValidate(input) {
          let thisAlert = $(input).parent();

          $(thisAlert).addClass('alert-validate');
      }

      function hideValidate(input) {
          let thisAlert = $(input).parent();

          $(thisAlert).removeClass('alert-validate');
      }


  });
    /*======== FIN JQUERY DEL LOGUIN =========*/

    this.loginForm = this.formBuilder.group({
       username: ['', Validators.required],
       password: ['', Validators.required],
       puesto: ['0']
   });


    // VALIDO SI EL USUARIO TIENE TOKENS GUARDADOS
    if (localStorage.getItem('currentUser') === null) {

    console.log(localStorage.getItem('currentUser'));
    this.router.navigate(['/']);

    } else {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if ( currentUser.access_token === '') {
      this.loading_error = true;
      console.log(currentUser.access_token );
      } else {
        this.router.navigate(['/tabs/tabs/tabagenda']);
      }

  }
/*

    console.log(localStorage.getItem('currentUser'));
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if(localStorage.getItem('currentUser') != null){
   let userData = JSON.parse(localStorage.getItem('userData'));
   console.log(currentUser['username']);
   if((currentUser=== null)||(currentUser['username']==='')){

    this.router.navigate(['']);
   }
   console.log(currentUser);
   console.log('usuario logueado');

   this.loggedIn = true;
   this.username = userData['username'];
   this.puesto = userData['puesto'];
   console.log(userData['access_list']);
   this.asignarModulos(userData['access_list']);
    //  this.getNotificacionesByUsuario();

   this.router.navigate(['/agenda']);

 }else{


 }*/

 }




 get f() { return this.loginForm.controls; }

 onSubmit() {

   this.submitted = true;
   this.loading_error = false;
   // stop here if form is invalid
   if (this.loginForm.invalid) {
       return;
   }

   // SI EL USUARIO NO TIENE TOKEN LO ENVIO VACIO PARA QUE DEVUELVA UNO NUEVO
   if (localStorage.getItem('currentUser') === null) {
     localStorage.setItem('currentUser', JSON.stringify({'access_token': ''}));
   }
   this.loading = true;
   this.loading_mensaje = 'Validando usuario';
   this.authenticationService.login(this.f.username.value, this.f.password.value)
      // .pipe(first())
       .subscribe(
           data => {
             console.log(data);
             this.user = data;
             const us = new User('','','','','', this.f.username.value, this.f.password.value, [], this.f.puesto.value);
             localStorage.setItem('userData', JSON.stringify(us));
             localStorage.setItem('currentUser', JSON.stringify(this.user));
             //  this.router.navigate([this.returnUrl]);
             this.loadUser();
           },
           error => {

             console.log(error);

             if (error === 'The user credentials were incorrect.') {
               this.loading_error = true;
               this.loading = false;
               this.loading_mensaje = '';
             } else {
               this.loading = false;
               this.loading_mensaje = '';
             }
             this.error = error;

           });
 }

 ver() {
 const currentUser = JSON.parse(localStorage.getItem('currentUser'));
 console.log(currentUser.access_token);
 }


 loadUser() {

  this.loading = true;
  try {
    this.loading_mensaje = 'Obteniendo modulos del usuario';

    this.miServico.getItemInfoAndMenu(this.f.username.value)
      .subscribe(resp => {
      this.elemento = resp;

      const currentUser =  JSON.parse(localStorage.getItem('currentUser'));
      this.userData = JSON.parse(localStorage.getItem('userData'));
      console.log(this.elemento);
      this.elementoModulo =  this.elemento as any;
      this.user = new User(this.elemento[0].id , this.elemento[0].email, this.elemento[0].nombreyapellido,
         this.elemento[0].name, '1', this.elemento[0].email, currentUser.access_token, [], '' );
      this.username = this.userData.username;
      localStorage.removeItem('userData');
      localStorage.setItem('userData', JSON.stringify(this.user));
      console.log(this.elementoModulo);
      //   this.asignarModulos(this.elementoModulo);
      console.log(localStorage.getItem('currentUser'));
      console.log(localStorage.getItem('userData'));
      console.log(this.user);
      this.loading = false;
      this.loading_mensaje = '';
      console.log('logueado');
      this.loggedIn = true;
      this.router.navigate(['/tabs/tabs/tabagenda']);

      },
      error => { // error path
          console.log(error.message);
          console.log(error.status);
          localStorage.removeItem('error');
          localStorage.setItem('error', JSON.stringify(error));
          this.loading = false;
          this.loading_mensaje = '';

       });
  } catch (error) {

  }
  }


  datosCuenta() {
    // obtengo los datos de la cuenta
    this.loading = true;
    try {
      console.log(this.elemento[0].id);
      this.cuentaService.ObtenerClinica(this.elemento[0].id)
        .subscribe(resp => {
       // this.elementoModulo = this.elemento["access_list"]
       console.log(resp);

       localStorage.setItem('userCuenta', JSON.stringify(this.elemento));

       this.loading = false;
       if (this.elemento[0].cuenta_Estado === 'HABILITADO') {
              // obtengo el listado del usuario
            }

        },
        error => { // error path
            console.log(error.message);
            console.log(error.status);
            localStorage.removeItem('error');
            localStorage.setItem('error', JSON.stringify(error));

        //    this.throwAlert('error','Error: '+error.status+'  Error al cargar los registros',error.message);
         });
    } catch (error) {
    //  this.throwAlert('error','Error al cargar los registros',error);
    }


  }

  asignarModulos(modulos: any) {
    modulos.forEach(element => {
     // console.log(element['modulo_nombre']);
      if (element.modulo_nombre === 'basico') {
        this.basico = false;
      }
      if (element.modulo_nombre === 'factura_electronica') {
        this.factura_electronica = false;
      }
      if (element.modulo_nombre === 'operacion_cobro') {
        this.operacion_cobro = false;
        console.log( element.modulo_nombre);
      }
      if (element.modulo_nombre === 'estudios') {
        this.estudios = false;
      }
      if (element.modulo_nombre === 'recepcion') {
        this.recepcion = false;
      }
      if (element.modulo_nombre === 'rendicion') {
        this.rendicion = false;
      }
      if (element.modulo_nombre === 'gestion_obra_social') {
        this.gestion_obra_social = false;
      }
      if (element.modulo_nombre === 'recepcion_telefonista') {
        this.recepcion_telefonista = false;
      }
      if (element.modulo_nombre === 'quirofano_administracion') {
        this.quirofano_administracion = false;
      }
      if (element.modulo_nombre === 'quirofano_consulta') {
        this.quirofano_consulta = false;
      }
      if (element.modulo_nombre === 'mantenimiento_basico') {
        this.mantenimiento_basico = false;
      }
      if (element.modulo_nombre === 'mantenimiento_medico') {
        this.mantenimiento_medico = false;
      }
      if (element.modulo_nombre === 'medico') {
        this.medico = false;
      }
      if (element.modulo_nombre === 'gerencia') {
        this.gerencia = false;
      }
      if (element.modulo_nombre === 'estudios_control') {
        this.estudios_control = false;
      }
      if (element.modulo_nombre === 'estudios_consulta') {
        this.estudios_consulta = false;
      }

      if (element.modulo_nombre === 'operacion_cobro_basico') {
        this.operacion_cobro_basico = false;
      }

      if (element.modulo_nombre === 'medico_consulta') {
        this.medico_consulta = false;
      }

      if (element.modulo_nombre === 'recepcion_consulta') {
        this.recepcion_consulta = false;
      }


    });


    /** DESPUES DE ASIGNAR MODULOS VERIFICO LAS NOTIFICACIONES */


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

  if (errorNumero == '422') {
    mensaje = 'Los datos que esta tratando de guardar son iguales a los que ya poseia';
    swal({
        type: 'warning',
        title: 'Atención..',
        text: mensaje,
        footer: motivo
      });
}

  if (errorNumero == '99') {
  mensaje = 'Debe seleccionar un paciente antes de cargar las prácticas';
  swal({
      type: 'warning',
      title: 'Atención..',
      text: mensaje,
      footer: motivo
    });
}

  if (errorNumero == '100') {
  mensaje = 'El paciente posee una obra social que no esta habilitada';
  swal({
      type: 'warning',
      title: 'Atención..',
      text: mensaje,
      footer: motivo
    });
}
  if (estado == 'warning') {

    swal({
        type: 'warning',
        title: 'Atención..',
        text: mensaje,
        footer: motivo
      });
  }

  if ((estado == 'error') && (errorNumero != '422')) {
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


