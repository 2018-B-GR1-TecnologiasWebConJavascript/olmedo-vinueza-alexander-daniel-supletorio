import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Conductor} from "../../interfaces/conductor";
import {Auto} from "../../interfaces/auto";
import {AutoRestService} from "../../servicios/rest/auto-rest.service";
import {isObject} from "rxjs/internal-compatibility";
import {ConductorRestService} from "../../servicios/rest/conductor-rest.service";

@Component({
  selector: 'app-form-auto',
  templateUrl: './form-auto.component.html',
  styleUrls: ['./form-auto.component.css']
})
export class FormAutoComponent implements OnInit {

  conductores : Conductor[] =[];
  auto = <Auto>{};
  nombreButton: string = " ";
  idConductorAux:string = "";

  @Input()
  autoAux: Conductor;

  @Input()
  nombreButtonAux: string;

  @Output()
  formularioValido = new EventEmitter();

  constructor(
    private readonly _conductorRest: ConductorRestService
  ) {

  }

  ngOnInit() {
    this.nombreButton = this.nombreButtonAux;
    if(this.autoAux != null){
      this.auto = JSON.parse(JSON.stringify(this.autoAux));
      if(isObject(this.auto.idConductor)){
        const conductor :Conductor = <Conductor>this.auto.idConductor;
        this.auto.idConductor = conductor.id;
      }
    }
    const conductor$ = this._conductorRest.findAll();
    conductor$.subscribe(
      (conductores) => this.conductores = conductores
    );
  }
  emitirFormulario(){
    this.formularioValido.emit(this.auto);
  }

  agregarAuto(){
    this.auto.idConductor = this.idConductorAux;
  }

}
