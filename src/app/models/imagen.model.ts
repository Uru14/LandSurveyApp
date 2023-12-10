export enum TipoDocumento {
  Dni = "DNI",
  Escritura = "Escritura",
  Declaracion = "Declaración"

}
export class Imagen {
  tipo_documento : TipoDocumento
  num_pag: number
  notas: string
  imageData: string //base64 de la imagen

  constructor(tipo_documento: TipoDocumento, num_pag: number, notas: string, imageData: string) {
    this.tipo_documento = tipo_documento
    this.num_pag = num_pag
    this.notas = notas
    this.imageData = imageData
  }
}
