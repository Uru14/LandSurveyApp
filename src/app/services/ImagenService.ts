import { Injectable } from '@angular/core';
import { Imagen, TipoDocumento } from '../models/imagen.model';
import { CameraResultType, CameraSource, CameraPhoto } from '@capacitor/camera';
import {Capacitor} from '@capacitor/core';@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private imagenes: Imagen[] = [];

  getImagenes(): Imagen[] {
    return this.imagenes;
  }

  addImagen(imagen: Imagen) {
    this.imagenes.push(imagen);
  }

  eliminarImagen(index: number) {
    if (index >= 0 && index < this.imagenes.length) {
      this.imagenes.splice(index, 1);
    }
  }
  async capturarImagen(): Promise<Imagen | undefined> {
    try {
      const photo: CameraPhoto = await Capacitor.Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
        quality: 100,
      });

      const tipo_doc = TipoDocumento.DNI;
      const num_pag = 1;
      const notas = '';

      const nuevaImagen: Imagen = {
        tipo_doc,
        num_pag,
        notas,
        imageData: photo.dataUrl || '',
      };

      return nuevaImagen;
    } catch (error) {
      console.error('Error al capturar la imagen:', error);
      return undefined;
    }
  }

}
