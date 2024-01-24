import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PredioService} from "../../services/PredioService";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  predioActualId?: number;
  constructor(private predioService: PredioService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {


  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const predioId = +params['id'];
      this.predioActualId = predioId; // Guarda el ID del predio actual
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
    }
  }
  editarDatosPropietario() {

    if (this.predioActualId != null) {
      this.router.navigate(['/nuevo-predio/', this.predioActualId, 'datos-propietario']);
    } else {
      console.error('ID del predio no está definido');
    }
  }
  editarDatosPredio() {

    if (this.predioActualId != null) {
      this.router.navigate(['/nuevo-predio/', this.predioActualId, 'datos-predio']);
    } else {
      console.error('ID del predio no está definido');
    }
  }
  guardarPredio() {
    this.predioService.guardarPredioActual(this.predioActual);
    this.snackBar.open('Predio guardado correctamente', 'Cerrar', {
      duration: 3000
    });
  }
}
