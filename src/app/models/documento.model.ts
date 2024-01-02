import {TipoDocumento} from "./imagen.model";
export enum DocTypeEnum {
  DNI = 'DNI',
  Escritura = 'Escritura',
  Declaracion = 'Declaración',
}
export class Documento {
  tipo_doc: TipoDocumento
  notas: string

  constructor(tipo_doc: TipoDocumento, notas: string) {
    this.tipo_doc = tipo_doc
    this.notas = notas
  }
}
