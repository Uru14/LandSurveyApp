export enum TipoDocumento {
  DNI = "DNI",
  Escritura = "Escritura",
  Declaracion = "Declaración"

}
export class Imagen {
  tipo_doc : TipoDocumento
  num_pag: number
  notas: string
  imageData: string //base64 de la imagen

  constructor(tipo_doc: TipoDocumento, num_pag: number, notas: string, imageData: string) {
    this.tipo_doc = tipo_doc
    this.num_pag = num_pag
    this.notas = notas
    this.imageData = imageData
  }
}
