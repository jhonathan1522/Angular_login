import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AutenticateModel } from '../modelos/AutenticateModel';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private endPoint = "http://localhost:3000/personas";

  datosUsuarioEnSesion = new BehaviorSubject<AutenticateModel>(new AutenticateModel());

  constructor(private http:HttpClient) {
    this.verificarSesionActual();
  }

  login(user:string,password:string):Observable<AutenticateModel>{
    return this.http.post<AutenticateModel>(this.endPoint,{
      nombre:user,
      clave:password.toString()
    },{
      headers: new HttpHeaders({})
    })
  }

  almacenarInformacion(datos:AutenticateModel){
    datos.estaIdentificado = true;
    let stringDatos = JSON.stringify(datos);
    localStorage.setItem("datosSession",stringDatos);
    this.refrescarDatosEnSesion(datos);
  }

  obtenerInformacionSesion(){
    let datosString = localStorage.getItem("datosSession");
    if(datosString)
      return JSON.parse(datosString);
    else
      return null;
  }

  eliminarInformacionEnSesion(){
    localStorage.removeItem("datosSession");
    this.refrescarDatosEnSesion(new AutenticateModel);
  }

  seHaIniciadoSesion(){
    return localStorage.getItem("datosSesion");
  }

  verificarSesionActual(){
    let datos = this.obtenerInformacionSesion();
    if(datos){
      this.refrescarDatosEnSesion(datos);
    }
  }

  refrescarDatosEnSesion(datos:AutenticateModel){
    this.datosUsuarioEnSesion.next(datos);
  }

  obtenerDatosUsuarioEnSesion(){
    return this.datosUsuarioEnSesion.asObservable();
  }
}
