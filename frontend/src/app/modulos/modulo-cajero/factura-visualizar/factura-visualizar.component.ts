import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {FacturaCabecera} from "../../../interfaces/factura";
import {FacturaRestService} from "../../../servicios/rest/factura-rest.service";
import {AuthService} from "../../../servicios/rest/auth.service";
import {Roles} from "../../../interfaces/Roles";
import {Usuario} from "../../../interfaces/usuario";

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

  gestionar(factura: any) {
    this._facturaRestService.facturaActual = factura;
    this._router.navigate((['/eventos/gestionarFactura']))
  }

  vaciarFactura() {
    this._facturaRestService.facturaActual = undefined;
  }

  get isCashier() {
    if(this.usuarioActual){
      return this.usuarioActual.roles.some(rol=>rol.nombre===Roles.CAJERO)
    } else
      return false ;
  }

}
