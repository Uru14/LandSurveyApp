import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {RouterLink} from "@angular/router";
import {DatosPredio} from "../../models/datosPredio.model";
import {DatosPredioService} from "../../services/DatosPredioService";

@Component({
  selector: 'app-datos-predio',
  standalone: true,
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        RouterLink
    ],
  templateUrl: './datos-predio.component.html',
  styleUrl: './datos-predio.component.css'
})
export class DatosPredioComponent {
  cedula: string;
  municipio: string;
  vereda: string;
  acceso: string;
  cultivable: boolean;
  datosPredio?: DatosPredio;

  constructor(private datosPredioService: DatosPredioService) {
    this.cedula = "";
    this.municipio = "";
    this.vereda = "";
    this.acceso = "";
    this.cultivable = false;
  }

  guardarDatos() {
    this.datosPredio = new DatosPredio(
      this.cedula,
      this.municipio,
      this.vereda,
      this.acceso,
      this.cultivable
    )
    this.datosPredioService.addDatosPredio(this.datosPredio)
    console.log(this.datosPredioService.getDatosPredio());
  }




}
