export enum LC_PredioTipo {
  Baldio = "Baldio",
  Fiscal_Patrimonial = "Fiscal_Patrimonial",
  Uso_Publico = "Uso_Publico",
  Publico = "Publico",
  Privado = "Privado"
}

export enum SectorPredio {
  Norte = "Norte",
  Sur = "Sur",
  Este = "Este",
  Oeste = "Oeste"
}

export class DatosPredio {
  nombre: string;
  departamento: string;
  sectorPredio: SectorPredio;
  municipio: string;
  vereda: string;
  numeroPredial: string;
  tipo: LC_PredioTipo;
  complemento: string;

  constructor(nombre: string, departamento: string, sectorPredio: SectorPredio, municipio: string, vereda: string, numeroPredial: string, tipo: LC_PredioTipo, complemento: string) {
    this.nombre = nombre;
    this.departamento = departamento;
    this.sectorPredio = sectorPredio;
    this.municipio = municipio;
    this.vereda = vereda;
    this.numeroPredial = numeroPredial;
    this.tipo = tipo;
    this.complemento = complemento;
  }
}
