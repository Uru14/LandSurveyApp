import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {
  CR_DocumentoTipo,
  CR_InteresadoTipo, CR_SexoTipo, Departamento,
  Estado,
  Grupo_Etnico, Municipio,
  Propietario
} from "../../../models/propietario.model";
import {PropietarioService} from "../../../services/PropietarioService";
import {PredioService} from "../../../services/PredioService";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {DataService} from "../../../services/DataService";

@Component({
  selector: 'app-editar-propietario',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    RouterLink,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './editar-propietario.component.html',
  styleUrl: './editar-propietario.component.css'
})
export class EditarPropietarioComponent {
  predioActual = this.predioService.obtenerPredioActual();
  propietario: Propietario;
  originalDocumentoIdentidad = '';
  array_CR_InteresadoTipo = Object.values(CR_InteresadoTipo);
  array_CR_DocumentoTipo = Object.values(CR_DocumentoTipo);
  array_CR_SexoTipo = Object.values(CR_SexoTipo);
  array_Grupo_Etnico = Object.values(Grupo_Etnico);
  autorizaProcesamientoDatosPersonales: boolean = false;
  tipo: CR_InteresadoTipo = CR_InteresadoTipo.Persona_Natural;
  tipoDocumento: CR_DocumentoTipo = CR_DocumentoTipo.Cedula_Ciudadania;
  documentoIdentidad: string = '';
  primerNombre: string = '';
  segundoNombre: string = '';
  primerApellido: string = '';
  segundoApellido: string = '';
  sexo: CR_SexoTipo = CR_SexoTipo.Masculino;
  grupoEtnico: Grupo_Etnico = Grupo_Etnico.Ninguno;
  telefono1: string = '';
  correoElectronico: string = '';
  autorizaNotificacionCorreo: boolean = false;
  departamentos: Departamento[] = [];
  municipios: Municipio[]  = [];
  municipiosFiltrados: Municipio[] = [];
  departamentoSeleccionado: string = '';
  municipioSeleccionado: string = '';
  notas: string = '';
  porcentajePropiedad: number = 0;
  estado: Estado = Estado.Soltero;
  constructor(private propietarioService: PropietarioService, private dataService: DataService, private route: ActivatedRoute, private router: Router, private predioService: PredioService) {
    this.propietario = new Propietario(
      false, CR_InteresadoTipo.Persona_Natural, CR_DocumentoTipo.Cedula_Ciudadania, '', '', '',
      '', '', CR_SexoTipo.Masculino, Grupo_Etnico.Ninguno, '', '', false, '', '',  '', 0,Estado.Casado);
  }
  ngOnInit() {
    Promise.all([
      this.cargarDepartamentosYMunicipios()
    ]).then(() => {
      this.cargarDatosPropietario();
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
  cargarDatosPropietario() {
    const idPredio = this.route.snapshot.params['id'];
    const documentoIdentidad = this.route.snapshot.params['documentoIdentidad'];

    if (idPredio && documentoIdentidad) {
      const predioActual = this.predioService.obtenerPredioActual();
      if (predioActual) {
        const propietarioEncontrado = predioActual.propietarios.find(p => p.documentoIdentidad === documentoIdentidad);
        if (propietarioEncontrado) {
          this.propietario = propietarioEncontrado;
          this.originalDocumentoIdentidad = propietarioEncontrado.documentoIdentidad;
          this.inicializarFormularioConDatos(propietarioEncontrado);
        }
      }
    }
  }

  inicializarFormularioConDatos(propietario: Propietario) {

    this.departamentoSeleccionado = propietario.departamento;
    this.municipioSeleccionado = propietario.municipio;
    // Filtra los municipios basados en el departamento seleccionado
    this.onDepartamentoChange();
  }
  guardarPropietario() {
    // Verifica si el documento de identidad fue cambiado y ya existe
    if (this.originalDocumentoIdentidad !== this.propietario.documentoIdentidad &&
      this.propietarioService.documentoIdentidadExists(this.propietario.documentoIdentidad)) {
      alert('Documento de identidad duplicado');
      return;
    }

    this.propietarioService.actualizarPropietario(this.propietario);
    console.log(this.predioActual)
    console.log(this.propietario)

    this.router.navigate(['/nuevo-predio/', this.predioService.obtenerPredioActual().id, 'datos-propietario']);
  }

  eliminarPropietario() {
    if (this.propietario) {
      this.propietarioService.eliminarPropietario(this.propietario.documentoIdentidad);


      let predioActual = this.predioService.obtenerPredioActual();
      predioActual.propietarios = predioActual.propietarios.filter(p => p.documentoIdentidad !== this.propietario.documentoIdentidad);
      //this.predioService.guardarPredioActual(predioActual);

      this.router.navigate(['/nuevo-predio/', predioActual.id, 'datos-propietario']);
      console.log(predioActual);
    }
  }

  onDepartamentoChange() {
    this.municipiosFiltrados = this.municipios.filter(
      m => m.departamento === this.departamentoSeleccionado
    );

    this.municipioSeleccionado = '';
  }
}
