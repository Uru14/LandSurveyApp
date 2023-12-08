import { Component } from '@angular/core';
import {mapDraw} from "../../mapa/mapDraw";
import {map} from "rxjs";

@Component({
  selector: 'app-digitalizar',
  templateUrl: './digitalizar.component.html',
  styleUrl: './digitalizar.component.css'
})
export class DigitalizarComponent {


  protected readonly mapDraw = mapDraw;
  protected readonly map = map;
}
