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
  apiUrl: string = '';
  user: string = '';
  password: string = '';

  constructor(private apiService: ApiService) {}

  async establecerServidor() {
    // Guardar las credenciales
    await Preferences.set({ key: 'apiUrl', value: this.apiUrl });
    await Preferences.set({ key: 'user', value: this.user });
    await Preferences.set({ key: 'password', value: this.password });

    console.log('Configuración guardada:', this.apiUrl, this.user, this.password);

    // Llamar a cargarConfiguracion y luego autenticar
    this.apiService.cargarConfiguracion().then(() => {
      this.apiService.autenticar().then(token => {
        console.log('Token recibido:', token);
      }).catch(error => {
      console.error('Error en la autenticación:', error);
      });
    });

  }



}
