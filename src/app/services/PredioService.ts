import { Injectable } from '@angular/core';
import { Predio } from '../models/predio.model';

@Injectable({
  providedIn: 'root',
})

export class PredioService {
  private contadorIds: number = 1;
  private predioActual: Predio = new Predio(this.contadorIds,[], null, [], [], []);
  private listaPredios: Predio[] = [];

  constructor() {
    this.cargarListaPredios();
  }

  nuevoPredio() {
    this.predioActual = new Predio(this.contadorIds++,[],null,[],[],[]);
  }

  obtenerPredioActual(): Predio {
    return this.predioActual;
  }

  guardarPredioActual(predio: Predio) {
    this.predioActual = predio;
    this.listaPredios.push(predio);
    this.guardarListaPredios();
  }

  getListaPredios(): Predio[] {
    return this.listaPredios;
  }

  private cargarListaPredios() {
    let listaPrediosGuardada = localStorage.getItem('listaPredios');
    if (listaPrediosGuardada) {
      this.listaPredios = JSON.parse(listaPrediosGuardada);
    }
  }

  private guardarListaPredios() {
    localStorage.setItem('listaPredios', JSON.stringify(this.listaPredios));
  }
}
