import { Propietario } from './propietario.model';
import { DatosPredio } from './datosPredio.model';
import { Imagen } from './imagen.model';
import { Documento } from './documento.model';
import { Coordenadas } from './geometria.model';

export class Predio {
  propietarios?: Propietario[];
  datosPredio?: DatosPredio;
  imagenes?: Imagen[];
  documentos?: Documento[];
  geometrias?: Coordenadas[];

  constructor(propietarios: Propietario[], datosPredio: DatosPredio, imagenes: Imagen[], documentos: Documento[], geometrias: Coordenadas[]) {
    this.propietarios = propietarios;
    this.datosPredio = datosPredio;
    this.imagenes = imagenes;
    this.documentos = documentos;
    this.geometrias = geometrias;
  }
}
