import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Evento} from "../../interfaces/evento";
import {EventoAutoInterface} from "../../interfaces/EventoAutoInterface";

@Injectable({
  providedIn: 'root'
})
export class EventoRestService {

  nombreModelo:String = '/evento';

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  findAllEventos(){
    const eventos$ = this._httpClient
      .get(environment.url + this.nombreModelo)
      .pipe(map(e => <Evento[]> e));
    return eventos$;
  }

  findEventoById(id: number | string):Observable<any>{
    const eventos$ = this._httpClient
      .get(environment.url + this.nombreModelo + `/${id}` )
      .pipe(map(e => <any> e));
    return eventos$;
  }

  findAutoByEvento(id: number | string):Observable<EventoAutoInterface[]>{
    const objeto = {
      id: id
    };
    const autos$ = this._httpClient
      .post(environment.url + "/eventoporauto/autos",objeto)
      .pipe(map(e =>  <EventoAutoInterface[]> e));
    return autos$;
  }
  
  createEventoPorAuto(eventoporauto: EventoAutoInterface):Observable<any>{
    const url = environment.url + '/eventoporauto';
    return this._httpClient
      .post(url, eventoporauto)
      .pipe(map(r => <any> r)); // Castear
  }

  eliminarAuto(auto_id: number, evento_id: number): Observable<any> {
    const url = environment.url + '/evento/eliminarAuto';
    return this._httpClient
      .post(url, {
        auto_id: auto_id,
        evento_id: evento_id
      })
      .pipe(map(r => <any>r)); // Casteo
  }

  create(evento:Evento): Observable<Evento> {
    if (!evento.latitud){
      delete evento.latitud
    }
    if (!evento.longitud){
      delete evento.longitud
    }
    const url = environment.url + '/evento';
    return this._httpClient
      .post(url, evento)
      .pipe(map(r => <Evento> r)); // Castear
  }

  updateEvento(evento: Evento) {
    const url = environment.url + '/evento'
      + '/' + evento.id;
    const objeto = {
      nombre: evento.nombre,
      fecha : evento.fecha,
      latitud : evento.latitud,
      longitud : evento.longitud,
    };
    return this._httpClient
      .put(url, objeto)
      .pipe(map(r => <Evento> r));
  }
}
