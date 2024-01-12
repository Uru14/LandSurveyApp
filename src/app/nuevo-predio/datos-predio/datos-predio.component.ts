import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {DatosPredio, LC_PredioTipo, SectorPredio} from "../../models/datosPredio.model";
import {DatosPredioService} from "../../services/DatosPredioService";
import {PredioService} from "../../services/PredioService";
import {MatSelectModule} from "@angular/material/select";
import {DataService} from "../../services/DataService";
import {Departamento, Municipio} from "../../models/propietario.model";

@Component({
  selector: 'app-datos-predio',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    RouterLink,
    MatSelectModule
  ],
  templateUrl: './datos-predio.component.html',
  styleUrl: './datos-predio.component.css'
})
export class DatosPredioComponent {
  array_LC_PredioTipo = Object.values(LC_PredioTipo);
  nombre: string = '';
  sectorPredio: SectorPredio = SectorPredio.Norte;
  departamentos: Departamento[] = [];
  municipios: Municipio[]  = [];
  municipiosFiltrados: Municipio[] = [];
  departamentoSeleccionado: string = '';
  municipioSeleccionado: string = '';
  vereda: string = '';
  numeroPredial: string = '';
  tipo: LC_PredioTipo = LC_PredioTipo.Baldio;
  complemento: string = '';

  constructor(private datosPredioService: DatosPredioService, private dataService: DataService, private predioService: PredioService, private route: ActivatedRoute) {}

  ngOnInit() {
    Promise.all([
      this.cargarDepartamentosYMunicipios()
    ]).then(() => {
      this.cargarDatosDelPredio();
    });
  }

  cargarDepartamentosYMunicipios(): Promise<void> {
    const departamentosPromise = this.dataService.getDepartamentos().toPromise().then(data => {
      this.departamentos = data || [];
    });

    const municipiosPromise = this.dataService.getMunicipios().toPromise().then(data => {
      this.municipios = data || [];
    });

    return Promise.all([departamentosPromise, municipiosPromise]).then(() => {});
  }

  cargarDatosDelPredio() {
    const idPredio = this.route.snapshot.params['id'];
    if (idPredio) {
      const predioActual = this.predioService.obtenerPredioActual();
      if (predioActual && predioActual.datosPredio) {
        this.inicializarFormularioConDatos(predioActual.datosPredio);
      }
    }
  }

  inicializarFormularioConDatos(datosPredio: DatosPredio) {
    this.nombre = datosPredio.nombre;
    this.departamentoSeleccionado = datosPredio.departamento;
    this.sectorPredio = datosPredio.sectorPredio;
    this.municipioSeleccionado = datosPredio.municipio;
    this.vereda = datosPredio.vereda;
    this.numeroPredial = datosPredio.numeroPredial;
    this.tipo = datosPredio.tipo;
    this.complemento = datosPredio.complemento;

    this.onDepartamentoChange();
  }
  onDepartamentoChange() {
    this.municipiosFiltrados = this.municipios.filter(
      m => m.departamento === this.departamentoSeleccionado
    );

    this.municipioSeleccionado = '';
  }
  guardarDatos() {
    const datosPredio = new DatosPredio(
      this.nombre,
      this.departamentoSeleccionado,
      this.sectorPredio,
      this.municipioSeleccionado,
      this.vereda,
      this.numeroPredial,
      this.tipo,
      this.complemento
    );
    let predioActual = this.predioService.obtenerPredioActual();
    console.log(predioActual);
    predioActual.datosPredio = datosPredio;

    //this.predioService.guardarPredioActual(predioActual);

    this.datosPredioService.addDatosPredio(datosPredio);
    console.log(this.datosPredioService.getDatosPredio());
    console.log(predioActual);
  }




}
