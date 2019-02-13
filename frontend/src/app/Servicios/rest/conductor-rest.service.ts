import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Conductor} from "../../interfaces/conductor";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConductorRestService {

  private nombreModelo: string = "/conductor";
  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  findAll(): Observable<Conductor[]> {
    return  this._httpClient
      .get(environment.url + this.nombreModelo)
      .pipe(map(r => <Conductor[]> r));
  }

  delete(id: number | string): Observable<Conductor> {
    return this._httpClient
      .delete(environment.url + this.nombreModelo + `/${id}`)
      .pipe(map(r => <Conductor> r));
  }

  create(conductor:Conductor): Observable<Conductor> {
    const url = environment.url + this.nombreModelo;
    return this._httpClient
      .post(url, conductor)
      .pipe(map(r => <Conductor> r));
  }

  findOneById(id: number | string): Observable<Conductor> {
    const url = environment.url + this.nombreModelo
      + '/' + id;
    return this._httpClient
      .get(url)
      .pipe(map(r => <Conductor> r));
  }

  updateOneById(conductor: Conductor) {
    const url = environment.url + this.nombreModelo
      + '/' + conductor.id;
    const objeto = {
      nombres: conductor.nombres,
      apellidos: conductor.apellidos,
      fechaNacimiento: conductor.fechaNacimiento,
      numeroAutos: conductor.numeroAutos,
      licenciaValida: conductor.licenciaValida
    }
    return this._httpClient
      .put(url, objeto)
      .pipe(map(r => <Conductor> r));
  }
}
