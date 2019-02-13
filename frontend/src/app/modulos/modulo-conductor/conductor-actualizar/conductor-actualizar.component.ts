import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConductorRestService} from "../../../servicios/rest/conductor-rest.service";
import {Conductor} from "../../../interfaces/conductor";

@Component({
  selector: 'app-conductor-actualizar',
  templateUrl: './conductor-actualizar.component.html',
  styleUrls: ['./conductor-actualizar.component.css']
})
export class ConductorActualizarComponent implements OnInit {

  conductorAActualizar: Conductor;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _conductorRest: ConductorRestService,
    private readonly _route: Router
  ) { }

  ngOnInit() {
    const rutaActiva$ = this._activatedRoute.params;
    rutaActiva$
      .subscribe(
        (parametros) => {
          const conductor$ = this._conductorRest.findOneById(parametros.idConductor);
          conductor$.subscribe(
            (cond: Conductor) => {
              this.conductorAActualizar = cond;
            }
          );
        }
      );
  }

  actualizarConductor(conductorAc:Conductor) {
    const evento$ = this._conductorRest.updateOneById(conductorAc);
    evento$.subscribe(
      (evet) => this._route.navigate((['/usuario/gestionConductor'])),
      (error) => alert("Conductor no actualizado")
    )
  }

}
