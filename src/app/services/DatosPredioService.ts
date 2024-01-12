import { Injectable } from '@angular/core';
import { DatosPredio } from '../models/datosPredio.model';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class DatosPredioService {
  private datosPredio: DatosPredio | null = null;
  private readonly PREFERENCES_KEY = 'datosPredio';

  constructor() {
    this.cargarDatosPredio();
  }

  async cargarDatosPredio() {
    let datosPredioAlmacenados = await Preferences.get({ key: this.PREFERENCES_KEY });
    this.datosPredio = datosPredioAlmacenados && datosPredioAlmacenados.value
      ? JSON.parse(datosPredioAlmacenados.value) : null;
  }


  async addDatosPredio(datos: DatosPredio) {
    this.datosPredio = datos;
    await this.guardarDatosPredio();
  }

  async guardarDatosPredio() {
    if (this.datosPredio) {
      await Preferences.set({
        key: this.PREFERENCES_KEY,
        value: JSON.stringify(this.datosPredio),
      });
    }
  }

  getDatosPredio(): DatosPredio | null {
    return this.datosPredio;
  }
}
