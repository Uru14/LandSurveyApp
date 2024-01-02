import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PredioService} from "../../services/PredioService";

@Component({
  selector: 'app-editar-datos-predio',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './editar-datos-predio.component.html',
  styleUrl: './editar-datos-predio.component.css'
})
export class EditarDatosPredioComponent {

  constructor(private predioService: PredioService, private router: Router, private route: ActivatedRoute) {


  }

  editarDatosPropietario() {
    // Obtiene el ID del predio desde los parámetros de la ruta
    let predioId = +this.route.snapshot.params['id'];

    this.router.navigate(['/nuevo-predio/', predioId, 'datos-propietario'])
  }
  editarDatosPredio() {

    let predioId = +this.route.snapshot.params['id'];

    this.router.navigate(['/nuevo-predio/', predioId, 'datos-predio'])
  }
  guardarPredio() {

    let predioActual = this.predioService.obtenerPredioActual();

    this.predioService.guardarPredioActual(predioActual);

    console.log(predioActual)

  }
}
