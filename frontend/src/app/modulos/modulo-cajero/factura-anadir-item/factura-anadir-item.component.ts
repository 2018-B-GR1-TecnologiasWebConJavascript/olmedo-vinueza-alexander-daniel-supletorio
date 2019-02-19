import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {EventoRestService} from "../../../servicios/rest/evento-rest.service";
import {Roles} from "../../../interfaces/Roles";
import {FacturaRestService} from "../../../servicios/rest/factura-rest.service";
import {FacturaDetalle} from "../../../interfaces/facturadetalle";

@Component({
  selector: 'app-factura-anadir-item',
  templateUrl: './factura-anadir-item.component.html',
  styleUrls: ['./factura-anadir-item.component.css']
})
export class FacturaAnadirItemComponent implements OnInit {

  eventosPorAuto: any;
  eventoPorAutoSelected;
  precioAcordado=0;
  cantidad=1;
  facturaId;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _eventoRestService: EventoRestService,
    private readonly _facturaRestService: FacturaRestService,
    private readonly _router: Router,
  ) { }

  ngOnInit() {
    const rutaActiva$ = this._activatedRoute.params;
    rutaActiva$
      .subscribe(
        (parametros) => {
          this.facturaId=parametros.idFactura;
        }
      );
    const eventosPorAuto = this._eventoRestService.findAllEventoPorAuto();
    eventosPorAuto.subscribe(
      (eventosPorAuto) => {
        this.eventosPorAuto = eventosPorAuto.filter(eventoPorAuto => {
          return eventoPorAuto.evento_id.id == this._facturaRestService.eventoActualId;
        });
      }
    );
  }

  actualizar(){
    this.precioAcordado=this.eventoPorAutoSelected.precio_base;
  }

  anadirEvento(){
    let facturaDetalle: FacturaDetalle = {
      nombre: this.eventoPorAutoSelected.auto_id.nombreMarca + " " + this.eventoPorAutoSelected.auto_id.nombreModelo,
      cantidad: this.cantidad,
      precio: this.precioAcordado,
      total: this.cantidad * this.precioAcordado,
      factura_cabecera: this.facturaId,
      evento_por_auto: this.eventoPorAutoSelected.id
    };
    const crearDetalle$ = this._facturaRestService.createFacturaDetalle(facturaDetalle);
    crearDetalle$.subscribe(
      (facturaDetalle)=>{
        this._router.navigate(["eventos/gestionarFactura"])
      },(error => console.log(error))
      )


  }

}
