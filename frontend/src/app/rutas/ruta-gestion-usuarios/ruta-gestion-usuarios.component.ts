import {Component, OnInit} from '@angular/core';
import {UsuarioRestService} from "../../servicios/rest/usuario-rest.service";
import {Usuario} from "../../interfaces/usuario";

@Component({
  selector: 'app-ruta-gestion-usuarios',
  templateUrl: './ruta-gestion-usuarios.component.html',
  styleUrls: ['./ruta-gestion-usuarios.component.scss']
})
export class RutaGestionUsuariosComponent implements OnInit {

  usuarios = [];
  usuariosAux = [];

  elementoABuscar: string;

  columnas = [
    {field: 'id', header: 'Identificador'},
    {field: 'nombre', header: 'Nombre'},
    {field: 'correo', header: 'Correo'},
    {field: 'fecha_nacimiento', header: 'Fecha de Nacimiento'},
    {field: 'id', header: 'Acciones'},
  ];

  constructor(
    private readonly _usuarioRestService: UsuarioRestService
  ) {

  }

  ngOnInit() {
    // CUANDO ESTA LISTO EL WEB COMPONENT PARA MOSTRARSE
    const usuarios$ = this._usuarioRestService.findAll();

    usuarios$
      .subscribe(
        (usuarios: Usuario[]) => {
          this.usuarios = usuarios;
          this.usuariosAux = usuarios
        },
        (error) => {
          console.error('Error', error);
        }
      );
  }


  eliminar(usuario: Usuario) {

    const usuarioEliminado$ = this._usuarioRestService.eliminarUsuario(usuario.id);

    usuarioEliminado$
      .subscribe(
        (usuarioEliminado: Usuario) => {
          console.log('Se elimino:', usuarioEliminado);

          const indice = this.usuarios
            .findIndex((r) => r.id === usuario.id);

          this.usuarios.splice(indice, 1);

        },
        (error) => {
          console.error('Error', error);
        }
      );
  }

  buscar() {
    if(this.elementoABuscar!=""){
      this.usuarios = this.usuariosAux.filter(usuario =>{
        return usuario.nombre.toLowerCase().includes(this.elementoABuscar.toLowerCase()) || usuario.correo.toLowerCase().includes(this.elementoABuscar.toLowerCase())
      })
    } else {
      this.usuarios = this.usuariosAux;
    }
  }
}



