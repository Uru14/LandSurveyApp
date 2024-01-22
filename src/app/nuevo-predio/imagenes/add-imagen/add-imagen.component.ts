import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {Router, RouterLink} from "@angular/router";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {PredioService} from "../../../services/PredioService";
import {Imagen, LC_FuenteAdministrativaTipo} from "../../../models/imagen.model";
import {ImagenService} from "../../../services/ImagenService";
import {MatButtonModule} from "@angular/material/button";

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
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './add-imagen.component.html',
  styleUrl: './add-imagen.component.css'
})
export class AddImagenComponent {
  tipo_doc: LC_FuenteAdministrativaTipo;
  array_tipo_doc = Object.values(LC_FuenteAdministrativaTipo);
  notas = '';
  num_pag = 0;
  imagen?: Imagen;
  imagenCapturada: string | undefined = '';
  predioActual = this.predioService.obtenerPredioActual();
  constructor(private imagenService: ImagenService, private predioService: PredioService, private router: Router) {
    this.tipo_doc = LC_FuenteAdministrativaTipo.Imagen_propietario;
    this.notas = '';
    this.num_pag = 0;
  }

  takePhoto() {
    this.imagenService.addNewToGallery().then((capturedPhoto) => {
      // Update the captured photo in your component
      this.imagenCapturada = capturedPhoto.webPath;
    });
  }

  guardarImagen() {
    let nuevaImagen: Imagen = {
      tipo_doc: this.tipo_doc,
      num_pag: this.num_pag,
      notas: this.notas,
      imageData: this.imagenCapturada || ''
    };

    this.imagenService.addImagen(nuevaImagen);

    this.predioActual.imagenes.push(nuevaImagen);

    console.log(this.predioActual)

    this.tipo_doc = LC_FuenteAdministrativaTipo.Imagen_propietario;
    this.notas = '';
    this.num_pag = 0;
    this.imagenCapturada = '';
    this.router.navigate(['/nuevo-predio/', this.predioActual.id, 'imagenes']);
  }
}

