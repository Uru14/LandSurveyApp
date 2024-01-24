import { Component } from '@angular/core';
import {AppModule} from "../../app.module";
import {MatMenuModule} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {mapDraw} from "../../mapa/mapDraw";
import {GeolocationService} from "../../services/Geolocation.service";
import {map} from "rxjs";
import {CONFIG_OPENLAYERS} from "../../configuracion-openlayers";
import {PredioService} from "../../services/PredioService";
import {GeometriasService} from "../../services/GeometriasService";
import {ImagenService} from "../../services/ImagenService";
import {Imagen, LC_FuenteAdministrativaTipo} from "../../models/imagen.model";
import {Coordenadas} from "../../models/geometria.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-medir-gps',
  templateUrl: './medir-gps.component.html',
  styleUrl: './medir-gps.component.css'
})
export class MedirGpsComponent {

  protected readonly mapDraw = mapDraw;
  puntosMedidos: number = 0;
  imagenCapturada: string | undefined = '';
  ultimaPrecision: number = 0;

  constructor(private geolocationService: GeolocationService, private geometriasService: GeometriasService,
              private predioService: PredioService, private imagenService: ImagenService, private snackBar: MatSnackBar) {}

  ngAfterViewInit(): void {
    let predioActual = this.predioService.obtenerPredioActual();

    // Verifica si hay geometrías existentes
    if (predioActual && predioActual.geometrias.length > 0) {
      if (window.confirm("Hay geometrías dibujadas para este predio. ¿Desea eliminarlas?")) {
        this.geometriasService.limpiarGeometrias();
        predioActual.geometrias = [];
        mapDraw.clearVectorLayer(); // Limpia solo si el usuario confirma que quiere eliminarlas
      }
    } else {
      mapDraw.clearVectorLayer();
    }
    // Espera a que el mapa esté listo antes de deshabilitar las interacciones de dibujo
    if (CONFIG_OPENLAYERS.MAP) {
      mapDraw.disableDrawings();
    }
  }
  centerMapToMyPosition() {
    this.geolocationService.getCurrentCoordinates().then(position => {
      let centro = CONFIG_OPENLAYERS.MAP.getView();
      centro.setCenter([position.coords.longitude, position.coords.latitude]);
      centro.setZoom(20);
      CONFIG_OPENLAYERS.MAP.setView(centro);
      console.log([position.coords.latitude, position.coords.longitude])
    }).catch(error => {
      console.error('Error al obtener la posición actual:', error);
      alert(`Error al obtener la ubicación: ${error.message}`);
    });
  }

  /*medirPunto() {
    this.geolocationService.getCurrentCoordinates().then(position => {
      mapDraw.addPoint([position.coords.longitude, position.coords.latitude]);
      this.puntosMedidos++;
    }).catch(error => {
      console.error('Error al obtener la posición actual:', error);
      alert(`Error al obtener la ubicación: ${error.message}`);
    });
  }*/

  medirPunto() {
    this.geolocationService.getCurrentCoordinates().then(position => {
      // Extrae y limita la precisión a 4 decimales
      const precisionX = parseFloat(position.coords.accuracy.toFixed(4));
      const precisionY = parseFloat(position.coords.accuracy.toFixed(4));

      // Agrega el punto al mapa
      mapDraw.addPoint([position.coords.longitude, position.coords.latitude]);

      // Crea una nueva instancia de Coordenadas con la precisión
      let coordenada = new Coordenadas(
        position.coords.longitude,
        position.coords.latitude,
        precisionX,
        precisionY
      );

      // Agrega la coordenada al servicio de geometrías
      this.geometriasService.agregarGeometria([coordenada]);

      // Actualiza la precisión para mostrarla en la interfaz de usuario
      this.ultimaPrecision = precisionX;

      this.puntosMedidos++;
    }).catch(error => {
      console.error('Error al obtener la posición actual:', error);
      alert(`Error al obtener la ubicación: ${error.message}`);
    });
  }



  borrarUltimoPunto() {
    if (this.puntosMedidos > 0) {
      mapDraw.removeLastPoint();
      this.puntosMedidos--;
    } else {
      this.snackBar.open('No hay puntos para borrar', 'Cerrar', { duration: 3000 });
    }
  }


  finalizarMedicion() {
    mapDraw.finishPolygon(this.geometriasService, this.predioService);
  }

  takePhoto() {
    this.imagenService.addNewToGallery().then((capturedPhoto) => {

      this.imagenCapturada = capturedPhoto.webPath;

      const nuevaImagen: Imagen = {
        tipo_doc: LC_FuenteAdministrativaTipo.Imagen_propietario,
        num_pag: 0,
        notas: '',
        imageData: this.imagenCapturada
      };

      let predioActual = this.predioService.obtenerPredioActual();
      predioActual.imagenes.push(nuevaImagen);
      this.predioService.guardarPredioActual(predioActual);
      console.log(predioActual);
    }).catch(error => {
      console.error("Error al tomar la foto:", error);
    });
  }

}
