import { Component } from '@angular/core';
import {PredioService} from "../../services/PredioService";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-seleccionar-geometria',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './seleccionar-geometria.component.html',
  styleUrl: './seleccionar-geometria.component.css'
})
export class SeleccionarGeometriaComponent {
  selectedFile: File | null = null;

  constructor(private predioService: PredioService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async guardarGeometria() {
    if (!this.selectedFile) {
      alert('Por favor, selecciona un archivo GeoJSON');
      return;
    }

    const reader = new FileReader();
    reader.readAsText(this.selectedFile, 'UTF-8');
    reader.onload = async () => {
      const geojson = JSON.parse(reader.result as string);
      const geometriaProcesada = this.procesarGeoJSON(geojson);
      let predioActual = this.predioService.obtenerPredioActual();
      predioActual.geometrias.push(geometriaProcesada);
      this.predioService.guardarPredioActual(predioActual);
      console.log(predioActual);
    };
    reader.onerror = (error) => {
      console.error('Error al leer el archivo:', error);
    };
  }

  procesarGeoJSON(geojson: any): any {
    console.log("Procesando GeoJSON:", geojson);

    // Verifica si el GeoJSON tiene la propiedad 'features'
    if (!geojson.features || !Array.isArray(geojson.features)) {
      console.error('Formato de GeoJSON no válido');
      return;
    }

    let coordenadasExtraidas = [];

    for (let feature of geojson.features) {
      console.log("Procesando feature:", feature);

      // Verifica si la geometría es de tipo 'Polygon'
      if (feature.geometry && feature.geometry.type === 'Polygon') {
        console.log("Encontrado polígono:", feature.geometry);

        // Extrae las coordenadas del polígono
        let coordenadasPoligono = feature.geometry.coordinates;
        console.log("Coordenadas del polígono:", coordenadasPoligono);

        // Asumiendo que el polígono tiene un solo anillo (el exterior)
        if (coordenadasPoligono.length > 0 && Array.isArray(coordenadasPoligono[0])) {
          for (let coord of coordenadasPoligono[0]) {
            // Asumiendo que las coordenadas son pares [longitud, latitud]
            let coordenada = { x: coord[0], y: coord[1] };
            coordenadasExtraidas.push(coordenada);
            console.log("Coordenada extraída:", coordenada);
          }
        }
      }
    }

    console.log("Coordenadas extraídas:", coordenadasExtraidas);
    return coordenadasExtraidas;
  }


}
