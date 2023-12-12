
export enum Estado {
  Casado = 'Casado',
  Soltero = "Soltero"
}
export class Propietario {
  nombre: string
  apellidos: string
  dni: string
  notas: string
  porcentaje_propiedad: number
  estado: Estado

  constructor(nombre: string, apellidos: string, dni: string, notas: string, porcentaje_propiedad: number, estado: Estado) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.dni = dni;
    this.notas = notas;
    this.porcentaje_propiedad = porcentaje_propiedad;
    this.estado = estado;
  }
}
