import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Evento} from "../../interfaces/evento";

@Component({
  selector: 'app-form-evento',
  templateUrl: './form-evento.component.html',
  styleUrls: ['./form-evento.component.css']
})
export class FormEventoComponent implements OnInit {

  evento = <Evento>{};
  nombreButton: string = " ";

  @Input()
  eventAux: Evento;

  @Input()
  nombreButtonAux: string;

  @Output()
  formularioValido = new EventEmitter();


  constructor() { }
  ngOnInit() {
    this.nombreButton = this.nombreButtonAux;
    if(this.eventAux != null)
      this.evento = JSON.parse(JSON.stringify(this.eventAux));
  }

  emitirFormulario(){
    this.formularioValido.emit(this.evento);
  }

}
