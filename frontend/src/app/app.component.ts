import {Component} from '@angular/core';
import {AuthService} from "./servicios/rest/auth.service";
import {UsuarioRestService} from "./servicios/rest/usuario-rest.service";
import {Router} from "@angular/router";
import {Usuario} from "./interfaces/usuario";
import {Roles} from "./interfaces/Roles";
import {log} from "util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usuarioActual: Usuario;

  constructor(
    private readonly _authService: AuthService,
    private readonly _usuarioService: UsuarioRestService,
    private readonly _router: Router
  ) {
    this._authService.usuarioActual.subscribe(x => this.usuarioActual = x);
  }

  get isAdmin() {
    if(this.usuarioActual){
      return this.usuarioActual.roles.some(rol=>rol.nombre===Roles.ADMINISTRADOR)
    } else
    return false ;
  }

  get isUser() {
    if(this.usuarioActual){
      return this.usuarioActual.roles.some(rol=>rol.nombre===Roles.USUARIO)
    } else
      return false ;
  }

  get isClient() {
    if(this.usuarioActual){
      return this.usuarioActual.roles.some(rol=>rol.nombre===Roles.CLIENTE)
    } else
      return false ;
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }

}
