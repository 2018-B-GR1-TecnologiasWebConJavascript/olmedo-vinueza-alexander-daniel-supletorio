import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Evento} from "../../../interfaces/evento";

@Component({
  selector: 'app-evento-agregar-hijo',
  templateUrl: './evento-agregar-hijo.component.html',
  styleUrls: ['./evento-agregar-hijo.component.css']
})
export class EventoAgregarHijoComponent implements OnInit {

  eventoActual: any = {
    nombre: '',
    fecha: '',
    latitud: -0.210335,
    longitud: -78.489064
  };

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    const rutaActiva$ = this._activatedRoute.params;
    rutaActiva$
      .subscribe(
        (parametros) => {
          console.log(parametros.idEvento)
        }
      );
  }

}
