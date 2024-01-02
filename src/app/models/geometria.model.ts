export class Coordenadas{
  x: Number
  y: Number
  num?: Number
  cod?: String

  constructor(x: Number, y: Number, num: Number = 0, cod: String = '') {
    this.x = x;
    this.y = y;
    if (typeof num !== 'undefined') {this.num = num};
    if (typeof cod !== 'undefined') {this.cod = cod};
  }

}
