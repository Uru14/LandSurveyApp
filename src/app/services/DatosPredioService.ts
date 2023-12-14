import { Injectable } from '@angular/core';
import { DatosPredio } from '../models/datosPredio.model';

@Injectable({
  providedIn: 'root',
})
export class DatosPredioService {
  private datosPredio: DatosPredio | null = null;

  constructor() {
    this.cargarDatosPredio();
  }

  cargarDatosPredio() {
    let datosPredioAlmacenados = localStorage.getItem('datos');
    this.datosPredio = datosPredioAlmacenados ? JSON.parse(datosPredioAlmacenados) : null;
  }

  addDatosPredio(datos: DatosPredio) {
    this.datosPredio = datos;
    this.guardarDatosPredio();
  }

  guardarDatosPredio() {
    if (this.datosPredio) {
      localStorage.setItem('datos', JSON.stringify(this.datosPredio));
    }
  }

  getDatosPredio(): DatosPredio | null {
    return this.datosPredio;
  }
}
