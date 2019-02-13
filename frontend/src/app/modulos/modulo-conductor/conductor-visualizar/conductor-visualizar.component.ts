import { Component, OnInit } from '@angular/core';
import {Conductor} from "../../../interfaces/conductor";
import {ConductorRestService} from "../../../servicios/rest/conductor-rest.service";

@Component({
  selector: 'app-conductor-visualizar',
  templateUrl: './conductor-visualizar.component.html',
  styleUrls: ['./conductor-visualizar.component.css']
})
export class ConductorVisualizarComponent implements OnInit {

  conductores: Conductor[] = []

  constructor(
    private readonly _conductorRest: ConductorRestService
  ) { }

  ngOnInit() {
    const conductores$ = this._conductorRest.findAll();
    conductores$.subscribe(
      (conductores) => this.conductores = conductores
    );
  }

  eliminarConductor(id: number|string){
    const eliminarConductor = this._conductorRest.delete(id);
    eliminarConductor.subscribe(
      (conductor) =>
        this.conductores.splice(this.conductores.findIndex( (m)=> m.id === conductor.id),1),
      (error) => alert("No se pudo eliminar el conductor "+ id)
    );
  }

}
