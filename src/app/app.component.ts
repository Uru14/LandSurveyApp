import {Component, OnInit} from '@angular/core';
import { NetStatusService } from './services/net-status.service';
import {JWTTokenService} from "./services/jwtTokenService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'metatierrascol-front';
  constructor(public netStatusService: NetStatusService, public tokenService: JWTTokenService){
  }
  ngOnInit(): void {

  }

}

