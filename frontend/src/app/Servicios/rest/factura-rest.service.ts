import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FacturaRestService {

  nombreModelo:String = '/facturacabecera';

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  findAllFacturas():Observable<any>{
    const facturas$ = this._httpClient
      .get(environment.url + this.nombreModelo )
      .pipe(map(e => <any> e));
    return facturas$;
  }
}
