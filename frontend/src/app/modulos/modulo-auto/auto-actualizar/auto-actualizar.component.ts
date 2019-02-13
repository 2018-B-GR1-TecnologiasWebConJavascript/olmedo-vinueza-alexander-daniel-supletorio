import { Component, OnInit } from '@angular/core';
import {Auto} from "../../../interfaces/auto";
import {ActivatedRoute, Router} from "@angular/router";
import {AutoRestService} from "../../../servicios/rest/auto-rest.service";

@Component({
  selector: 'app-auto-actualizar',
  templateUrl: './auto-actualizar.component.html',
  styleUrls: ['./auto-actualizar.component.css']
})
export class AutoActualizarComponent implements OnInit {

  autoAActualizar : Auto;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _autoRest: AutoRestService,
    private readonly _route: Router
  ) { }

  ngOnInit() {
    const rutaActiva$ = this._activatedRoute.params;
    rutaActiva$
      .subscribe(
        (parametros) => {
          const evento$ = this._autoRest.findOneById(parametros.idAuto);
          evento$
            .subscribe(
              (auto: Auto) => {
                this.autoAActualizar = auto;
              }
            );
        }
      );
  }

  actualizarAuto(autoAc: Auto) {
    if(autoAc.idConductor==="")
      autoAc.idConductor = null;
    console.log(autoAc);
    const autoAActualizar$ = this._autoRest.updateOneById(autoAc);
    autoAActualizar$.subscribe(
      (meedi) => this._route.navigate((['/usuario/gestionAuto']))
    )
  }

}
