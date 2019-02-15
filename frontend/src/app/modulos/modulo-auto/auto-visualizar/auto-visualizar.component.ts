import { Component, OnInit } from '@angular/core';
import {Auto} from "../../../interfaces/auto";
import {AutoRestService} from "../../../servicios/rest/auto-rest.service";

@Component({
  selector: 'app-auto-visualizar',
  templateUrl: './auto-visualizar.component.html',
  styleUrls: ['./auto-visualizar.component.css']
})
export class AutoVisualizarComponent implements OnInit {

  autos: Auto[];
  autosAux: Auto[];
  elementoABuscar : string = '';

  constructor(
    private readonly _autoRest: AutoRestService
  ) {

  }

  ngOnInit() {
    const autos$ = this._autoRest.findAll();
    autos$.subscribe(
      (autos) => {
        this.autos = autos;
        this.autosAux = this.autos
        console.log(this.autos)
      }
    );
  }

  eliminarAuto(id: number|string){
    const eliminarAuto = this._autoRest.delete(id);
    eliminarAuto.subscribe(
      (auto) =>
        this.autos.splice(this.autos.findIndex( (m)=> m.id === auto.id),1)
    );
  }

  buscar() {
    if(this.elementoABuscar!=""){
      this.autos = this.autosAux.filter(auto =>{
        return auto.chasis.toString().toLowerCase().includes(this.elementoABuscar.toLowerCase())
          || auto.nombreMarca.toLowerCase().includes(this.elementoABuscar.toLowerCase())
          || auto.nombreModelo.toLowerCase().includes(this.elementoABuscar.toLowerCase())
      })
    } else {
      this.autos = this.autosAux;
    }
  }
}
