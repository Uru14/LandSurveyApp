import { Component } from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {Preferences} from "@capacitor/preferences";
import {ApiService} from "../../services/ApiService";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";
import {JWTTokenService} from "../../services/jwtTokenService";

@Component({
  selector: 'app-establecer-servidor',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './establecer-servidor.component.html',
  styleUrl: './establecer-servidor.component.css'
})
export class EstablecerServidorComponent {
  apiUrl: string = 'https://metatierrascol.upvusig.car.upv.es/api/';
  user: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private snackBar: MatSnackBar, private tokenService: JWTTokenService) {
  }

  async establecerServidor() {
    // Configura el servicio con los nuevos valores
    this.apiService.setConfiguracion(this.apiUrl, this.user, this.password);

    // Intenta autenticar con los nuevos valores
    try {
      const token = await this.apiService.autenticar();
      const tiempoRestante = this.tokenService.getRemainingTime();
      if (tiempoRestante > 0) {
        this.snackBar.open(`Token válido. Tiempo restante: ${tiempoRestante} horas.`, 'Cerrar', { duration: 3000, verticalPosition: 'top' });
      } else {
        this.snackBar.open('Autenticación exitosa. Token recibido.', 'Cerrar', { duration: 3000, verticalPosition: 'top' });
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      this.snackBar.open('Error en la autenticación. Por favor, revisa tus credenciales.', 'Cerrar', { duration: 3000, verticalPosition: 'top' });
    }
  }
}
