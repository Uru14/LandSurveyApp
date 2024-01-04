import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import {Documento} from "../models/documento.model";
@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  private readonly STORAGE_KEY = 'listaDocumentos';
  private documentos: Documento[] = [];

  private async cargarListaDocumentosDesdeStorage() {
    const listaDocumentosGuardada = await Storage.get({ key: this.STORAGE_KEY });

    if (listaDocumentosGuardada && listaDocumentosGuardada.value) {
      this.documentos = JSON.parse(listaDocumentosGuardada.value);
    }
  }

  actualizarDocumento(index: number, documento: Documento) {
    this.documentos[index] = documento;
    this.guardarListaDocumentosEnStorage();
  }
  private async guardarListaDocumentosEnStorage() {
    await Storage.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(this.documentos),
    });
  }
  addDocumento(documento: Documento) {
    this.documentos.push(documento);
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
