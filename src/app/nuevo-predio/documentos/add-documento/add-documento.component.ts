import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {Router, RouterLink} from "@angular/router";
import {MatSelectModule} from "@angular/material/select";
import {DocTypeEnum, Documento} from "../../../models/documento.model";
import {DocumentoService} from "../../../services/DocumentoService";
import {PredioService} from "../../../services/PredioService";

@Component({
  selector: 'app-add-documento',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    RouterLink,
    MatSelectModule
  ],
  templateUrl: './add-documento.component.html',
  styleUrl: './add-documento.component.css'
})
export class AddDocumentoComponent {
  tipo_doc: DocTypeEnum;
  array_tipo_doc = Object.values(DocTypeEnum);
  notas = '';
  documento?: Documento;
  predioActual = this.predioService.obtenerPredioActual();
  constructor(private documentoService: DocumentoService, private predioService: PredioService, private router: Router) {
    this.tipo_doc = DocTypeEnum.Declaracion;
    this.notas = '';
  }

  guardarDocumento() {
    console.log(this.documentoService.getDocumentos());

    this.documento = new Documento(
      this.tipo_doc,
      this.notas
    )
    this.documentoService.addDocumento(this.documento);
    this.predioActual.documentos.push(this.documento);

    this.router.navigate(['/nuevo-predio/' , this.predioActual.id, 'documentos'])
    console.log(this.predioActual);
  }
}
