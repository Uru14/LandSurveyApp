import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import {Documento} from "../models/documento.model";
import {TipoDocumento} from "../models/imagen.model";

@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  private documentos: Documento[] = [];


  addDocumento(tipoDocumento: TipoDocumento, notas: string) {
    const nuevoDocumento: Documento = { tipo_doc: tipoDocumento, notas: notas };
    this.documentos.push(nuevoDocumento);
  }


  getDocumentos(): Documento[] {
    return this.documentos;
  }


  eliminarDocumento(index: number) {
    if (index >= 0 && index < this.documentos.length) {
      this.documentos.splice(index, 1);
    }
  }
}
