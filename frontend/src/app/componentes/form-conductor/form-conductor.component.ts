import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Conductor} from "../../interfaces/conductor";
import {AuthService} from "../../servicios/rest/auth.service";

@Component({
  selector: 'app-form-conductor',
  templateUrl: './form-conductor.component.html',
  styleUrls: ['./form-conductor.component.css']
})
export class FormConductorComponent implements OnInit {

  conductor = <Conductor>{};
  nombreButton: string = " ";

  @Input()
  conductorAux: Conductor;

  @Input()
  nombreButtonAux: string;

  @Output()
  formularioValido = new EventEmitter();

  constructor(
    private readonly _authService: AuthService
  ) { }

  ngOnInit() {
    this.nombreButton = this.nombreButtonAux;
    if(this.conductorAux != null)
      this.conductor = JSON.parse(JSON.stringify(this.conductorAux));
      // this.conductor.idUsuario = this._authService.usuario.id;
  }

  emitirFormulario(){
    this.formularioValido.emit(this.conductor);
  }

}
