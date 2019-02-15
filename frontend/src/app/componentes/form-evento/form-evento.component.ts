import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Evento} from "../../interfaces/evento";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: 'app-form-evento',
  templateUrl: './form-evento.component.html',
  styleUrls: ['./form-evento.component.css']
})
export class FormEventoComponent implements OnInit {

  evento = <Evento>{};
  nombreButton: string = "";
  eventoForm: FormGroup;
  loading = false;
  submitted = false;
  fechaActual = moment().format("YYYY-MM-DD");

  @Input()
  eventAux: Evento;

  @Input()
  nombreButtonAux: string;

  @Output()
  formularioValido = new EventEmitter();

  constructor(
    private readonly _formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.nombreButton = this.nombreButtonAux;
    this.eventoForm = this._formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/i)
      ]],
      fecha: ['', [
        Validators.required
      ]],
      latitud: new FormControl(),
      longitud: new FormControl(),
    });
  }

  get f() {
    return this.eventoForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.eventoForm.invalid) {
      return;
    }

    let evento: Evento = {
      nombre: <string>this.f.nombre.value,
      fecha: <string>this.f.fecha.value,
      latitud: <number>this.f.latitud.value,
      longitud: <number>this.f.longitud.value,
    };
    this.loading = true;
    this.formularioValido.emit(evento);
  }


}
