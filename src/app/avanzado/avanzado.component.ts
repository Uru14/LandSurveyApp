import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CONFIG_OPENLAYERS} from "../configuracion-openlayers";
import {DataService} from "../services/DataService";
import {MatOptionModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {Router, RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-avanzado',
  standalone: true,
  imports: [
    FormsModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './avanzado.component.html',
  styleUrl: './avanzado.component.css'
})
export class AvanzadoComponent {
  refSystems = CONFIG_OPENLAYERS.REFERENCE_SYSTEMS;
  selectedRefSystem: string = 'EPSG:4326';

  constructor(private dataService: DataService, private router: Router) {
  }
  goBack() {
    this.router.navigate(['/']); // O la ruta que necesites
  }
  onRefSystemChange(newRefSystem: string) {
    this.dataService.setSrc(newRefSystem);
  }
}
