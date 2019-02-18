import {Component, OnInit} from '@angular/core';
import {Evento} from "../../../interfaces/evento";
import {EventoRestService} from "../../../servicios/rest/evento-rest.service";
import {AuthService} from "../../../servicios/rest/auth.service";
import {Usuario} from "../../../interfaces/usuario";
import {Roles} from "../../../interfaces/Roles";

@Component({
  selector: 'app-evento-ver',
  templateUrl: './evento-ver.component.html',
  styleUrls: ['./evento-ver.component.css']
})
export class EventoVerComponent implements OnInit {

  eventos: Evento[];
  eventosAux: Evento[];
  usuarioActual: Usuario;
  elementoABuscar: string = '';

  constructor(
    private readonly _eventoRest: EventoRestService,
    private readonly _authService: AuthService,
  ) {
    this._authService.usuarioActual.subscribe(x => this.usuarioActual = x);
  }

  ngOnInit() {
    const eventos$ = this._eventoRest.findAllEventos();
    eventos$.subscribe(
      (eventos: Evento[]) => {
        this.eventos = eventos;
        this.eventosAux = eventos;
      })
  }

  get isUser() {
    if(this.usuarioActual){
      return this.usuarioActual.roles.some(rol=>rol.nombre===Roles.USUARIO)
    } else
      return false ;
  }

  get isCashier() {
    if(this.usuarioActual){
      return this.usuarioActual.roles.some(rol=>rol.nombre===Roles.CAJERO)
    } else
      return false ;
  }

  buscar() {
    if(this.elementoABuscar!=""){
      this.eventos = this.eventosAux.filter(evento =>{
        return evento.nombre.toLowerCase().includes(this.elementoABuscar.toLowerCase())
      })
    } else {
      this.eventos = this.eventosAux;
    }
  }
}
