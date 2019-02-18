import {Component, OnInit} from '@angular/core';
import {Evento} from "../../../interfaces/evento";
import {ActivatedRoute, Router} from "@angular/router";
import {EventoRestService} from "../../../servicios/rest/evento-rest.service";

@Component({
  selector: 'app-evento-actualizar',
  templateUrl: './evento-actualizar.component.html',
  styleUrls: ['./evento-actualizar.component.css']
})
export class EventoActualizarComponent implements OnInit {

  eventoActualizar : Evento;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _eventoRest: EventoRestService,
    private readonly _route: Router
  ) { }

  ngOnInit() {
    const rutaActiva$ = this._activatedRoute.params;
    rutaActiva$
      .subscribe(
        (parametros) => {
          const evento$ = this._eventoRest.findEventoById(parametros.idEvento);
          evento$
            .subscribe(
              (eve: Evento) => {
                this.eventoActualizar = eve;
              }
            );
        }
      );
  }

  actualizarEvento(eventoAc) {
    console.log(eventoAc);
    const evento$ = this._eventoRest.updateEvento(eventoAc);
    evento$.subscribe(
      (evet) => this._route.navigate((['/usuario/gestionEvento'])),
      (error) => alert("Evento no actualizado")
    )
  }
}
