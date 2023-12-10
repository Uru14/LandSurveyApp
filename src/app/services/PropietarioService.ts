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


  guardarPropietarios() {
    localStorage.setItem('propietarios', JSON.stringify(this.propietarios));
  }
}
