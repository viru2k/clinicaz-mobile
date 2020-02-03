import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { URL_SERVICIOS, PARAMS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  
  

  constructor(public http: HttpClient) { }

  ObtenerClinica(id:string){

    return this.http.get<any[]>(URL_SERVICIOS+"cuenta/clinica?id="+id);
  }
}
