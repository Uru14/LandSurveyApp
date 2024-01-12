import { Component } from '@angular/core';
import {PredioService} from "../services/PredioService";
import {Router} from "@angular/router";
@Component({
  selector: 'app-nuevo-predio',
  templateUrl: './nuevo-predio.component.html',
  styleUrl: './nuevo-predio.component.css'
})
export class NuevoPredioComponent {

  constructor(private predioService: PredioService) {}

  guardarPredio() {

    let predioActual = this.predioService.obtenerPredioActual();
    console.log(predioActual)

    this.predioService.guardarPredioActual(predioActual);

    console.log(predioActual)

  }
}

