import {Component, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
import {MatButtonModule} from "@angular/material/button";

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
    MatCheckboxModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './editar-propietario.component.html',
  styleUrl: './editar-propietario.component.css'
})
export class EditarPropietarioComponent {
  editarFormulario: FormGroup;
  titulo: string = 'Editar interesado ';
  predioActual = this.predioService.obtenerPredioActual();
  propietario!: Propietario;
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
    this.editarFormulario = new FormGroup({
      tipoDocumento: new FormControl('', Validators.required),
      documentoIdentidad: new FormControl('', [Validators.required, Validators.minLength(4)]),
      tipo: new FormControl('', Validators.required),
      primerNombre: new FormControl('', Validators.required),
      segundoNombre: new FormControl(''),
      primerApellido: new FormControl('', Validators.required),
      segundoApellido: new FormControl(''),
      sexo: new FormControl('', Validators.required),
      grupoEtnico: new FormControl(''),
      telefono1: new FormControl(''),
      correoElectronico: new FormControl('', [Validators.required, Validators.email]),
      departamentoSeleccionado: new FormControl('', Validators.required),
      municipioSeleccionado: new FormControl('', Validators.required),
      porcentajePropiedad: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      estado: new FormControl(''),
      autorizaProcesamientoDatosPersonales: new FormControl(false, Validators.requiredTrue),
      autorizaNotificacionCorreo: new FormControl(false, Validators.requiredTrue),
      notas: new FormControl('')
    });

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
      if (this.predioActual) {
        const propietarioEncontrado = this.predioActual.propietarios.find(p => p.documentoIdentidad === documentoIdentidad);
        if (propietarioEncontrado) {
          console.log(propietarioEncontrado);
          this.propietario = propietarioEncontrado;
          this.originalDocumentoIdentidad = propietarioEncontrado.documentoIdentidad; // Almacenar el valor original
          // Asignar los valores al formulario
          this.editarFormulario.patchValue({
            tipoDocumento: propietarioEncontrado.tipoDocumento,
            documentoIdentidad: propietarioEncontrado.documentoIdentidad,
            tipo: propietarioEncontrado.tipo,
            primerNombre: propietarioEncontrado.primerNombre,
            segundoNombre: propietarioEncontrado.segundoNombre,
            primerApellido: propietarioEncontrado.primerApellido,
            segundoApellido: propietarioEncontrado.segundoApellido,
            sexo: propietarioEncontrado.sexo,
            grupoEtnico: propietarioEncontrado.grupoEtnico,
            telefono1: propietarioEncontrado.telefono1,
            correoElectronico: propietarioEncontrado.correoElectronico,
            departamentoSeleccionado: propietarioEncontrado.departamento,
            municipioSeleccionado: propietarioEncontrado.municipio,
            porcentajePropiedad: propietarioEncontrado.porcentajePropiedad,
            estado: propietarioEncontrado.estado,
            autorizaProcesamientoDatosPersonales: propietarioEncontrado.autorizaProcesamientoDatosPersonales,
            autorizaNotificacionCorreo: propietarioEncontrado.autorizaNotificacionCorreo,
            notas: propietarioEncontrado.notas
          });

          // Llama a onDepartamentoChange para actualizar los municipios filtrados
          this.onDepartamentoChange();
        }
      }
    }
  }

  guardarPropietario() {
    if (this.editarFormulario.valid) {
      // Actualiza 'this.propietario' con los valores del formulario
      this.propietario = { ...this.propietario, ...this.editarFormulario.value };

      // Verifica si el documento de identidad fue cambiado y ya existe
      if (this.originalDocumentoIdentidad !== this.editarFormulario.value.documentoIdentidad &&
        this.propietarioService.documentoIdentidadExists(this.editarFormulario.value.documentoIdentidad)) {
        alert('Documento de identidad duplicado');
        return;
      }

      // Realiza la actualización del propietario
      this.propietarioService.actualizarPropietario(this.propietario);

      // Actualizar la lista de propietarios en el predio actual
      const indice = this.predioActual.propietarios.findIndex(p => p.documentoIdentidad === this.originalDocumentoIdentidad);
      if (indice !== -1) {
        this.predioActual.propietarios[indice] = this.propietario;
      }
      console.log(this.predioActual);
      console.log(this.propietario);

      // Navegación tras la actualización
      this.router.navigate(['/nuevo-predio/', this.predioService.obtenerPredioActual().id, 'datos-propietario']);
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
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
    const departamentoSeleccionado = this.editarFormulario.get('departamentoSeleccionado')?.value;
    this.departamentoSeleccionado = departamentoSeleccionado;
    this.municipiosFiltrados = this.municipios.filter(
      m => m.departamento === departamentoSeleccionado
    );

    // Si el municipio seleccionado actualmente no está en los municipios filtrados, restablece el municipio seleccionado
    if (!this.municipiosFiltrados.some(m => m.nombre_municipio === this.municipioSeleccionado)) {
      this.municipioSeleccionado = '';
    }
  }

}
