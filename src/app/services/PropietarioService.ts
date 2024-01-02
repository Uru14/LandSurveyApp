import { Injectable } from '@angular/core';
import { Propietario } from '../models/propietario.model';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class PropietarioService {
  private propietarios: Propietario[] = [];
  private readonly STORAGE_KEY = 'propietarios';
  constructor() {
    this.cargarPropietarios();
  }
  async addPropietario(propietario: Propietario) {
    this.propietarios.push(propietario);
    await this.guardarPropietarios();
  }

  async eliminarPropietario(dni: string) {
    this.propietarios = this.propietarios.filter((propietario) => propietario.dni !== dni);
    await this.guardarPropietarios();
  }
  getPropietarios(): Propietario[] {
    return this.propietarios;
  }


  getPropietarioPorDni(dni: string): Propietario | undefined {
    return this.propietarios.find(propietario => propietario.dni === dni);
  }

  async actualizarPropietario(propietario: Propietario) {
    let index = this.propietarios.findIndex((p) => p.dni === propietario.dni);

    if (index !== -1) {
      this.propietarios[index] = propietario;
      await this.guardarPropietarios();
    }
  }

  private async cargarPropietarios() {
    let propietariosAlmacenados = await Storage.get({ key: this.STORAGE_KEY });
    this.propietarios = propietariosAlmacenados && propietariosAlmacenados.value
      ? JSON.parse(propietariosAlmacenados.value) : [];
  }
  private async guardarPropietarios() {
    await Storage.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(this.propietarios),
    });
  }

  dniExists(dni: string): boolean {
    return this.propietarios.some(propietario => propietario.dni === dni);
  }
}
