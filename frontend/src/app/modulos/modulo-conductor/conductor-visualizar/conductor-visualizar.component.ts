import { Component, OnInit } from '@angular/core';
import {Conductor} from "../../../interfaces/conductor";
import {ConductorRestService} from "../../../servicios/rest/conductor-rest.service";
import {AuthService} from "../../../servicios/rest/auth.service";

@Component({
  selector: 'app-conductor-visualizar',
  templateUrl: './conductor-visualizar.component.html',
  styleUrls: ['./conductor-visualizar.component.css']
})
export class ConductorVisualizarComponent implements OnInit {

  conductores: Conductor[];
  conductoresAux: Conductor[];
  elementoABuscar: string = '';

  constructor(
    private readonly _conductorRest: ConductorRestService,
    private readonly _authService: AuthService
  ) { }

  ngOnInit() {
    const conductores$ = this._conductorRest.findAll();
    conductores$.subscribe(
      (conductores) => {
        this.conductores = conductores.filter(conductor =>{
          return conductor.usuario.id == this._authService.currentUserValue.id
        });
        this.conductoresAux = this.conductores;
        this._conductorRest.conductoresUsuarioActual = this.conductoresAux;
      }
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

  buscar() {
    if(this.elementoABuscar!=""){
      this.conductores = this.conductoresAux.filter(conductor =>{
        return conductor.nombres.toLowerCase().includes(this.elementoABuscar.toLowerCase()) || conductor.apellidos.toLowerCase().includes(this.elementoABuscar.toLowerCase())
      })
    } else {
      this.conductores = this.conductoresAux;
    }
  }

}
