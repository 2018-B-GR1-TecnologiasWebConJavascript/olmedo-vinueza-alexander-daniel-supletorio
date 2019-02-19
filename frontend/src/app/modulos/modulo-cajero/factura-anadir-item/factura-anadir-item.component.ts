import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormGroup} from "@angular/forms";
import {EventoRestService} from "../../../servicios/rest/evento-rest.service";
import {Roles} from "../../../interfaces/Roles";
import {FacturaRestService} from "../../../servicios/rest/factura-rest.service";

@Component({
  selector: 'app-factura-anadir-item',
  templateUrl: './factura-anadir-item.component.html',
  styleUrls: ['./factura-anadir-item.component.css']
})
export class FacturaAnadirItemComponent implements OnInit {

  eventosPorAuto: any;
  autoSelected;
  precioAcordado=0;
  cantidad=0;

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _eventoRestService: EventoRestService,
    private readonly _facturaRestService: FacturaRestService,
  ) { }

  ngOnInit() {
    const rutaActiva$ = this._activatedRoute.params;
    rutaActiva$
      .subscribe(
        (parametros) => {
          console.log(parametros.idFactura);
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
    this.precioAcordado=this.autoSelected.precio_base;
  }

  anadirEvento(){

  }

}
