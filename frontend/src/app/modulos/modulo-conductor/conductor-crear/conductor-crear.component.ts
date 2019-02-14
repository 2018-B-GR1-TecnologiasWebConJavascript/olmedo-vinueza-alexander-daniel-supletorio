import {Component, OnInit} from '@angular/core';
import {ConductorRestService} from "../../../servicios/rest/conductor-rest.service";
import {Router} from "@angular/router";
import {Conductor} from "../../../interfaces/conductor";
import {AuthService} from "../../../servicios/rest/auth.service";

@Component({
  selector: 'app-conductor-crear',
  templateUrl: './conductor-crear.component.html',
  styleUrls: ['./conductor-crear.component.css']
})
export class ConductorCrearComponent implements OnInit {

  constructor(
    private readonly _conductorRest: ConductorRestService,
    private readonly _route: Router,
    private readonly _authService: AuthService
  ) {
  }

  ngOnInit() {
  }

  crearConductor(conductor: any){
    conductor.usuario = this._authService.currentUserValue.id;
    console.log(conductor);
    const evento$ = this._conductorRest.create(conductor);
    evento$.subscribe(
      (even) => this._route.navigate((['/usuario/gestionConductor'])),
      (error) => {
        console.log(error);
        alert("No se ha podido crear el conductor")
      }
    )
  }

}
