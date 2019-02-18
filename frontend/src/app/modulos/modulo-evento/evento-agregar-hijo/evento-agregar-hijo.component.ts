import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {EventoRestService} from "../../../servicios/rest/evento-rest.service";

@Component({
  selector: 'app-evento-agregar-hijo',
  templateUrl: './evento-agregar-hijo.component.html',
  styleUrls: ['./evento-agregar-hijo.component.css']
})
export class EventoAgregarHijoComponent implements OnInit {

  mapUrl: string;

  eventoActual: any = {
    nombre: '',
    fecha: '',
    latitud: -0.210335,
    longitud: -78.489064
  };

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private readonly _eventoRestService: EventoRestService,
  ) {
  }

  ngOnInit() {
    const rutaActiva$ = this._activatedRoute.params;
    rutaActiva$
      .subscribe(
        (parametros) => {
          console.log(parametros.idEvento);
          this.findEvento(parametros.idEvento);
        }
      );
  }

  findEvento(idEvento) {
    const roles$ = this._eventoRestService
      .findEventoById(idEvento);
    roles$
      .subscribe(
        (evento) => {
          this.eventoActual = evento;
          this.mapUrl = 'https://maps.google.com/maps?q=' + this.eventoActual.latitud + '%2C' + this.eventoActual.longitud + '&t=&z=15&ie=UTF8&iwloc=&output=embed'
        },
        (error) => {
          console.error('Error', error);
        }
      );
  }

}
