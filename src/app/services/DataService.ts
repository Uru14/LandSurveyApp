import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Departamento, Municipio} from "../models/propietario.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getDepartamentos() {
    return this.http.get<Departamento[]>('/assets/departamentos.json');
  }

  getMunicipios() {
    return this.http.get<Municipio[]>('/assets/municipios.json');
  }
  getProvincias() {
    return this.http.get('/assets/provincias.json');
  }
}
