import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgendaService } from './../../../services/agenda.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-horario',
  templateUrl: './usuario-horario.page.html',
  styleUrls: ['./usuario-horario.page.scss'],
})
export class UsuarioHorarioPage implements OnInit {
  elementos:any;
  elementosHorario:any;
  elementos_seleccionados:any;
  loading;
  userData:any;

  constructor(private agendaService: AgendaService, public modalController: ModalController) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.CargarDias();
  }

  async closeModal() {
    //const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss();
  }


  guardarValor(e:any){
    console.log(e.detail.value);
  }

  guardarDias(e:any){
    this.elementos_seleccionados = e.detail.value;
    console.log(this.elementos_seleccionados);
  }

  diaSeleccionado(e:any){
    this.elementos_seleccionados = e.detail.value;
    console.log(this.elementos_seleccionados);
    this.CargarHorario();
  }

  CargarDias(){
    this.loading = true;
    try { 
      this.agendaService.getDias()
      .subscribe(resp => {
      this.elementos = resp;
      console.log(resp);      

      this.loading = false;      
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


  
  CargarHorario(){
    this.loading = true;
    try { 
      this.agendaService.getAgendaByMedicoTodos(this.userData['id'],this.elementos_seleccionados,"S")   
      .subscribe(resp => {
      this.elementosHorario = resp;
      console.log(resp);      

      this.loading = false;      
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

  calcularEstado(estado: string){
    console.log(estado);
    if(estado === 'S'){
      return true;
    }else{
      return false;
    }

  }

  guardarAgenda(){
    
  }


}
