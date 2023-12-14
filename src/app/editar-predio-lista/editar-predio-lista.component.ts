import { Component } from '@angular/core';
import {Predio} from "../models/predio.model";
import {PredioService} from "../services/PredioService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-editar-predio-lista',
  standalone: true,
  imports: [],
  templateUrl: './editar-predio-lista.component.html',
  styleUrl: './editar-predio-lista.component.css'
})
export class EditarPredioListaComponent {
  predios: Predio[] = [];

  constructor(private predioService: PredioService, private router: Router) {}

  ngOnInit() {
    // Obtener la lista de predios disponibles
    this.predios = this.predioService.getListaPredios();
  }

  editarPredio(id: number) {
    // Redirigir a la pantalla de edición del predio con el ID proporcionado
    this.router.navigate(['/editar-predio', id]);
  }
}
