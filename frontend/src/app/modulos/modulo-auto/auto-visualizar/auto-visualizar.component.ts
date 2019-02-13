import { Component, OnInit } from '@angular/core';
import {Auto} from "../../../interfaces/auto";
import {AutoRestService} from "../../../servicios/rest/auto-rest.service";

@Component({
  selector: 'app-auto-visualizar',
  templateUrl: './auto-visualizar.component.html',
  styleUrls: ['./auto-visualizar.component.css']
})
export class AutoVisualizarComponent implements OnInit {

  autos: Auto[] = [];

  constructor(
    private readonly _autoRest: AutoRestService
  ) {

  }

  ngOnInit() {
    const autos$ = this._autoRest.findAll();
    autos$.subscribe(
      (autos) => this.autos = autos
    );
  }

  eliminarAuto(id: number|string){
    const eliminarAuto = this._autoRest.delete(id);
    eliminarAuto.subscribe(
      (auto) =>
        this.autos.splice(this.autos.findIndex( (m)=> m.id === auto.id),1)
    );
  }
}
