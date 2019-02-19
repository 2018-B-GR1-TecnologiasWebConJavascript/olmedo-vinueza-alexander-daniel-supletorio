import { Component, OnInit } from '@angular/core';
import {FacturaCabecera} from "../../../interfaces/factura";
import {Usuario} from "../../../interfaces/usuario";
import {ActivatedRoute, Router} from "@angular/router";
import {FacturaRestService} from "../../../servicios/rest/factura-rest.service";
import {AuthService} from "../../../servicios/rest/auth.service";
import {Roles} from "../../../interfaces/Roles";

@Component({
  selector: 'app-facturas-cliente',
  templateUrl: './facturas-cliente.component.html',
  styleUrls: ['./facturas-cliente.component.css']
})
export class FacturasClienteComponent implements OnInit {

  facturas: FacturaCabecera[];
  facturasAux: FacturaCabecera[];
  elementoABuscar = '';
  selected = '';
  usuarioActual: Usuario;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _facturaRestService: FacturaRestService,
    private readonly _authService: AuthService,
    private readonly _router: Router,
  ) {
    this._authService.usuarioActual.subscribe(x => this.usuarioActual = x);
  }

  ngOnInit() {
    const rutaActiva$ = this._activatedRoute.params;
    rutaActiva$
      .subscribe(
        (parametros) => {
          this._facturaRestService.eventoActualId = parametros.idEvento;
          const facturas$ = this._facturaRestService.findAllFacturas();
          facturas$.subscribe(
            (facturas) => {
              this.facturas = facturas.filter(factura => {
                return factura.cliente.id == this._authService.currentUserValue.id;
              });
              this.facturasAux = this.facturas;
            }
          );
        }
      );
  }

  filtrar() {
    this.facturas = this.facturasAux.filter(factura => {
      return factura.estado.toLowerCase().includes(this.selected.toLowerCase())
    })
  }

  gestionar(factura: any) {
    this._facturaRestService.facturaActual = factura;
    this._facturaRestService.esCliente = true;
    this._router.navigate((['/eventos/gestionarFactura']))
  }

  vaciarFactura() {
    this._facturaRestService.facturaActual = undefined;
  }

}
