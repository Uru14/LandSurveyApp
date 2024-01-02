import { Injectable } from '@angular/core';
import { Predio } from '../models/predio.model';
import {Coordenadas} from "../models/geometria.model";
import { Storage } from '@capacitor/storage';
import {ActivatedRoute} from "@angular/router";
@Injectable({
  providedIn: 'root',
})

export class PredioService {
  //private contadorIds: number = 1;
  //private predioActual: Predio = new Predio(this.contadorIds,[], null, [], [], []);
  private predioActual: Predio = new Predio(0,[], null, [], [], []);
  private listaPredios: Predio[] = [];
  private readonly STORAGE_KEY = 'listaPredios';
  constructor(private route: ActivatedRoute) {
    this.cargarListaPredios();
  }

  nuevoPredio() {
    //this.predioActual = new Predio(this.contadorIds++,[],null,[],[],[]);
    this.predioActual = new Predio(0,[],null,[],[],[]);
  }

  obtenerPredioActual(){
    let predioId = +this.route.snapshot.params['id'];
    let actPredio = this.listaPredios.find((predio) => predio.id === predioId);
    if (actPredio) {
      this.predioActual = actPredio
    }
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

  private async cargarListaPredios() {
    let listaPrediosGuardada = await Storage.get({ key: this.STORAGE_KEY });
    if (listaPrediosGuardada && listaPrediosGuardada.value) {
      this.listaPredios = JSON.parse(listaPrediosGuardada.value);
    }
  }

  private async guardarListaPredios() {
    await Storage.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(this.listaPredios),
    });
  }

  borrarPredioActual() {

    let index = this.listaPredios.findIndex(predio => predio.id === this.predioActual.id);

    if (index !== -1) {
      // Elimina el predio actual de la lista de predios
      this.listaPredios.splice(index, 1);

      // Guarda la lista actualizada en el almacenamiento
      this.guardarListaPredios();

      // Crea un nuevo predio actual
      this.nuevoPredio();
    } else {
      console.error('No se pudo encontrar el predio actual en la lista de predios.');
    }
  }
}
