import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {PropietarioService} from "../../services/PropietarioService";
import {Propietario} from "../../models/propietario.model";

@Component({
  selector: 'app-datos-propietario',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './datos-propietario.component.html',
  styleUrl: './datos-propietario.component.css'
})
export class DatosPropietarioComponent {

  propietarios: Propietario[];
  constructor(private propietarioService: PropietarioService) {
    this.propietarios = this.propietarioService.getPropietarios();
  }


}
