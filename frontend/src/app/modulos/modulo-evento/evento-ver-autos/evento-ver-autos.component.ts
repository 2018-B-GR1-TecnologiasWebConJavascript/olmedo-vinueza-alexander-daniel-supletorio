import { Component, OnInit } from '@angular/core';
import {Auto} from "../../../interfaces/auto";
import {ActivatedRoute} from "@angular/router";
import {EventoRestService} from "../../../servicios/rest/evento-rest.service";

@Component({
  selector: 'app-evento-ver-autos',
  templateUrl: './evento-ver-autos.component.html',
  styleUrls: ['./evento-ver-autos.component.css']
})
export class EventoVerAutosComponent implements OnInit {

  autosActuales: Auto[];
  eventoActual: any = {
    nombre: '',
    fecha: '',
    latitud: -0.210335,
    longitud: -78.489064
  };

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _eventoRestService: EventoRestService,
  ) { }

  ngOnInit() {
    const rutaActiva$ = this._activatedRoute.params;
    rutaActiva$
      .subscribe(
        (parametros) => {
          this.findEvento(parametros.idEvento);
        }
      );
  }

  findEvento(idEvento) {
    const eventos$ = this._eventoRestService
      .findEventoById(idEvento);
    eventos$
      .subscribe(
        (evento: any) => {
          this.eventoActual = evento;
          this.autosActuales = evento.autos;
        },
        (error) => {
          console.error('Error', error);
        }
      );
  }

}
