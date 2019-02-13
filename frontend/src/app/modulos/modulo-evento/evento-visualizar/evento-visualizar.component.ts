import { Component, OnInit } from '@angular/core';
import {Evento} from "../../../interfaces/evento";
import {EventoRestService} from "../../../servicios/rest/evento-rest.service";

@Component({
  selector: 'app-evento-visualizar',
  templateUrl: './evento-visualizar.component.html',
  styleUrls: ['./evento-visualizar.component.css']
})
export class EventoVisualizarComponent implements OnInit {

  eventos: Evento[] = [];
  eventosAux: Evento[] = [];
  buscarEvento: string = "";
  constructor(
    private readonly _eventorest: EventoRestService
  ) { }

  ngOnInit() {
    const eventos$ = this._eventorest.findAllEventos();
    eventos$.subscribe(
      (e:Evento[]) => {
        this.eventos = e;
        this.eventosAux = e;
      }
    );
  }

  buscar(){
    //if(this.buscarEvento.replace(/ /g, "")!="")
    if(this.buscarEvento!="")
      this.eventos = this.eventosAux.filter( (elemento) => elemento.nombre.indexOf(this.buscarEvento) != -1);
    else
      this.eventos = JSON.parse(JSON.stringify(this.eventosAux));
  }
}
