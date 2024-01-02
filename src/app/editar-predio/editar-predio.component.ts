import {Component, OnInit} from '@angular/core';
import {GeometriasService} from "../services/GeometriasService";
import {mapDraw} from "../mapa/mapDraw";
import { ActivatedRoute } from '@angular/router';
import {PredioService} from "../services/PredioService";
import {CONFIG_OPENLAYERS} from "../configuracion-openlayers";
import {Modify, Select} from "ol/interaction";
import {click} from "ol/events/condition";
import Polygon from "ol/geom/Polygon";
import { Router } from '@angular/router';


@Component({
  selector: 'app-editar-predio',
  templateUrl: './editar-predio.component.html',
  styleUrl: './editar-predio.component.css'
})
export class EditarPredioComponent implements OnInit{


  constructor(private predioService: PredioService, private geometriasService: GeometriasService, private route: ActivatedRoute, private router: Router) {
  }
  protected readonly mapDraw = mapDraw;


  ngOnInit(): void {
    mapDraw.clearVectorLayer();
    this.getCoordPredio();
  }

  private getCoordPredio() {

    this.route.params.subscribe(params => {
      let predioIdFromRoute = +params['id'];

      let predioSeleccionado = this.predioService.getListaPredios().find(predio => predio.id === predioIdFromRoute);

      if (predioSeleccionado ) {
        let coordenadas = predioSeleccionado.geometrias;

        this.waitForMapInitialization().then(() => {
          this.agregarCoordenadasAlMapa(this.extraerCoords(coordenadas));
        });
      }
    });


  }

  private waitForMapInitialization(): Promise<void> {
    return new Promise<void>((resolve) => {
      // Verifica cada 100 ms si el mapa está inicializado
      const checkInitialization = () => {
        if (CONFIG_OPENLAYERS.MAP) {
          clearInterval(intervalId);
          resolve();
        }
      };

      const intervalId = setInterval(checkInitialization, 100);
      checkInitialization(); // Comprueba la inicialización inmediatamente
    });
  }

  private extraerCoords(coordenadas: any[]) {
    let arrayXY = [];

    for(let coords of coordenadas) {
      let x = coords.x;
      let y = coords.y;
      arrayXY.push([x,y]);
    }
    return arrayXY;
  }

  private agregarCoordenadasAlMapa(arrayXY: number[][]) {
    // Agrega las coordenadas al mapa
    mapDraw.addPolygonToLayer(arrayXY);
    mapDraw.disableDrawings()
  }

  private obtenerPredioPorId(predioId: number) {
    return this.predioService
      .getListaPredios()
      .find((predio) => predio.id === predioId);
  }
  editarVertices() {
    const select = new Select({
      condition: click,
    });
    const modify = new Modify({
      features: select.getFeatures(),
    });

    CONFIG_OPENLAYERS.MAP.addInteraction(select);
    CONFIG_OPENLAYERS.MAP.addInteraction(modify);

    modify.on('modifyend', (evt) => {
      const modifiedFeature = evt.features.getArray()[0];
      if (modifiedFeature) {
        const geometry = modifiedFeature.getGeometry();
        if (geometry instanceof Polygon) {
          const coordinates = geometry.getCoordinates()[0];
          console.log('Polígono:', coordinates);

          const coordenadas = this.geometriasService.mapearCoordenadasPoligono(
            coordinates
          );
          this.geometriasService.agregarGeometria(coordenadas);

          // Actualizar las coordenadas en el predio
          const predioActual = this.obtenerPredioPorId(
            this.getCurrentPredioId()
          );
          if (predioActual) {
            predioActual.geometrias = coordenadas;
            console.log('Predio actual después de editar geometrías: ', predioActual);
          } else {
            console.error(
              'No se pudo obtener el predio actual después de editar geometrías.'
            );
          }
        }
      }

      mapDraw.disableDrawings();
    });
  }
  private getCurrentPredioId(): number {
    return +this.route.snapshot.params['id'];
  }

  editarDatos() {
    // Obtén el ID del predio actual
    let predioId = this.getCurrentPredioId();

    // Navega a la pantalla de edición de datos del predio
    this.router.navigate(['/editar-datos-predio', predioId]);
  }

  borrar() {
    this.predioService.borrarPredioActual();
  }

}