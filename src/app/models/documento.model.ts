export enum DocTypeEnum {
  DNI = 'DNI',
  Escritura = 'Escritura',
  Declaracion = 'Declaración',
}
export class Documento {
  tipo_doc: DocTypeEnum;
  notas: string;
  imagenes: string[];
  pdfs: File[];

  constructor(tipo_doc: DocTypeEnum, notas: string, imagenes: string[], pdfs: File[]) {
    this.tipo_doc = tipo_doc;
    this.notas = notas;
    this.imagenes = imagenes;
    this.pdfs = pdfs || [];
  }
}

