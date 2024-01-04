import { Component } from '@angular/core';
import {AppModule} from "../../app.module";
import {MatMenuModule} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {mapDraw} from "../../mapa/mapDraw";

@Component({
  selector: 'app-medir-gps',
  standalone: true,
    imports: [
        AppModule,
        MatMenuModule,
        RouterLink
    ],
  templateUrl: './medir-gps.component.html',
  styleUrl: './medir-gps.component.css'
})
export class MedirGpsComponent {

  protected readonly mapDraw = mapDraw;
}
