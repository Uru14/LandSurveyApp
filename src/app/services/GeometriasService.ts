import { Injectable } from '@angular/core';
import { Coordenadas } from '../models/geometria.model';
import { Preferences } from '@capacitor/preferences';
@Injectable({
  providedIn: 'root',
})
export class GeometriasService {
  private geometria: Coordenadas[] = [];
  private readonly PREFERENCES_KEY = 'geometrias';

  constructor() {}

  crearCoordenadas(x: number, y: number): Coordenadas {
    return new Coordenadas(x, y);
  }

  mapearCoordenadasPoligono(coordinates: number[][]): Coordenadas[] {
    return coordinates.map(coord => this.crearCoordenadas(coord[0], coord[1]));
  }

  agregarGeometria(coordenadas: Coordenadas[]) {
    this.geometria.push(...coordenadas);
    this.guardarGeometrias();
  }

  obtenerGeometrias(): Coordenadas[] {
    return this.geometria;
  }

  limpiarGeometrias() {
    this.geometria = [];
    this.guardarGeometrias();
  }

  private async guardarGeometrias() {
    await Preferences.set({
      key: this.PREFERENCES_KEY,
      value: JSON.stringify(this.geometria),
    });
  }

  private async cargarGeometrias() {
    let geometriasAlmacenadas = await Preferences.get({ key: this.PREFERENCES_KEY });
    this.geometria = geometriasAlmacenadas && geometriasAlmacenadas.value
      ? JSON.parse(geometriasAlmacenadas.value) : [];
  }
}


