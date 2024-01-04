export enum DocTypeEnum {
  DNI = 'DNI',
  Escritura = 'Escritura',
  Declaracion = 'Declaración',
}
export class Documento {
  tipo_doc: DocTypeEnum
  notas: string

  constructor(tipo_doc: DocTypeEnum, notas: string) {
    this.tipo_doc = tipo_doc
    this.notas = notas
  }
}
