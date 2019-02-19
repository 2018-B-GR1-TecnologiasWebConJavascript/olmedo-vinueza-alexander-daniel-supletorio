import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {FacturaCabecera} from "../../interfaces/factura";
import {Evento} from "../../interfaces/evento";
import {FacturaDetalle} from "../../interfaces/facturadetalle";

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

  findAllFacturaDetalles(): Observable<FacturaDetalle[]> {
    const facturaDetalles$ = this._httpClient
      .get(environment.url + "/facturadetalle")
      .pipe(map(e => <FacturaDetalle[]>e));
    return facturaDetalles$;
  }

  createFacturaCabecera(facturaCabecera: FacturaCabecera): Observable<FacturaCabecera> {
    const url = environment.url + '/facturacabecera';
    return this._httpClient
      .post(url, facturaCabecera)
      .pipe(map(r => <FacturaCabecera>r)); // Castear
  }

  updateFacturaCabecera(facturaCabecera: FacturaCabecera): Observable<FacturaCabecera> {
    const url = environment.url + '/facturacabecera/' + facturaCabecera.id;
    delete facturaCabecera.id;
    return this._httpClient
      .patch(url, facturaCabecera)
      .pipe(map(r => <FacturaCabecera>r)); // Castear
  }

  createFacturaDetalle(facturaDetalle: FacturaDetalle): Observable<FacturaDetalle> {
    const url = environment.url + '/facturadetalle';
    return this._httpClient
      .post(url, facturaDetalle)
      .pipe(map(r => <FacturaDetalle>r)); // Castear
  }
}
