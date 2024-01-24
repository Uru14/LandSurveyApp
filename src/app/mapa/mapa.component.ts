import { Component, OnInit } from '@angular/core';
import View from 'ol/View';
import * as proj from 'ol/proj';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Circle from 'ol/style/Circle';
import { CONFIG_OPENLAYERS } from '../configuracion-openlayers';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import LayerSwitcher from 'ol-layerswitcher';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM.js';
import {mapDraw} from  "./mapDraw";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature.js";
import Polygon from "ol/geom/Polygon.js";
import {DataService} from "../services/DataService";
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  selectedSRC: string = 'EPSG:4326';
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.inicializarMapa();
    this.escucharCambiosSrc();
    mapDraw.addDrawPolygonInteraction();
    mapDraw.addDrawPointInteraction();
    mapDraw.addDrawLineInteraction();
  }

  inicializarMapa() {
    //Map projection
    /*let epsg25830 = new proj.Projection({
      code: 'EPSG:25830',
      extent: [716682.702,4365814.329,732380.437,4376383.664],
      units: 'm'
    });
    proj.addProjection(epsg25830);*/

    var vector_draw_style = new Style({
      fill: new Fill({
        color:'#D7DF01'
      }),
      stroke: new Stroke({
        color: '#DF013A',
        width: 3,
        lineJoin: 'round'
      }),
      image: new Circle({
        radius: 4,
        fill: new Fill({
          color: '#DF013A'
        })
      })
    })

    CONFIG_OPENLAYERS.VECTOR_DRAW.setStyle(vector_draw_style);
    CONFIG_OPENLAYERS.VECTOR_DRAW.setOpacity(0.5);

    var layer_PNOA = new TileLayer({
      source: new TileWMS({
        url: "http://www.ign.es/wms-inspire/pnoa-ma",
        params: {"LAYERS": "OI.OrthoimageCoverage", "VERSION": "1.3.0", "TILED": "true"},
      })
    });
    var layer_OSM = new TileLayer({
      source: new OSM(),
    });

    CONFIG_OPENLAYERS.MAP = new Map({
      target: 'map',
      layers: [layer_OSM,CONFIG_OPENLAYERS.VECTOR_DRAW],
      view: new View({
        projection: 'EPSG:4326',
        center: [-4,40],
        zoom: 6
      })
    });

    //Layer switcher definition
    var layerSwitcher = new LayerSwitcher({
      tipLabel: 'Leyenda'
    });

    CONFIG_OPENLAYERS.MAP.addControl(layerSwitcher);

  }

  escucharCambiosSrc() {
    const currentView = CONFIG_OPENLAYERS.MAP.getView();
    const currentProjection = currentView.getProjection().getCode();

    // Imprime la proyección actual antes del cambio
    console.log('Proyección actual:', currentProjection);
    this.dataService.src$.subscribe(newSrc => {
      const currentView = CONFIG_OPENLAYERS.MAP.getView();
      const newView = this.dataService.getUpdatedView(currentView, newSrc);
      CONFIG_OPENLAYERS.MAP.setView(newView);
      const newProjection = CONFIG_OPENLAYERS.MAP.getView().getProjection().getCode();
      console.log('Nueva proyección:', newProjection);
    });
  }
}

