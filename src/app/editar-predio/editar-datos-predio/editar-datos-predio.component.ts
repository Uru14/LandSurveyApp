import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PredioService} from "../../services/PredioService";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-editar-datos-predio',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './editar-datos-predio.component.html',
  styleUrl: './editar-datos-predio.component.css'
})
export class EditarDatosPredioComponent {
  titulo: string =  "Editar Predio ";
  predioActual = this.predioService.obtenerPredioActual();
  constructor(private predioService: PredioService, private router: Router, private route: ActivatedRoute) {


  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const predioId = +params['id'];
      this.cargarPredio(predioId);
    });
  }

  private cargarPredio(predioId: number) {
    const predioSeleccionado = this.predioService.getListaPredios().find(predio => predio.id === predioId);
    if (predioSeleccionado) {
      this.predioActual = predioSeleccionado;
      this.titulo += this.predioActual.id;
    } else {
      console.error('Predio no encontrado con ID:', predioId);
      // Manejar el caso de que el predio no se encuentre
    }
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

    this.predioService.guardarPredioActual(this.predioActual);

    console.log(this.predioActual)

  }
}
