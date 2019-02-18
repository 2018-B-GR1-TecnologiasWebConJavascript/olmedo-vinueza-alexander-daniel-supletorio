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

  eventos: Evento[] = [];
  usuarioActual: Usuario;

  constructor(
    private readonly _eventoRest: EventoRestService,
    private readonly _authService: AuthService,
  ) {
    this._authService.usuarioActual.subscribe(x => this.usuarioActual = x);
  }

  ngOnInit() {
    const eventos$ = this._eventoRest.findAllEventos();
    eventos$.subscribe(
      (eve: Evento[]) => this.eventos = eve)
  }

  get isUser() {
    if(this.usuarioActual){
      return this.usuarioActual.roles.some(rol=>rol.nombre===Roles.USUARIO)
    } else
      return false ;
  }
}
