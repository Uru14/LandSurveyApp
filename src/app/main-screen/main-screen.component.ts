import {Component, signal} from '@angular/core';
import {PredioService} from "../services/PredioService";

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent {
  prediosMedidos = 0;

  constructor(private predioService: PredioService) {}

  nuevoPredio() {
    this.predioService.nuevoPredio();
  }
  ngOnInit() {
    this.prediosMedidos = this.predioService.getListaPredios().length;

  }

  borrarTodo() {
    localStorage.clear();

  }
}
