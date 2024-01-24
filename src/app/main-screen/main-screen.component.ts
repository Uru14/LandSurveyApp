import {Component, signal} from '@angular/core';
import {PredioService} from "../services/PredioService";
import {Router} from "@angular/router";
import {ApiService} from "../services/ApiService";
import {Preferences} from "@capacitor/preferences";
import { MatSnackBar } from '@angular/material/snack-bar';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent {
  prediosMedidos = 0;

  constructor(private predioService: PredioService, private router: Router, private apiService: ApiService,private snackBar: MatSnackBar) {}

  nuevoPredio() {
    this.predioService.nuevoPredio();

    let predioActual = this.predioService.obtenerPredioActual();
    predioActual.id = this.predioService.getListaPredios().length +1

    this.router.navigate(['/nuevo-predio', predioActual.id])
    console.log(predioActual)
  }
  ngOnInit() {
    this.prediosMedidos = this.predioService.getListaPredios().length;

  }

  borrarTodo() {
    Preferences.clear().then(() => {
      this.snackBar.open('Todas las preferencias han sido borradas', 'Cerrar', { duration: 3000 });
    }).catch(error => {
      console.error('Error al borrar las preferencias:', error);
      this.snackBar.open('Error al borrar las preferencias: ' + error, 'Cerrar', { duration: 3000 });
    });
    window.location.reload();
  }

  async enviarAlServidor() {
    try {
      const respuesta = await this.apiService.enviarDatosAPI();
      this.snackBar.open('Datos enviados con éxito al servidor', 'Cerrar', { duration: 3000 });
    } catch (error) {
      let mensajeError: string;

      if (error instanceof HttpErrorResponse) {
        mensajeError = `Error ${error.status}: ${error.statusText}`;
      } else if (error instanceof Error) {
        mensajeError = error.message;
      } else {
        mensajeError = 'Error desconocido al enviar datos al servidor';
      }

      this.snackBar.open(mensajeError, 'Cerrar', { duration: 5000 });
    }
  }
}
