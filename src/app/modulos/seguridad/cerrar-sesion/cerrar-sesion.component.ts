import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css']
})
export class CerrarSesionComponent implements OnInit {

  constructor(private autenticateService: AutenticacionService,
    private router:Router) { }

  ngOnInit(): void {
    alert("hola");
    this.autenticateService.eliminarInformacionEnSesion();
    this.router.navigate(['/home']);
  }

}
