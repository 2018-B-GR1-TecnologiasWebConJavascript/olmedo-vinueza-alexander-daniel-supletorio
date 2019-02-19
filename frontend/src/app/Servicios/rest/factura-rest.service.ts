import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {FacturaCabecera} from "../../interfaces/factura";
import {Evento} from "../../interfaces/evento";

@Injectable({
  providedIn: 'root'
})
export class FacturaRestService {

  eventoActualId: number;
  facturaActual: any;

  nombreModelo: String = '/facturacabecera';

  constructor(
    private readonly _httpClient: HttpClient
  ) {
  }

  findAllFacturas(): Observable<any> {
    const facturas$ = this._httpClient
      .get(environment.url + this.nombreModelo)
      .pipe(map(e => <any>e));
    return facturas$;
  }

  create(facturaCabecera: FacturaCabecera): Observable<FacturaCabecera> {
    const url = environment.url + '/facturacabecera';
    return this._httpClient
      .post(url, facturaCabecera)
      .pipe(map(r => <FacturaCabecera>r)); // Castear
  }
}
