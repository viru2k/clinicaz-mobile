import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgendaService } from './../../../services/agenda.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-agenda',
  templateUrl: './usuario-agenda.page.html',
  styleUrls: ['./usuario-agenda.page.scss'],
})
export class UsuarioAgendaPage implements OnInit {

  elementos:any;
  elementos_seleccionados:any[];
  loading;
  constructor(private agendaService: AgendaService,
    private modalController: ModalController
   ) { }

  ngOnInit() {
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

  CargarDias(){
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

  guardarAgenda(){
    
  }

}
