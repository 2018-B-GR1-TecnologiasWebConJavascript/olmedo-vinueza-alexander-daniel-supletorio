import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FacturaCabecera} from "../../../interfaces/factura";
import {FacturaRestService} from "../../../servicios/rest/factura-rest.service";

@Component({
  selector: 'app-factura-visualizar',
  templateUrl: './factura-visualizar.component.html',
  styleUrls: ['./factura-visualizar.component.css']
})
export class FacturaVisualizarComponent implements OnInit {

  facturas: FacturaCabecera;
  facturasAux: FacturaCabecera;
  elementoABuscar = '';
  selected = 'estadoTodos';

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _facturaRestService: FacturaRestService
  ) { }

  ngOnInit() {
    const rutaActiva$ = this._activatedRoute.params;
    rutaActiva$
      .subscribe(
        (parametros) => {
          const facturas$ = this._facturaRestService.findAllFacturas();
          facturas$.subscribe(
            (facturas) => {
              this.facturas = facturas.filter(factura=>{
                return factura.evento.id == parametros.idEvento;
              });
              this.facturasAux = this.facturas;
              console.log(this.facturas);
            }
          );
        }
      );
  }
}
