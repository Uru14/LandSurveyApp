import {Component, OnInit} from '@angular/core';
import {mapDraw} from "../../mapa/mapDraw";
import {map} from "rxjs";
import {PredioService} from "../../services/PredioService";
import {CONFIG_OPENLAYERS} from "../../configuracion-openlayers";
import Feature from 'ol/Feature.js';
import {GeometriasService} from "../../services/GeometriasService";
import Polygon from 'ol/geom/Polygon.js';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-digitalizar',
  templateUrl: './digitalizar.component.html',
  styleUrl: './digitalizar.component.css'
})
export class DigitalizarComponent implements OnInit{


  protected readonly mapDraw = mapDraw;
  protected readonly map = map;
  constructor(private predioService: PredioService, private geometriaService: GeometriasService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    let predioActual = this.predioService.obtenerPredioActual();

    if (predioActual && predioActual.geometrias.length > 0) {
      if (window.confirm("Hay geometrías dibujadas para este predio. ¿Desea eliminarlas?")) {
        this.geometriaService.limpiarGeometrias();
        predioActual.geometrias = [];
        mapDraw.clearVectorLayer();
      }
    } else {
      mapDraw.clearVectorLayer();
    }
  }
  finalizar() {
    let predioActual = this.predioService.obtenerPredioActual();


    this.geometriaService.limpiarGeometrias();

    CONFIG_OPENLAYERS.SOURCE_DRAW.getFeatures().forEach((feature: Feature) => {
      let geometry = feature.getGeometry();
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
      coord.precisionX = 5;
      coord.precisionY = 5;
      predioActual.geometrias.push(coord)
    }
    this.snackBar.open('Geometría guardada con éxito', 'Cerrar', { duration: 3000 });
    console.log(predioActual.geometrias)
    mapDraw.disableDrawings();
    this.router.navigate(['/nuevo-predio/',predioActual.id]);
  }
}
