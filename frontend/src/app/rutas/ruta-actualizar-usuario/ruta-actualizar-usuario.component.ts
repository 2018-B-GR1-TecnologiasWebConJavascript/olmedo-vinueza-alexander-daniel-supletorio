import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioRestService} from "../../servicios/rest/usuario-rest.service";
import {Usuario} from "../../interfaces/usuario";
import {Rol} from "../../interfaces/rol";

@Component({
  selector: 'app-ruta-actualizar-usuario',
  templateUrl: './ruta-actualizar-usuario.component.html',
  styleUrls: ['./ruta-actualizar-usuario.component.css']
})
export class RutaActualizarUsuarioComponent implements OnInit {
  registroRepetido=false;
  roles = [];
  rolesDeUsuario;
  rolSeleccionado: Rol = {createdAt: 1549688609424, updatedAt: 1549688609424, id: 1, nombre: "Administrador"};
  columnas = [
    {field: 'nombre', header: 'Rol'},
    {field: 'id', header: 'Acciones'},
  ];

  usuarioAActualizar: Usuario = {
    id: 0,
    nombre: '',
    correo: '',
    fecha_nacimiento: '',
    password: ''
  };

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _usuarioRestService: UsuarioRestService,
    private readonly _router: Router
  ) {
  }

  ngOnInit() {
    const rutaActiva$ = this._activatedRoute.params;
    rutaActiva$
      .subscribe(
        (parametros: ParametrosRutaActualizarUsuario) => {

          this.findRolPorUsuario(parametros.idUsuario);

          const usuario$ = this._usuarioRestService
            .findOneById(parametros.idUsuario);
          usuario$
            .subscribe(
              (usuario: Usuario) => {
                this.usuarioAActualizar = usuario;
              },
              (error) => {
                console.error('Error: ', error);
              }
            );

        }
      );
    const roles$ = this._usuarioRestService
      .findAllRoles();
    roles$
      .subscribe(
        (roles: Rol[]) => {
          this.roles = roles;
        },
        (error) => {
          console.error('Error', error);
        }
      );
  }

  agregarRol(rolSeleccionado) {

    if(this.rolesDeUsuario.some((rol)=>{return rol.nombre===this.rolSeleccionado.nombre})){
      this.registroRepetido = true;
    } else {
      this.registroRepetido=false;
      const respuestaRolUsuario$ = this._usuarioRestService
        .asignarRol(
          this.usuarioAActualizar.id,
          this.rolSeleccionado.id
        );

      respuestaRolUsuario$
        .subscribe(
          (res) => {
            this.findRolPorUsuario(this.usuarioAActualizar.id)
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }

  findRolPorUsuario(idUsuario) {
    const roles$ = this._usuarioRestService
      .findRolPorUsuario(idUsuario);
    roles$
      .subscribe(
        (roles: Rol[]) => {
          console.log(roles);
          this.rolesDeUsuario = roles;
        },
        (error) => {
          console.error('Error', error);
        }
      );
  }

  eliminarRol(rol: Rol) {

    console.log(this.usuarioAActualizar.id, rol.id)

    const rolEliminado$ = this._usuarioRestService.eliminarRol(this.usuarioAActualizar.id, rol.id);

    rolEliminado$
      .subscribe(
        (rolEliminado) => {
          console.log('Se elimino:', rolEliminado);

          const indice = this.rolesDeUsuario
            .findIndex((r) => r.id === rol.id);

          this.rolesDeUsuario.splice(indice, 1);

        },
        (error) => {
          console.error('Error', error);
        }
      );
  }
}

interface ParametrosRutaActualizarUsuario {
  idUsuario: string;
}
