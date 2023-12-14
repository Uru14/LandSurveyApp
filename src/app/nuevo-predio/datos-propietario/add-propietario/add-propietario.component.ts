import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {Estado, Propietario} from "../../../models/propietario.model";
import {MatRadioModule} from "@angular/material/radio";
import {PropietarioService} from "../../../services/PropietarioService";
import {PredioService} from "../../../services/PredioService";

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
  constructor(private propietarioService: PropietarioService, private router: Router, private predioService: PredioService) {
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
      let predioActual = this.predioService.obtenerPredioActual();
      // Añade el propietario al predio actual
      if (!predioActual.propietarios) {
        predioActual.propietarios = [];
      }
      predioActual.propietarios.push(this.propietario);

      // Guarda el predio actual con el nuevo propietario
      //this.predioService.guardarPredioActual(predioActual);

      // Añade el propietario al servicio PropietarioService
      this.propietarioService.addPropietario(this.propietario);

      this.router.navigate(['/nuevo-predio/datos-propietario'])
      console.log(predioActual);
    } else {
      alert('DNI DUPLICADO')}
  }

  eliminarPropietario() {
    if (this.propietario) {
      this.propietarioService.eliminarPropietario(this.propietario.dni);

      // obtiene el predio actual y actualiza los propietarios
      let predioActual = this.predioService.obtenerPredioActual();
      predioActual.propietarios = this.propietarioService.getPropietarios();
      //this.predioService.guardarPredioActual(predioActual);

      this.router.navigate(['/nuevo-predio/datos-propietario'])
      console.log(predioActual);
    }
  }
}
