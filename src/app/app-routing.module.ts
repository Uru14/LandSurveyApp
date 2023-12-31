import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainScreenComponent} from "./main-screen/main-screen.component";
import {NuevoPredioComponent} from "./nuevo-predio/nuevo-predio.component";
import {DigitalizarComponent} from "./nuevo-predio/digitalizar/digitalizar.component";
import {DatosPropietarioComponent} from "./nuevo-predio/datos-propietario/datos-propietario.component";
import {AddPropietarioComponent} from "./nuevo-predio/datos-propietario/add-propietario/add-propietario.component";
import {EditarPropietarioComponent} from "./nuevo-predio/datos-propietario/editar-propietario/editar-propietario.component";
import {DatosPredioComponent} from "./nuevo-predio/datos-predio/datos-predio.component";
import {EditarPredioListaComponent} from "./editar-predio-lista/editar-predio-lista.component";
import {EditarPredioComponent} from "./editar-predio/editar-predio.component";
import {EditarDatosPredioComponent} from "./editar-predio/editar-datos-predio/editar-datos-predio.component";
import {DocumentosComponent} from "./nuevo-predio/documentos/documentos.component";
import {AddDocumentoComponent} from "./nuevo-predio/documentos/add-documento/add-documento.component";
import {EditarDocumentoComponent} from "./nuevo-predio/documentos/editar-documento/editar-documento.component";
import {ImagenesComponent} from "./nuevo-predio/imagenes/imagenes.component";
import {AddImagenComponent} from "./nuevo-predio/imagenes/add-imagen/add-imagen.component";

const routes: Routes = [
  {path: '', component: MainScreenComponent, pathMatch: 'full'},
  { path: 'editar-predio-lista', component: EditarPredioListaComponent },
  { path: 'editar-predio/:id', component: EditarPredioComponent },
  { path: 'editar-predio/:id/editar-datos-predio', component: EditarDatosPredioComponent },
  { path: 'editar-datos-predio/:id', component: EditarDatosPredioComponent },
  { path: 'nuevo-predio/:id', component: NuevoPredioComponent},
  { path: 'nuevo-predio/:id/datos-predio', component: DatosPredioComponent},
  { path: 'nuevo-predio/:id/digitalizar', component: DigitalizarComponent },
  { path: 'nuevo-predio/:id/documentos', component: DocumentosComponent },
  { path: 'nuevo-predio/:id/documentos/add-documento', component: AddDocumentoComponent },
  { path: 'nuevo-predio/:id/documentos/editar-documento/:i', component: EditarDocumentoComponent },
  { path: 'nuevo-predio/:id/datos-propietario', component: DatosPropietarioComponent},
  { path: 'nuevo-predio/:id/imagenes', component: ImagenesComponent},
  { path: 'nuevo-predio/:id/imagenes/add-imagen', component: AddImagenComponent},
  { path: 'nuevo-predio/:id/datos-propietario/add-propietario', component: AddPropietarioComponent },
  { path: 'nuevo-predio/:id/datos-propietario/editar-propietario/:dni', component: EditarPropietarioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
