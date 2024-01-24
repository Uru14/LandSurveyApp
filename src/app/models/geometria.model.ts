export class Coordenadas{
  x: number
  y: number
  precisionX: number
  precisionY: number
  num?: number
  cod?: String

  constructor(x: number, y: number, precisionX: number, precisionY: number, num: number = 0, cod: String = '--') {
    this.x = x;
    this.y = y;
    this.precisionX = precisionX;
    this.precisionY = precisionY;
    if (typeof num !== 'undefined') {this.num = num};
    if (typeof cod !== 'undefined') {this.cod = cod};
  }

}
