export class DatosPredio {
  cedula: string;
  municipio: string;
  vereda: string;
  acceso: string;
  cultivable: boolean;

  constructor(cedula: string, municipio: string, vereda: string, acceso: string, cultivable: boolean) {
    this.cedula = cedula;
    this.municipio = municipio;
    this.vereda = vereda;
    this.acceso = acceso;
    this.cultivable = cultivable;
  }
}
