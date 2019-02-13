import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UsuarioRestService} from "../../servicios/rest/usuario-rest.service";
import {Usuario} from "../../interfaces/usuario";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ruta-registro',
  templateUrl: './ruta-registro.component.html',
  styleUrls: ['./ruta-registro.component.css']
})
export class RutaRegistroComponent implements OnInit {

  usuario = {
    nombre: '',
    correo: '',
    password: '',
    fecha_nacimiento: ''
  };

  constructor(private readonly _usuarioRestService: UsuarioRestService,
              private readonly _router: Router) {
  }

  ngOnInit() {
  }

  crearUsuario(){
    const crearUsuario$ = this._usuarioRestService
      .create(
        this.usuario.nombre,
        this.usuario.correo,
        this.usuario.password,
        this.usuario.fecha_nacimiento
      );

    crearUsuario$
      .subscribe(
        (usuario: Usuario)=>{
          alert(`Usuario creado: ${usuario.nombre}`);
          const url = [
            '/',
            'login'
          ];
          this._router.navigate(url);
        },
        (error) => {
          console.error('Error: ', error);
        }
      )
  }
}
