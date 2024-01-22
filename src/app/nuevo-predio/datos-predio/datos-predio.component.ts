import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {DatosPredio, LC_PredioTipo, SectorPredio} from "../../models/datosPredio.model";
import {DatosPredioService} from "../../services/DatosPredioService";
import {PredioService} from "../../services/PredioService";
import {MatSelectModule} from "@angular/material/select";
import {DataService} from "../../services/DataService";
import {Departamento, Municipio, Provincia} from "../../models/propietario.model";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-datos-predio',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    RouterLink,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './datos-predio.component.html',
  styleUrl: './datos-predio.component.css'
})
export class DatosPredioComponent {
  datosPredioForm: FormGroup;
  array_LC_PredioTipo = Object.values(LC_PredioTipo);
  nombre: string = '';
  sectorPredio: SectorPredio = SectorPredio.Norte;
  departamentos: Departamento[] = [];
  provincias: Provincia[] = [];
  municipios: Municipio[]  = [];
  municipiosFiltrados: Municipio[] = [];
  provinciasFiltradas: Provincia[] = [];
  departamentoSeleccionado: string = '';
  provinciaSeleccionada: string = '';
  municipioSeleccionado: string = '';
  vereda: string = '';
  numeroPredial: string = '';
  tipo: LC_PredioTipo = LC_PredioTipo.Baldio;
  complemento: string = '';
  titulo: string =  "Datos del Predio ";
  predioActual = this.predioService.obtenerPredioActual();

  constructor(private datosPredioService: DatosPredioService, private router: Router, private dataService: DataService, private predioService: PredioService, private route: ActivatedRoute) {
    this.datosPredioForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      sectorPredio: new FormControl(''),
      departamentoSeleccionado: new FormControl('', Validators.required),
      provinciaSeleccionada: new FormControl('', Validators.required),
      municipioSeleccionado: new FormControl('', Validators.required),
      vereda: new FormControl('', Validators.required),
      numeroPredial: new FormControl(''),
      tipo: new FormControl('', Validators.required),
      complemento: new FormControl('') // Opcional, sin validadores
    });
  }


  ngOnInit() {
    Promise.all([
      this.cargarDepartamentosYMunicipios()
    ]).then(() => {
      this.cargarDatosDelPredio();
    });
    this.titulo += this.predioActual.id;

  }

  cargarDepartamentosYMunicipios(): Promise<void> {
    const departamentosPromise = this.dataService.getDepartamentos().toPromise().then(data => {
      this.departamentos = data || [];
    });

    const municipiosPromise = this.dataService.getMunicipios().toPromise().then(data => {
      this.municipios = data || [];
    });

    const provinciasPromise = this.dataService.getProvincias().toPromise().then(data => {
      this.provincias = data || [];
    });

    return Promise.all([departamentosPromise, municipiosPromise, provinciasPromise]).then(() => {});
    console.log(departamentosPromise, municipiosPromise, provinciasPromise);
  }

  cargarDatosDelPredio() {
    const idPredio = this.route.snapshot.params['id'];
    if (idPredio) {
      this.predioActual = this.predioService.obtenerPredioActual();
      if (this.predioActual && this.predioActual.datosPredio) {
        this.inicializarFormularioConDatos(this.predioActual.datosPredio);
      }
    }
    this.onDepartamentoChange();
  }

  inicializarFormularioConDatos(datosPredio: DatosPredio) {
    this.datosPredioForm.patchValue({
      nombre: datosPredio.nombre,
      sectorPredio: datosPredio.sectorPredio,
      departamentoSeleccionado: datosPredio.departamento,
      provinciaSeleccionada: datosPredio.provincia,
      municipioSeleccionado: datosPredio.municipio,
      vereda: datosPredio.vereda,
      numeroPredial: datosPredio.numeroPredial,
      tipo: datosPredio.tipo,
      complemento: datosPredio.complemento
    });

    this.onDepartamentoChange();
  }
  onDepartamentoChange() {
    const deptoSeleccionado = this.datosPredioForm.get('departamentoSeleccionado')?.value;
    this.municipiosFiltrados = this.municipios.filter(m => m.departamento === deptoSeleccionado);

    // Restablecer el municipio seleccionado si no está en los municipios filtrados
    if (!this.municipiosFiltrados.some(m => m.nombre_municipio === this.municipioSeleccionado)) {
      this.datosPredioForm.get('municipioSeleccionado')?.setValue('');
    }
  }


  guardarDatos() {
    if (this.datosPredioForm.valid) {
      const datosPredio = new DatosPredio(
        this.datosPredioForm.value.nombre,
        this.datosPredioForm.value.departamentoSeleccionado,
        this.datosPredioForm.value.provinciaSeleccionada,
        this.datosPredioForm.value.sectorPredio,
        this.datosPredioForm.value.municipioSeleccionado,
        this.datosPredioForm.value.vereda,
        this.datosPredioForm.value.numeroPredial,
        this.datosPredioForm.value.tipo,
        this.datosPredioForm.value.complemento
      );

      // Proceso de guardado, por ejemplo:
      this.predioActual.datosPredio = datosPredio;
      this.datosPredioService.addDatosPredio(datosPredio);

      console.log(this.datosPredioService.getDatosPredio());
      console.log(this.predioActual);

      this.router.navigate(['/nuevo-predio/' , this.predioActual.id])
    } else {
      // Manejar la situación cuando el formulario no es válido
      alert('Por favor, completa todos los campos requeridos.');
    }
  }





}
