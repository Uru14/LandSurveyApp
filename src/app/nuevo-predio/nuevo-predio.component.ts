import { Component } from '@angular/core';
import {PredioService} from "../services/PredioService";
import {Router} from "@angular/router";
@Component({
  selector: 'app-nuevo-predio',
  templateUrl: './nuevo-predio.component.html',
  styleUrl: './nuevo-predio.component.css'
})
export class NuevoPredioComponent {

  constructor(private predioService: PredioService, private router: Router) {}

  guardarPredio() {
    // Obtén el predio actual desde el servicio
    let predioActual = this.predioService.obtenerPredioActual();

    // Guarda el predio actual
    this.predioService.guardarPredioActual(predioActual);

  }
}

