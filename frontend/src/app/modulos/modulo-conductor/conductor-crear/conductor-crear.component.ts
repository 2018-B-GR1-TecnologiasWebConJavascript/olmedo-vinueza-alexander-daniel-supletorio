import {Component, OnInit} from '@angular/core';
import {ConductorRestService} from "../../../servicios/rest/conductor-rest.service";
import {Router} from "@angular/router";
import {Conductor} from "../../../interfaces/conductor";

@Component({
  selector: 'app-conductor-crear',
  templateUrl: './conductor-crear.component.html',
  styleUrls: ['./conductor-crear.component.css']
})
export class ConductorCrearComponent implements OnInit {

  constructor(
    private readonly _conductorRest: ConductorRestService,
    private readonly _route: Router
  ) {
  }

  ngOnInit() {
  }

  crearConductor(conductor: Conductor){
    const evento$ = this._conductorRest.create(conductor);
    evento$.subscribe(
      (even) => this._route.navigate((['/usuario/gestionConductor'])),
      (error) => alert("No se ha podido crear el conductor")
    )
  }

}
