import {Component, OnInit} from '@angular/core';
import {Evento} from "../../../interfaces/evento";
import {EventoRestService} from "../../../servicios/rest/evento-rest.service";

@Component({
  selector: 'app-evento-ver',
  templateUrl: './evento-ver.component.html',
  styleUrls: ['./evento-ver.component.css']
})
export class EventoVerComponent implements OnInit {

  eventos: Evento[] = [];

  constructor(
    private readonly _eventoRest: EventoRestService
  ) {
  }

  ngOnInit() {
    const eventos$ = this._eventoRest.findAllEventos();
    eventos$.subscribe(
      (eve: Evento[]) => this.eventos = eve)
  }
}
