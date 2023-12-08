import {CONFIG_OPENLAYERS} from "../configuracion-openlayers";
import Draw from "ol/interaction/Draw";


export class mapDraw {

  public static addDrawPolygonInteraction() {
    CONFIG_OPENLAYERS.MAP_DRAW_POLYGON = new Draw({
      source: CONFIG_OPENLAYERS.SOURCE_DRAW,
      type:('Polygon')
    });
    CONFIG_OPENLAYERS.MAP.addInteraction(CONFIG_OPENLAYERS.MAP_DRAW_POLYGON);
  }
  public static addDrawPointInteraction() {
    CONFIG_OPENLAYERS.MAP_DRAW_POINT = new Draw({
      source: CONFIG_OPENLAYERS.SOURCE_DRAW,
      type:('Point')
    });
    CONFIG_OPENLAYERS.MAP.addInteraction(CONFIG_OPENLAYERS.MAP_DRAW_POINT);
  }
  public static addDrawLineInteraction() {
    CONFIG_OPENLAYERS.MAP_DRAW_LINE = new Draw({
      source: CONFIG_OPENLAYERS.SOURCE_DRAW,
      type:('LineString')
    });
    CONFIG_OPENLAYERS.MAP.addInteraction(CONFIG_OPENLAYERS.MAP_DRAW_LINE);
  }

//Enables the polygons draw
  public static enableDrawPolygons(){
    this.disableDrawings();
    CONFIG_OPENLAYERS.MAP_DRAW_POLYGON.setActive(true);
  }

  //Enables the points draw
  public static enableDrawPoints(){
    this.disableDrawings();
    CONFIG_OPENLAYERS.MAP_DRAW_POINT.setActive(true);
  }

  //Enables the lines draw
  public static enableDrawLine(){
    this.disableDrawings();
    CONFIG_OPENLAYERS.MAP_DRAW_LINE.setActive(true);
  }
//Disables the drawings
  public static disableDrawings(){
    CONFIG_OPENLAYERS.MAP_DRAW_POLYGON.setActive(false);
    CONFIG_OPENLAYERS.MAP_DRAW_POINT.setActive(false);
    CONFIG_OPENLAYERS.MAP_DRAW_LINE.setActive(false);
  }

//Clear the vector layer
  public static clearVectorLayer(){
    CONFIG_OPENLAYERS.SOURCE_DRAW.clear();
  }

}
