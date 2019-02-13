import { Component, OnInit } from '@angular/core';
import {Auto} from "../../../interfaces/auto";
import {ActivatedRoute, Router} from "@angular/router";
import {EventoRestService} from "../../../servicios/rest/evento-rest.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-evento-ver-auto',
  templateUrl: './evento-ver-auto.component.html',
  styleUrls: ['./evento-ver-auto.component.css']
})
export class EventoVerAutoComponent implements OnInit {

  autos: Auto[] = [];
  nombreEvento:string = "";
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _eventoRest: EventoRestService
  ) { }

  ngOnInit() {
    const rutaActiva$ = this._activatedRoute.params;
    rutaActiva$
      .subscribe(
        (parametros) => {
          const auto$ = this._eventoRest.findAutoByEvento(parametros.idEvento);
          const evento$ =  this._eventoRest.findEventoById(parametros.idEvento);
          evento$.subscribe(
            (eve) => this.nombreEvento = eve.nombre
          );
          const auto = auto$
            .pipe(
              map(m => m.map(auto => auto.idAuto))
            );
          auto.subscribe(
            (m:Auto[]) => {
              if(!(m.length>0))
                alert("No existe autos");
              this.autos = m
            }
          )
        }
      );


  }

}
