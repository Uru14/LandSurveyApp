import { Component } from '@angular/core';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent {
  prediosMedidos = 0;
  mostrarNuevoPredio = false; // Variable para controlar si se muestra o no la pantalla de añadir nuevo predio

  mostrarPantallaNuevoPredio() {
    this.mostrarNuevoPredio = true;
  }
}
