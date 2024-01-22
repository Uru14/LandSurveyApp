import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Preferences} from "@capacitor/preferences";
import { lastValueFrom } from 'rxjs';
import JSZip from 'jszip';
import {PredioService} from "./PredioService";
import {Predio} from "../models/predio.model";

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

  constructor(private http: HttpClient, private predioService: PredioService) {

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
    /*try {
      const response = await lastValueFrom(this.http.post(url, body));
      const token = (response as any).token as string;
      await Preferences.set({ key: 'authToken', value: token });
      console.log('Autenticación exitosa, token guardado:', token);
      return token;
    } catch (error) {
      console.error('Error en la autenticación:', error);
      throw error;
    }
  }*/
    try {
      const response = await lastValueFrom(this.http.post<AuthResponse>(url, body));
      if (response && response.token) {
        const token = response.token;
        await Preferences.set({ key: 'authToken', value: token });
        console.log('Autenticación exitosa, token guardado:', token);
        return token;
      } else {
        throw new Error('No se recibió token en la respuesta');
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      throw error;
    }
  }

 /* async crearArchivoZip() {
    const zip = new JSZip();
    const carpetaDocumentos = zip.folder("Documentos")!;
    const carpetaImagenes = zip.folder("Imagenes")!;
    const carpetaDocsImagenes = carpetaDocumentos.folder("Imagenes")!;
    const carpetaDocsArchivos = carpetaDocumentos.folder("Archivos")!;

    const predios = this.predioService.getListaPredios();

    for (let predio of predios) {
      // Agregar imágenes
      for (let imagen of predio.imagenes) {
        if (typeof imagen.imageData === 'string') {
          const contenidoImagen = await this.obtenerContenidoArchivo(imagen.imageData);
          carpetaImagenes.file(this.obtenerNombreArchivo(imagen.imageData), contenidoImagen);
        } else {
          // Manejar el caso en que 'imagen' no sea una cadena
          console.error('La imagen no es una cadena:', imagen);
        }
      }

      // Agregar documentos
      for (let documento of predio.documentos) {
        // Agregar imágenes del documento
        for (let imagenDoc of documento.imagenes) {
          const contenidoImagenDoc = await this.obtenerContenidoArchivo(imagenDoc);
          carpetaDocsImagenes.file(this.obtenerNombreArchivo(imagenDoc), contenidoImagenDoc);
        }

        // Agregar PDFs del documento
        for (let pdf of documento.pdfs) {
          const contenidoPDF = await pdf.arrayBuffer(); // Convertir el File a ArrayBuffer
          carpetaDocsArchivos.file(pdf.name, contenidoPDF);
        }
      }
    }

    const jsonPredios = JSON.stringify(predios);
    zip.file("predios.json", jsonPredios);

    const contenidoZip = await zip.generateAsync({type:"blob"});
    return contenidoZip;
  }*/
  async obtenerContenidoArchivo(url: string): Promise<Blob> {
    // Verificar si la URL es un blob local
    if (url.startsWith('blob:')) {
      // Convertir blob URL a Blob
      const response = await fetch(url);
      return await response.blob();
    } else {
      // Si es una URL remota, se puede obtener directamente como un Blob
      const response = await fetch(url);
      return await response.blob();
    }
  }

  obtenerNombreArchivo(url: string): string {
    // Extraer el nombre del archivo de la URL
    const nombreArchivo = url.split('/').pop();
    if (nombreArchivo === undefined) {
      // Manejar el caso en que el nombre del archivo no esté disponible
      throw new Error('No se pudo obtener el nombre del archivo');
    }
    return nombreArchivo;
  }

  /*async enviarDatosAPI() {
    await this.autenticar();
    await this.crearArchivoZip();
    const archivoZip = await this.crearArchivoZip();
    const datosPredio = this.predioService.getListaPredios()[0]?.datosPredio;

    if (!datosPredio) {
      throw new Error('No hay datos de predio disponibles para enviar.');
    }

    const formData = new FormData();
    formData.append("nombre", datosPredio.nombre);
    formData.append("departamento", datosPredio.departamento);
    formData.append("provincia", datosPredio.provincia);
    formData.append("sector_predio", datosPredio.sectorPredio);
    formData.append("municipio", datosPredio.municipio);
    formData.append("numero_predial", datosPredio.numeroPredial);
    formData.append("tipo", datosPredio.tipo);
    formData.append("complemento", datosPredio.complemento);
    formData.append("archivo", archivoZip, "predios.zip");

    const token = await Preferences.get({ key: 'authToken' });
    console.log("token que se va a utilizar: ", token);
    const headers = new HttpHeaders({
      'Authorization': `Token ${token.value}`
    });

    const url = `${this.apiUrl}source/archivo_zip/`;
    try {
      const response = await lastValueFrom(this.http.post(url, formData, { headers }));
      return response;
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
      throw error;
    }
  }*/

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
    // Carpetas para documentos e imágenes
    const carpetaDocumentos = zip.folder("Documentos");
    const carpetaImagenes = zip.folder("Imagenes");
    const carpetaDocsImagenes = carpetaDocumentos?.folder("Imagenes");
    const carpetaDocsArchivos = carpetaDocumentos?.folder("Archivos");

    // Agregar imágenes del predio
    if (predio.imagenes && carpetaImagenes) {
      for (let imagen of predio.imagenes) {
        if (imagen.imageData) {
          const contenidoImagen = await this.obtenerContenidoArchivo(imagen.imageData);
          carpetaImagenes.file(this.obtenerNombreArchivo(imagen.imageData), contenidoImagen);
        }
      }
    }

    // Agregar documentos del predio
    if (predio.documentos && carpetaDocumentos) {
      for (let documento of predio.documentos) {
        // Agregar imágenes del documento
        if (documento.imagenes && carpetaDocsImagenes) {
          for (let imagenDoc of documento.imagenes) {
            if (imagenDoc) {
              const contenidoImagenDoc = await this.obtenerContenidoArchivo(imagenDoc);
              carpetaDocsImagenes.file(this.obtenerNombreArchivo(imagenDoc), contenidoImagenDoc);
            }
          }
        }

        // Agregar PDFs del documento
        if (documento.pdfs && carpetaDocsArchivos) {
          for (let pdf of documento.pdfs) {
            if (pdf && pdf.name) {
              const contenidoPDF = await pdf.arrayBuffer();
              carpetaDocsArchivos.file(pdf.name, contenidoPDF);
            }
          }
        }
      }
    }

    // Agregar los datos del predio en formato JSON
    const jsonPredio = JSON.stringify(predio);
    zip.file("predio.json", jsonPredio);

    // Generar el contenido del ZIP
    return await zip.generateAsync({ type: "blob" });
  }

  async enviarPredioAlServidor(predio: Predio, archivoZip: Blob, token: string) {
    const formData = new FormData();
    // Rellenar el formData con los datos del predio
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

    // Configurar headers con el token de autenticación
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`,
    });

    // URL del endpoint del servidor
    const url = `${this.apiUrl}/source/archivo_zip/`;

    // Enviar datos al servidor
    try {
      const response = await lastValueFrom(this.http.post(url, formData, { headers }));
      console.log("Respuesta del servidor para el predio", predio.id, ":", response);
      console.log("Predio enviado con éxito:", predio.id);
    } catch (error) {
      console.error('Error al enviar predio', predio.id, ':', error);
    }
  }
}

