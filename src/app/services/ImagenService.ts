import { Injectable } from '@angular/core';
import { Imagen, LC_FuenteAdministrativaTipo } from '../models/imagen.model';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import {Documento} from "../models/documento.model";
import {PredioService} from "./PredioService";
@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private imagenes: Imagen[] = [];
  private readonly IMAGENES_KEY = 'imagenes';

  constructor(private predioService: PredioService) {
    this.cargarImagenes();
  }

  getImagenes(): Imagen[] {
    return this.imagenes;
  }

  addImagen(imagen: Imagen) {
    this.imagenes.push(imagen);
    this.guardarImagen();
  }

  eliminarImagen(index: number) {

    if (index >= 0 && index < this.imagenes.length) {
      this.imagenes.splice(index, 1);
      this.guardarImagen();
    }
  }
  async addNewToGallery(): Promise<Photo> {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    return capturedPhoto;
  }

  private async cargarImagenes() {
    const storedImages = await Preferences.get({ key: this.IMAGENES_KEY });
    this.imagenes = storedImages && storedImages.value ? JSON.parse(storedImages.value) : [];
  }

  private async guardarImagen() {
    await Preferences.set({
      key: this.IMAGENES_KEY,
      value: JSON.stringify(this.imagenes)
    });
  }

  actualizarImagen(index: number, imagen: Imagen) {
    this.imagenes[index] = imagen;
    this.guardarImagen();
  }
}
