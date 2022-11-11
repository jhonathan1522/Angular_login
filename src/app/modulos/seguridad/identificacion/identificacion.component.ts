import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticateModel } from 'src/app/modelos/AutenticateModel';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
var CryptoJS = require("crypto-js");
@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {

  validacion:FormGroup = this.fb.group({
    'user':[null,[Validators.required,Validators.email]],
    'password':[null,[Validators.required]]
  });

  constructor(private fb: FormBuilder,
   private servicioAutenticacion:AutenticacionService,
   private router:Router) { }

  ngOnInit(): void {
  }

  login(){
   let user = this.validacion.controls["user"].value;
   let password = this.validacion.controls["password"].value;
   let cypherPassword = CryptoJS.MD5(password);
   this.servicioAutenticacion.login(user,cypherPassword).subscribe((datos:any)=>{
    console.log("Se guardo de forma exitosa");
    this.servicioAutenticacion.almacenarInformacion(datos);
    this.router.navigate(['/home'])
   },(error:any)=>{
    console.log("error");
   }
   );
  }

}
