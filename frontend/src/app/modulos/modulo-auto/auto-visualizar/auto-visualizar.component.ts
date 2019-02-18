import { Component, OnInit } from '@angular/core';
import {Auto} from "../../../interfaces/auto";
import {AutoRestService} from "../../../servicios/rest/auto-rest.service";
import {AuthService} from "../../../servicios/rest/auth.service";

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
    private readonly _autoRest: AutoRestService,
    private readonly _authService: AuthService
  ) {

  }

  ngOnInit() {
    const autos$ = this._autoRest.findAll();
    autos$.subscribe(
      (autos) => {
        this.autos = autos.filter(auto=>{
          return auto.conductor.usuario == this._authService.currentUserValue.id;
        });
        this.autosAux = this.autos;
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
