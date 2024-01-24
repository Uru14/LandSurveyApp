import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Preferences} from "@capacitor/preferences";
import { lastValueFrom } from 'rxjs';
import JSZip from 'jszip';
import {PredioService} from "./PredioService";
import {Predio} from "../models/predio.model";
import {MatSnackBar} from "@angular/material/snack-bar";

interface AuthResponse {
  token: string;
}
@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl: string = '';
  private user: string = '';
  private password: string = '';

  constructor(private http: HttpClient, private predioService: PredioService, private snackBar: MatSnackBar) {

  }

  async cargarConfiguracion() {

    const apiUrlData = await Preferences.get({ key: 'apiUrl' });
    const userData = await Preferences.get({ key: 'user' });
    const passwordData = await Preferences.get({ key: 'password' });

    this.apiUrl = apiUrlData.value || '';
    this.user = userData.value || '';
    this.password = passwordData.value || '';

    console.log("la información cargada es: " ,this.apiUrl, this.user, this.password)
  }

  async autenticar() {
    const url = `${this.apiUrl}core/knox/login/`;

    console.log("la información cargada en la función autenticar es: " ,this.apiUrl, this.user, this.password)
    const body = { username: this.user, password: this.password };
    console.log("el body es: ", body);

    try {
      const response = await lastValueFrom(this.http.post<AuthResponse>(url, body));
      if (response && response.token) {
        const token = response.token;
        await Preferences.set({ key: 'authToken', value: token });
        console.log('Autenticación exitosa, token guardado:', token);
        return token;
      } else {
        console.error('Autenticación fallida: Respuesta no válida de la API', response);
        throw new Error('Autenticación fallida: Respuesta no válida de la API');
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      this.snackBar.open('Error en la autenticación: ' + error, 'Cerrar', { duration: 5000 });

      throw error;
    }
  }

  async obtenerContenidoArchivo(url: string): Promise<Blob> {
    // Verifica si la URL es un blob local
    if (url.startsWith('blob:')) {
      // Convierte blob URL a Blob
      const response = await fetch(url);
      return await response.blob();
    } else {
      // Si es una URL remota, se puede obtener directamente como un Blob
      const response = await fetch(url);
      return await response.blob();
    }
  }

  obtenerNombreArchivo(url: string): string {
    // Extrae el nombre del archivo de la URL
    const nombreArchivo = url.split('/').pop();
    if (nombreArchivo === undefined) {
      throw new Error('No se pudo obtener el nombre del archivo');
    }
    return nombreArchivo;
  }

  async enviarDatosAPI() {
    const token = await this.autenticar();
    const predios = this.predioService.getListaPredios();

    for (const predio of predios) {
      const archivoZip = await this.crearArchivoZipParaPredio(predio);
      await this.enviarPredioAlServidor(predio, archivoZip, token);
    }
  }


  async crearArchivoZipParaPredio(predio: Predio): Promise<Blob> {
    const zip = new JSZip();
    const carpetaDocumentos = zip.folder('Documentos');
    const carpetaImagenes = zip.folder('Imagenes');

    // Agrega imágenes del predio
    if (predio.imagenes && carpetaImagenes) {
      for (let imagen of predio.imagenes) {
        if (imagen.imageData) {
          const contenidoImagen = await this.obtenerContenidoArchivo(imagen.imageData);
          carpetaImagenes.file(this.obtenerNombreArchivo(imagen.imageData), contenidoImagen);
        }
      }
    }

    // Agrega documentos del predio
    if (predio.documentos && carpetaDocumentos) {
      for (let documento of predio.documentos) {
        const carpetaImagenesDoc = carpetaDocumentos.folder(`Imagenes-${documento.id}`);
        const carpetaArchivosDoc = carpetaDocumentos.folder(`Archivos-${documento.id}`);

        // Agrega imágenes del documento
        if (documento.imagenes && carpetaImagenesDoc) {
          for (let imagenDoc of documento.imagenes) {
            if (imagenDoc) {
              const contenidoImagenDoc = await this.obtenerContenidoArchivo(imagenDoc);
              carpetaImagenesDoc.file(this.obtenerNombreArchivo(imagenDoc), contenidoImagenDoc);
            }
          }
        }

        // Agrega archivos del documento
        if (documento.pdfs && carpetaArchivosDoc) {
          for (let archivo of documento.pdfs) {
            if (archivo && archivo.name) {
              const contenidoArchivo = await archivo.arrayBuffer();
              carpetaArchivosDoc.file(archivo.name, contenidoArchivo);
            }
          }
        }
      }
    }

    // Agrega los datos del predio en formato JSON
    const jsonPredio = JSON.stringify(predio.datosPredio);
    zip.file('datosPredio.json', jsonPredio);

    // Agrega propietarios en formato JSON
    const jsonPropietarios = JSON.stringify(predio.propietarios);
    zip.file('propietarios.json', jsonPropietarios);

    // Agrega geometrías en formato JSON
    const jsonGeometrias = JSON.stringify(predio.geometrias);
    zip.file('geometrias.json', jsonGeometrias);

    // Agrega documentos en formato JSON
    const jsonDocumentos = JSON.stringify(predio.documentos);
    zip.file('documentos.json', jsonDocumentos);

    // Agrega imágenes en formato JSON
    const jsonImagenes = JSON.stringify(predio.imagenes);
    zip.file('imagenes.json', jsonImagenes);

    // Genera el contenido del ZIP
    return await zip.generateAsync({ type: 'blob' });
  }

  async enviarPredioAlServidor(predio: Predio, archivoZip: Blob, token: string) {
    const formData = new FormData();
    // Rellena el formData con los datos del predio
    if (predio.datosPredio) {
      formData.append("nombre", predio.datosPredio.nombre || 'Nombre no especificado');
      formData.append("departamento", predio.datosPredio.departamento || 'Departamento no especificado');
      formData.append("provincia", predio.datosPredio.provincia || 'Provincia no especificado');
      formData.append("sector_predio", predio.datosPredio.sectorPredio || 'Sector del predio no especificado');
      formData.append("municipio", predio.datosPredio.municipio || 'Municipio no especificado');
      formData.append("numero_predial", predio.datosPredio.numeroPredial || 'Número predial no especificado');
      formData.append("tipo", predio.datosPredio.tipo || 'Tipo no especificado');
      formData.append("complemento", predio.datosPredio.complemento || 'Complemento no especificado');
      formData.append("archivo", archivoZip, "predio.zip");
    } else {
      console.error('Datos del predio faltantes para', predio.id);
      return;
    }

    // Configuración header con el token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`,
    });

    // URL del endpoint del servidor
    const url = `${this.apiUrl}/source/archivo_zip/`;

    // Envia datos al servidor
    try {
      const response = await lastValueFrom(this.http.post(url, formData, { headers }));
      console.log("Respuesta del servidor para el predio", predio.id, ":", response);
      console.log("Predio enviado con éxito:", predio.id);
    } catch (error) {
      console.error('Error al enviar predio', predio.id, ':', error);
      this.snackBar.open('Error al enviar datos: ' + error, 'Cerrar', { duration: 5000 });

    }
  }
}

