import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {DocTypeEnum, Documento} from "../../../models/documento.model";
import {DocumentoService} from "../../../services/DocumentoService";
import {PredioService} from "../../../services/PredioService";
import {ImagenService} from "../../../services/ImagenService";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-editar-documento',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './editar-documento.component.html',
  styleUrl: './editar-documento.component.css'
})
export class EditarDocumentoComponent {
  array_tipo_doc = Object.values(DocTypeEnum);
  notas = '';
  tipo_doc = DocTypeEnum.DNI;
  documento: Documento = {
    id: 0,
    tipo_doc: DocTypeEnum.DNI,
    notas: '',
    imagenes: [] || [],
    pdfs: [] || []
  };
  predioActual = this.predioService.obtenerPredioActual();
  documentoIndex = -1;

  constructor(private documentoService: DocumentoService, private snackBar: MatSnackBar, private route: ActivatedRoute, private predioService: PredioService, private router: Router, private imagenService: ImagenService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let indexParam = params.get('i');
      if (indexParam) {
        this.documentoIndex = parseInt(indexParam, 10);
        let docEncontrado = this.predioActual.documentos[this.documentoIndex];
        if (docEncontrado) {
          this.documento = {...docEncontrado};
          this.documento.imagenes = this.documento.imagenes || [];
          this.documento.pdfs = this.documento.pdfs || [];
        }
      }
    });
  }

  onImagenesSelected(event: any) {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files).filter(file => file instanceof File) as File[];
      const urlArray = fileArray.map(file => URL.createObjectURL(file));
      this.documento.imagenes.push(...urlArray);
    }
  }


  onPDFsSelected(event: any) {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files).filter(file => file instanceof File) as File[];
      this.documento.pdfs.push(...fileArray);
    }
  }

  guardarDocumento() {
    if (this.documentoIndex !== -1) {
      this.documento.id = this.predioActual.documentos[this.documentoIndex].id;
      this.predioActual.documentos[this.documentoIndex] = this.documento;
      this.documentoService.actualizarDocumento(this.documentoIndex, this.documento);

      this.snackBar.open('Documento actualizado con éxito', 'Cerrar', { duration: 3000 });

      this.router.navigate(['/nuevo-predio/', this.predioActual.id, 'documentos']);
    } else {
      this.snackBar.open('Error al actualizar el documento', 'Cerrar', { duration: 3000 });
    }
  }

  eliminarImagen(index: number): void {
    if (index >= 0 && index < this.documento.imagenes.length) {
      this.documento.imagenes.splice(index, 1);
      this.snackBar.open('Imagen eliminada con éxito', 'Cerrar', { duration: 3000 });
    }
  }

  eliminarPDF(index: number): void {
    if (index >= 0 && index < this.documento.pdfs.length) {
      this.documento.pdfs.splice(index, 1);
      this.snackBar.open('PDF eliminado con éxito', 'Cerrar', { duration: 3000 });
    }
  }

}
