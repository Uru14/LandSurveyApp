import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import {NuevoPredioComponent} from "./nuevo-predio/nuevo-predio.component";
import {DigitalizarComponent} from "./nuevo-predio/digitalizar/digitalizar.component";
import {MapaComponent} from "./mapa/mapa.component";
import {MatMenuModule} from "@angular/material/menu";
import {PropietarioService} from "./services/PropietarioService";
import {EditarPredioComponent} from "./editar-predio/editar-predio.component";

@NgModule({
    declarations: [
        AppComponent,
        MainScreenComponent,
        NuevoPredioComponent,
        DigitalizarComponent,
        MapaComponent,
        EditarPredioComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatMenuModule,
        BrowserAnimationsModule,

    ],
    providers: [PropietarioService],
    exports: [
        MapaComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
