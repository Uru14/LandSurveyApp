import {Component, OnInit} from '@angular/core';
import {RouterLink, Router, ActivatedRoute} from "@angular/router";
import {PropietarioService} from "../../services/PropietarioService";
import {Propietario} from "../../models/propietario.model";
import {PredioService} from "../../services/PredioService";
import {Predio} from "../../models/predio.model";

@Component({
  selector: 'app-datos-propietario',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './datos-propietario.component.html',
  styleUrl: './datos-propietario.component.css'
})
export class DatosPropietarioComponent{

  propietarios: Propietario[];
  predioActual: Predio;
  constructor(private propietarioService: PropietarioService, private router: Router, private predioService: PredioService, private route: ActivatedRoute,) {
    this.predioActual = this.predioService.obtenerPredioActual();
    this.propietarios = this.predioActual.propietarios;
  }

  editarPropietario(documentoIdentidad: string) {
    this.router.navigate(['/nuevo-predio/', this.predioActual.id, 'datos-propietario', 'editar-propietario', documentoIdentidad])
  }

}
