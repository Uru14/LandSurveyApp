import {Component, OnInit} from '@angular/core';
import {mapDraw} from "../../mapa/mapDraw";
import {map} from "rxjs";
import {PredioService} from "../../services/PredioService";
import {CONFIG_OPENLAYERS} from "../../configuracion-openlayers";
import Feature from 'ol/Feature.js';
import {GeometriasService} from "../../services/GeometriasService";
import Polygon from 'ol/geom/Polygon.js';


@Component({
  selector: 'app-digitalizar',
  templateUrl: './digitalizar.component.html',
  styleUrl: './digitalizar.component.css'
})
export class DigitalizarComponent implements OnInit{


  protected readonly mapDraw = mapDraw;
  protected readonly map = map;
  constructor(private predioService: PredioService, private geometriaService: GeometriasService) {
  }

  ngOnInit(): void {
    mapDraw.clearVectorLayer();
  }
  finalizar() {
    let predioActual = this.predioService.obtenerPredioActual();

    // Limpiar el arreglo de geometrías antes de comenzar a procesar las nuevas
    this.geometriaService.limpiarGeometrias();

    CONFIG_OPENLAYERS.SOURCE_DRAW.getFeatures().forEach((feature: Feature) => {
      let geometry = feature.getGeometry();

      /*if (geometry instanceof Point) {
        let coordinates = geometry.getCoordinates();
        console.log('Punto:', coordinates);
        return new Coordenadas(coordinates[0], coordinates[1]);

      } else if (geometry instanceof LineString) {
        let coordinates = geometry.getCoordinates();
        console.log('Distancia:', coordinates);
        return coordinates.map(coord => new Coordenadas(coord[0], coord[1]));

      } else*/
      if (geometry instanceof Polygon) {
        let coordinates = geometry.getCoordinates()[0];
        console.log('Polígono:', coordinates);

        let coordenadas = this.geometriaService.mapearCoordenadasPoligono(coordinates);
        this.geometriaService.agregarGeometria(coordenadas);

        return this.geometriaService.obtenerGeometrias();

      } else {
        return null;
      }
    });
    console.log(this.geometriaService.obtenerGeometrias());
    let coordenadas = this.geometriaService.obtenerGeometrias()
    for(let coord of coordenadas) {
      predioActual.geometrias.push(coord)

    }
    console.log(predioActual.geometrias)
    mapDraw.disableDrawings();
  }
}
