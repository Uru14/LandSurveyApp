import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Estado, Propietario} from "../../../models/propietario.model";
import {PropietarioService} from "../../../services/PropietarioService";

@Component({
  selector: 'app-editar-propietario',
  standalone: true,
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        RouterLink
    ],
  templateUrl: './editar-propietario.component.html',
  styleUrl: './editar-propietario.component.css'
})
export class EditarPropietarioComponent {
  propietario: Propietario = {
    nombre: '',
    apellidos: '',
    dni: '',
    porcentaje_propiedad: 0,
    estado: Estado.Casado,
    notas: ''
  };
  constructor(private propietarioService: PropietarioService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const dni = params.get('dni');
      if (dni) {
        const propietarioEncontrado = this.propietarioService.getPropietarioPorDni(dni);
        if (propietarioEncontrado) {
          this.propietario = propietarioEncontrado;
        }
      }
    });
  }
  guardarPropietario() {
    if (this.propietario) {
      if (!this.propietarioService.dniExists(this.propietario.dni)) {
      this.propietarioService.actualizarPropietario(this.propietario);
      this.router.navigate(['/nuevo-predio/datos-propietario'])
    } else {
      alert('DNI DUPLICADO')}
    }
  }

  eliminarPropietario() {
    if (this.propietario) {
      this.propietarioService.eliminarPropietario(this.propietario.dni);
      this.router.navigate(['/nuevo-predio/datos-propietario'])

    }
  }
}