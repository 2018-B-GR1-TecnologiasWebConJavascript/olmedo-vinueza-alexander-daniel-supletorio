import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../servicios/rest/auth.service";
import {Router} from "@angular/router";
import {UsuarioRestService} from "../../servicios/rest/usuario-rest.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-ruta-login',
  templateUrl: './ruta-login.component.html',
  styleUrls: ['./ruta-login.component.css']
})
export class RutaLoginComponent implements OnInit {

  usuario = {
    correo: '',
    password: ''
  };

  constructor(
    private readonly _authService: AuthService,
    private readonly _usuarioService: UsuarioRestService,
    private readonly _router: Router) {
  }

  ngOnInit() {
  }

  login() {

    this._authService.login(this.usuario.correo,this.usuario.password)
      .pipe(first())
      .subscribe(
        data => {
          this._router.navigate(['/']);
        }, error => {
          console.log(error)
        }
      )

    // const respuestaLogin$ = this._authService
    //   .login(
    //     this.usuario.correo,
    //     this.usuario.password
    //   );
    //
    // respuestaLogin$
    //   .subscribe(
    //     (usuario) => {
    //       this._authService.usuario = usuario;
    //       this._usuarioService.findRolPorUsuario(
    //         usuario.id
    //       ).subscribe(
    //         (roles) => {
    //           this._authService.roles = roles;
    //         }, (error) => {
    //           console.log(error)
    //         }
    //       );
    //       const url = [
    //         '/',
    //         'usuario'
    //       ];
    //       alert('Login exitoso');
    //       this._router.navigate(url);
    //       console.log(usuario);
    //     },
    //     (error) => {
    //       alert('Verifique el usuario y la contraseña');
    //       console.error(error);
    //     }
    //   );

  }

}
