import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import {Documento} from "../models/documento.model";
@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  private readonly PREFERENCES_KEY = 'listaDocumentos';
  private documentos: Documento[] = [];

  private async cargarListaDocumentosDesdeStorage() {
    const listaDocumentosGuardada = await Preferences.get({ key: this.PREFERENCES_KEY });

    if (listaDocumentosGuardada && listaDocumentosGuardada.value) {
      this.documentos = JSON.parse(listaDocumentosGuardada.value);
    }
  }

  actualizarDocumento(index: number, documento: Documento) {
    this.documentos[index] = documento;
    this.guardarListaDocumentosEnStorage();
  }
  private async guardarListaDocumentosEnStorage() {
    await Preferences.set({
      key: this.PREFERENCES_KEY,
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
