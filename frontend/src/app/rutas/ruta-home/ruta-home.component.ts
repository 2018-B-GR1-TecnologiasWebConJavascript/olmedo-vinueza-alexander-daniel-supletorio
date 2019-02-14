import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../interfaces/usuario";
import {AuthService} from "../../servicios/rest/auth.service";

@Component({
  selector: 'app-ruta-home',
  templateUrl: './ruta-home.component.html',
  styleUrls: ['./ruta-home.component.css']
})
export class RutaHomeComponent implements OnInit {

  currentUserName: string;

  constructor(private readonly _authService: AuthService) {
    if(this._authService.currentUserValue){
      this.currentUserName = this._authService.currentUserValue.nombre;
    } else {
      this.currentUserName = 'Invitado'
    }
  }

  ngOnInit() {
  }

}
