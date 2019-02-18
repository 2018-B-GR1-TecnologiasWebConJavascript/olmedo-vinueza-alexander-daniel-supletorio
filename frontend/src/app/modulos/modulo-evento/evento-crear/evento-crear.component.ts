import {Component, OnInit} from '@angular/core';
import {EventoRestService} from "../../../servicios/rest/evento-rest.service";
import {Evento} from "../../../interfaces/evento";
import {Router} from "@angular/router";

@Component({
  selector: 'app-evento-crear',
  templateUrl: './evento-crear.component.html',
  styleUrls: ['./evento-crear.component.css']
})
export class EventoCrearComponent implements OnInit {

  constructor(
    private readonly _eventoRest: EventoRestService,
    private readonly _route: Router
  ) {
  }

  ngOnInit() {
  }

  crearEvento(evento: Evento) {
    const evento$ = this._eventoRest.create(evento);
    evento$.subscribe(
      (even) => this._route.navigate((['/eventos'])),
      (error) => alert("Evento no a sido creado, verifique que el evento no exista")
    )
  }
}
