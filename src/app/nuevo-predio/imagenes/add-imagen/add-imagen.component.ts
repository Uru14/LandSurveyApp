import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {Router, RouterLink} from "@angular/router";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {PredioService} from "../../../services/PredioService";
import {Imagen, TipoDocumento} from "../../../models/imagen.model";
import {ImagenService} from "../../../services/ImagenService";

@Component({
  selector: 'app-add-imagen',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    RouterLink,
    MatOptionModule,
    MatSelectModule
  ],
  templateUrl: './add-imagen.component.html',
  styleUrl: './add-imagen.component.css'
})
export class AddImagenComponent {
  tipo_doc: TipoDocumento;
  array_tipo_doc = Object.values(TipoDocumento);
  notas = '';
  num_pag = 0;
  imagen?: Imagen;
  predioActual = this.predioService.obtenerPredioActual();
  constructor(private imagenService: ImagenService, private predioService: PredioService, private router: Router) {
    this.tipo_doc = TipoDocumento.Declaracion;
    this.notas = '';
    this.num_pag = 0;
  }
}
