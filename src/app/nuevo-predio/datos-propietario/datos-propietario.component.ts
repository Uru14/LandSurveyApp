import { Component } from '@angular/core';
import {RouterLink, Router} from "@angular/router";
import {PropietarioService} from "../../services/PropietarioService";
import {Propietario} from "../../models/propietario.model";
import {PredioService} from "../../services/PredioService";

@Component({
  selector: 'app-datos-propietario',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './datos-propietario.component.html',
  styleUrl: './datos-propietario.component.css'
})
export class DatosPropietarioComponent {

  propietarios: Propietario[];
  constructor(private propietarioService: PropietarioService, private router: Router, private predioService: PredioService) {
    let predioActual = this.predioService.obtenerPredioActual();
    this.propietarios = predioActual.propietarios || [];
  }


  editarPropietario(dni: string) {
    this.router.navigate(['/nuevo-predio/datos-propietario/editar-propietario', dni])
  }
}
