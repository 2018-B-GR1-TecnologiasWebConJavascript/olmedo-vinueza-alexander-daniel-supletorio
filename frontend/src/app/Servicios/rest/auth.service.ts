import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Usuario} from "../../interfaces/usuario";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioActualSubject: BehaviorSubject<Usuario>;
  public usuarioActual: Observable<Usuario>;

  roles: any;

  constructor(private readonly _httpClient: HttpClient) {
    this.usuarioActualSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuarioActual')));
    this.usuarioActual = this.usuarioActualSubject.asObservable();
  }

  public get currentUserValue(): Usuario {
    return this.usuarioActualSubject.value;
  }

  login(correo: string,
        password: string) {

    const url = environment.url + '/usuario/login';

    return this._httpClient
      .post<any>(url, {
        correo: correo,
        password: password
      })
      .pipe(map(usuario => {
        if(usuario){
          localStorage.setItem('usuarioActual', JSON.stringify(usuario));
          this.usuarioActualSubject.next(usuario);
        }
        return usuario;
      }));
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('usuarioActual');
    this.usuarioActualSubject.next(null);
  }
}
