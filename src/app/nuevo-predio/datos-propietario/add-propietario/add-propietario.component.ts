import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { Propietario, CR_InteresadoTipo, CR_DocumentoTipo, CR_SexoTipo, Grupo_Etnico, Estado } from '../../../models/propietario.model';
import { PropietarioService } from '../../../services/PropietarioService';
import { PredioService } from '../../../services/PredioService';
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {LC_FuenteAdministrativaTipo} from "../../../models/imagen.model";
import { DataService } from '../../../services/DataService';
import {Departamento, Municipio} from "../../../models/propietario.model";

@Component({
  selector: 'app-add-propietario',
  standalone: true,
  imports: [
    RouterLink,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule
  ],
  templateUrl: './add-propietario.component.html',
  styleUrl: './add-propietario.component.css'
})
export class AddPropietarioComponent {
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

  constructor(private propietarioService: PropietarioService, private router: Router, private predioService: PredioService, private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getDepartamentos().subscribe(data => {
      this.departamentos = data;
    });

    this.dataService.getMunicipios().subscribe(data => {
      this.municipios = data;
    });
    console.log(this.departamentos)
  }

  onDepartamentoChange() {
    this.municipiosFiltrados = this.municipios.filter(
      m => m.departamento === this.departamentoSeleccionado
    );
    // Resetea la selección del municipio si el departamento cambia
    this.municipioSeleccionado = '';
  }
  guardarPropietario() {
    const nuevoPropietario = new Propietario(
      this.autorizaProcesamientoDatosPersonales,
      this.tipo,
      this.tipoDocumento,
      this.documentoIdentidad,
      this.primerNombre,
      this.segundoNombre,
      this.primerApellido,
      this.segundoApellido,
      this.sexo,
      this.grupoEtnico,
      this.telefono1,
      this.correoElectronico,
      this.autorizaNotificacionCorreo,
      this.departamentoSeleccionado,
      this.municipioSeleccionado,
      this.notas,
      this.porcentajePropiedad,
      this.estado
    );

    if (!this.propietarioService.documentoIdentidadExists(this.documentoIdentidad)) {
      this.propietarioService.addPropietario(nuevoPropietario);

      let predioActual = this.predioService.obtenerPredioActual();
      predioActual.propietarios.push(nuevoPropietario);

      console.log(predioActual)
      this.router.navigate(['/nuevo-predio/' , predioActual.id, 'datos-propietario']);
    } else {
      alert('Documento de identidad duplicado');
    }
  }

  eliminarPropietario() {
    if (this.documentoIdentidad) {
      this.propietarioService.eliminarPropietario(this.documentoIdentidad);

      let predioActual = this.predioService.obtenerPredioActual();
      predioActual.propietarios = predioActual.propietarios.filter(p => p.documentoIdentidad !== this.documentoIdentidad);

      this.router.navigate(['/nuevo-predio/:id/datos-propietario']);
    }
  }

  protected readonly CR_SexoTipo = CR_SexoTipo;
  protected readonly Grupo_Etnico = Grupo_Etnico;
  protected readonly CR_InteresadoTipo = CR_InteresadoTipo;
  protected readonly CR_DocumentoTipo = CR_DocumentoTipo;
}
