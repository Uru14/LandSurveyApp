import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainScreenComponent} from "./main-screen/main-screen.component";
import {NuevoPredioComponent} from "./nuevo-predio/nuevo-predio.component";
import {DigitalizarComponent} from "./nuevo-predio/digitalizar/digitalizar.component";

const routes: Routes = [
  {path: '', component: MainScreenComponent, pathMatch: 'full'},
  { path: 'nuevo-predio', component: NuevoPredioComponent},
  { path: 'nuevo-predio/digitalizar', component: DigitalizarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
