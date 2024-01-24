import { Injectable } from '@angular/core';
import { Predio } from '../models/predio.model';
import {Coordenadas} from "../models/geometria.model";
import { Preferences } from '@capacitor/preferences';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
@Injectable({
  providedIn: 'root',
})

export class PredioService {
  private routeParamsSubscription: Subscription;
  private predioActual: Predio = new Predio(0,[], null, [], [], []);
  private listaPredios: Predio[] = [];
  private readonly PREFERENCES_KEY = 'listaPredios';
  constructor(private route: ActivatedRoute) {
    this.cargarListaPredios();
    this.routeParamsSubscription = this.route.params.subscribe(params => {
      const predioId = +params['id'];
      this.setPredioActualById(predioId);
    });
  }

  nuevoPredio() {
    //this.predioActual = new Predio(this.contadorIds++,[],null,[],[],[]);
    this.predioActual = new Predio(0,[],null,[],[],[]);
  }

  setPredioActualById(predioId: number) {
    const actPredio = this.listaPredios.find(predio => predio.id === predioId);
    if (actPredio) {
      this.predioActual = actPredio;
    }
  }
  obtenerPredioActual(): Predio {
    let predioId = +this.route.snapshot.params['id'];
    let actPredio = this.listaPredios.find((predio) => predio.id === predioId);

    if (actPredio) {
      return actPredio;
    } else {
      return this.predioActual;
    }
  }


  guardarPredioActual(predio: Predio) {
    this.predioActual = predio;

    // Actualiza la lista de predios con el predio actualizado
    const index = this.listaPredios.findIndex(p => p.id === predio.id);
    if (index !== -1) {
      this.listaPredios[index] = predio;
    } else {
      this.listaPredios.push(predio);
    }

    this.guardarListaPredios();
  }

  getListaPredios(): Predio[] {
    return this.listaPredios;
  }

  private async cargarListaPredios() {
    let listaPrediosGuardada = await Preferences.get({ key: this.PREFERENCES_KEY });
    if (listaPrediosGuardada && listaPrediosGuardada.value) {
      this.listaPredios = JSON.parse(listaPrediosGuardada.value);
    }
  }

  public async guardarListaPredios() {
    await Preferences.set({
      key: this.PREFERENCES_KEY,
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

      // Crea un nuevo predio
      this.nuevoPredio();
    } else {
      console.error('No se pudo encontrar el predio actual en la lista de predios.');
    }
  }


  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }
}
