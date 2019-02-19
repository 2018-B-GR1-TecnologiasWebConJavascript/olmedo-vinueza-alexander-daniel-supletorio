import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {FacturaCabecera} from "../../../interfaces/factura";
import {FacturaRestService} from "../../../servicios/rest/factura-rest.service";
import {AuthService} from "../../../servicios/rest/auth.service";

@Component({
  selector: 'app-factura-visualizar',
  templateUrl: './factura-visualizar.component.html',
  styleUrls: ['./factura-visualizar.component.css']
})
export class FacturaVisualizarComponent implements OnInit {

  facturas: FacturaCabecera[];
  facturasAux: FacturaCabecera[];
  elementoABuscar = '';
  selected = '';

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _facturaRestService: FacturaRestService,
    private readonly _authService: AuthService,
    private readonly _router: Router,
  ) {
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
                return factura.evento.id == parametros.idEvento && factura.cajero.id == this._authService.currentUserValue.id;
              });
              this.facturasAux = this.facturas;
            }
          );
        }
      );
  }

  buscar() {
    if (this.elementoABuscar != "") {
      this.facturas = this.facturasAux.filter(factura => {
        return factura.cliente.nombre.toLowerCase().includes(this.elementoABuscar.toLowerCase())
      })
    } else {
      this.facturas = this.facturasAux;
    }
  }

  filtrar() {
    this.facturas = this.facturasAux.filter(factura => {
      return factura.estado.toLowerCase().includes(this.selected.toLowerCase())
    })
  }

  gestionar(factura: any){
    console.log(factura);
    this._facturaRestService.facturaActual = factura;
    this._router.navigate((['/eventos/gestionarFactura']))

  }

}
