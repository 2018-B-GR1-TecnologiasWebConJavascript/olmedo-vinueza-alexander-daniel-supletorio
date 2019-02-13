import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {Auto} from "../../interfaces/auto";

@Injectable({
  providedIn: 'root'
})
export class AutoRestService {

  private nombreModelo: string = "/auto";

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  findAll(): Observable<Auto[]> {
    return  this._httpClient
      .get(environment.url + this.nombreModelo)
      .pipe(map(r => <Auto[]> r));
  }

  delete(id: number | string): Observable<Auto> {
    return this._httpClient
      .delete(environment.url + this.nombreModelo + `/${id}`)
      .pipe(map(r => <Auto> r));
  }

  create(auto:Auto): Observable<Auto> {
    const url = environment.url + this.nombreModelo;
    return this._httpClient
      .post(url, auto)
      .pipe(map(r => <Auto> r));
  }

  findOneById(id: number | string): Observable<Auto> {
    const url = environment.url + this.nombreModelo
      + '/' + id;
    return this._httpClient
      .get(url)
      .pipe(map(r => <Auto> r));
  }

  updateOneById(auto: Auto) {
    const url = environment.url + this.nombreModelo
      + '/' + auto.id;
    return this._httpClient
      .put(url, auto)
      .pipe(map(r => <Auto> r));
  }
}
