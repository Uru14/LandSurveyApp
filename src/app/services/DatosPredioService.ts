import { Injectable } from '@angular/core';
import { DatosPredio } from '../models/datosPredio.model';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class DatosPredioService {
  private datosPredio: DatosPredio | null = null;
  private readonly STORAGE_KEY = 'datosPredio';

  constructor() {
    this.cargarDatosPredio();
  }

  async cargarDatosPredio() {
    let datosPredioAlmacenados = await Storage.get({ key: this.STORAGE_KEY });
    this.datosPredio = datosPredioAlmacenados && datosPredioAlmacenados.value
      ? JSON.parse(datosPredioAlmacenados.value) : null;
  }


  async addDatosPredio(datos: DatosPredio) {
    this.datosPredio = datos;
    await this.guardarDatosPredio();
  }

  async guardarDatosPredio() {
    if (this.datosPredio) {
      await Storage.set({
        key: this.STORAGE_KEY,
        value: JSON.stringify(this.datosPredio),
      });
    }
  }

  getDatosPredio(): DatosPredio | null {
    return this.datosPredio;
  }
}
