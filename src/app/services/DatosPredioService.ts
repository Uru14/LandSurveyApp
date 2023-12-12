import { Injectable } from '@angular/core';
import { DatosPredio } from '../models/datosPredio.model';

@Injectable({
  providedIn: 'root',
})

export class DatosPredioService {
  private datosPredio: DatosPredio[] = [];

  constructor() {
    let datosPredioAlmacenados = localStorage.getItem('datos');
    this.datosPredio = datosPredioAlmacenados ? JSON.parse(datosPredioAlmacenados): [];
  }

  addDatosPredio(datos: DatosPredio) {
    let index = this.datosPredio.findIndex(d => d.cedula === datos.cedula);
    if (index !== -1) {
      // Ya existe un conjunto de datos con la misma cédula, actualiza los datos existentes
      this.datosPredio[index] = datos;
    } else {
      // No hay datos con la misma cédula, agrega uno nuevo
      this.datosPredio.push(datos);
    }

    this.guardarDatosPredio();
  }
  guardarDatosPredio() {
    localStorage.setItem('datos', JSON.stringify(this.datosPredio));
  }

  getDatosPredio(): DatosPredio[] {
    return this.datosPredio;
  }

}
