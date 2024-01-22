import {Component, signal} from '@angular/core';
import {PredioService} from "../services/PredioService";
import {Router} from "@angular/router";
import {ApiService} from "../services/ApiService";

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent {
  prediosMedidos = 0;

  constructor(private predioService: PredioService, private router: Router, private apiService: ApiService) {}

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
    localStorage.clear();

  }

  async enviarAlServidor() {
    try {
      const respuesta = await this.apiService.enviarDatosAPI();
      console.log('Datos enviados con éxito', respuesta);
      // Aquí puedes manejar la respuesta del servidor
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
      // Aquí puedes manejar el error
    }
  }
}
