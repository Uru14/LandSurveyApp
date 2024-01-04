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
    RouterLink
  ],
  templateUrl: './editar-documento.component.html',
  styleUrl: './editar-documento.component.css'
})
export class EditarDocumentoComponent {
  array_tipo_doc = Object.values(DocTypeEnum);
  notas = '';
  tipo_doc = DocTypeEnum.DNI;
  documento: Documento = {
    tipo_doc: DocTypeEnum.DNI,
    notas: ''
  };
  predioActual = this.predioService.obtenerPredioActual();
  documentoIndex = -1;

  constructor(private documentoService: DocumentoService, private route: ActivatedRoute, private predioService: PredioService, private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let indexParam = params.get('i');

      if (indexParam) {
        // Parsea el índice de la cadena a un número
        this.documentoIndex = parseInt(indexParam, 10);

        // Busca el documento por su índice
        let docEncontrado = this.predioActual.documentos[this.documentoIndex];

        // Si encuentra el documento, carga sus propiedades en el formulario
        if (docEncontrado) {
          this.documento = docEncontrado;
        }
      }
    });
  }

  guardarDocumento() {
    let index = this.documentoIndex;

    if (index !== -1) {
      const documentoActualizado = this.documento

      this.predioActual.documentos[index] = documentoActualizado;
      this.documentoService.actualizarDocumento(index, documentoActualizado);

      this.router.navigate(['/nuevo-predio/', this.predioActual.id, 'documentos']);
      console.log(this.predioActual)
    } else {
      console.error('No se pudo encontrar el documento actual en la lista de documentos.');
    }
  }
}
