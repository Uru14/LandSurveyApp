import { Injectable } from '@angular/core';
import { Propietario } from '../models/propietario.model';

@Injectable({
  providedIn: 'root',
})
export class PropietarioService {
  private propietarios: Propietario[] = [];

  constructor() {
    let propietariosAlmacenados = localStorage.getItem('propietarios');
    this.propietarios = propietariosAlmacenados ? JSON.parse(propietariosAlmacenados) : [];
  }
  addPropietario(propietario: Propietario) {
    this.propietarios.push(propietario);
    this.guardarPropietarios();
  }

  eliminarPropietario(dni: string) {
    this.propietarios = this.propietarios.filter(propietario => propietario.dni !== dni);
    this.guardarPropietarios();
  }
  getPropietarios(): Propietario[] {
    return this.propietarios;
  }


  getPropietarioPorDni(dni: string): Propietario | undefined {
    return this.propietarios.find(propietario => propietario.dni === dni);
  }

  actualizarPropietario(propietario: Propietario) {
    let index = this.propietarios.findIndex(p => p.dni === propietario.dni);

    if (index !== -1) {
      this.propietarios[index] = propietario;
      this.guardarPropietarios();
    }
  }
  guardarPropietarios() {
    localStorage.setItem('propietarios', JSON.stringify(this.propietarios));
  }

  dniExists(dni: string): boolean {
    return this.propietarios.some(propietario => propietario.dni === dni);
  }
}
