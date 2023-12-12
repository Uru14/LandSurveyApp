import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {Estado, Propietario} from "../../../models/propietario.model";
import {MatRadioModule} from "@angular/material/radio";
import {PropietarioService} from "../../../services/PropietarioService";

@Component({
  selector: 'app-add-propietario',
  standalone: true,
  imports: [
    RouterLink,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  templateUrl: './add-propietario.component.html',
  styleUrl: './add-propietario.component.css'
})
export class AddPropietarioComponent {
  nombre: string;
  apellidos: string;
  dni: string;
  porcentajePropiedad: number;
  estado: Estado;
  notas: string;
  propietario?: Propietario;
  constructor(private propietarioService: PropietarioService, private router: Router) {
    this.nombre = '';
    this.apellidos = '';
    this.dni = '';
    this.porcentajePropiedad = 0;
    this.estado = Estado.Casado;
    this.notas = '';
  }

  guardarPropietario() {
    this.propietario = new Propietario(
      this.nombre,
      this.apellidos,
      this.dni,
      this.notas,
      this.porcentajePropiedad,
      this.estado
    )
    if (!this.propietarioService.dniExists(this.propietario.dni)) {
    this.propietarioService.addPropietario(this.propietario)
    this.router.navigate(['/nuevo-predio/datos-propietario'])
    } else {
      alert('DNI DUPLICADO')}
  }

  eliminarPropietario() {
    if (this.propietario) {
      this.propietarioService.eliminarPropietario(this.propietario.dni);
      this.router.navigate(['/nuevo-predio/datos-propietario'])
    }
  }
}
