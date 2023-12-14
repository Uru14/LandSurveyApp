export class DatosPredio {
  cedula: string | null;
  municipio: string | null;
  vereda: string | null;
  acceso: string | null;
  cultivable: boolean | null;

  constructor(cedula: string, municipio: string, vereda: string, acceso: string, cultivable: boolean) {
    this.cedula = cedula;
    this.municipio = municipio;
    this.vereda = vereda;
    this.acceso = acceso;
    this.cultivable = cultivable;
  }
}
