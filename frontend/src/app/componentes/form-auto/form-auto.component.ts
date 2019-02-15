import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Conductor} from "../../interfaces/conductor";
import {Auto} from "../../interfaces/auto";
import {ConductorRestService} from "../../servicios/rest/conductor-rest.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-auto',
  templateUrl: './form-auto.component.html',
  styleUrls: ['./form-auto.component.css']
})
export class FormAutoComponent implements OnInit {

  conductores: Conductor[] = [];
  conductoresUsuarioActual: any;
  autoForm: FormGroup;
  loading = false;
  submitted = false;
  nombreButton: string = "";
  countries = [{'id': 1, 'name': 'India'}, {'id': 2, 'name': 'USA'}, {'id': 3, 'name': 'UK'}];

  @Input()
  autoAux: Auto;

  @Input()
  nombreButtonAux: string;

  @Output()
  formularioValido = new EventEmitter();

  constructor(
    private readonly _conductorRest: ConductorRestService,
    private readonly _formBuilder: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.conductoresUsuarioActual = this._conductorRest.conductoresUsuarioActual;
    this.autoForm = this._formBuilder.group({
      chasis: ['', [
        Validators.required
      ]],
      nombreMarca: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/i)
      ]],
      nombreModelo: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/i)
      ]],
      colorUno: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/i)
      ]],
      colorDos: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/i)
      ]],
      anio: ['', [
        Validators.required
      ]],
      conductor: ['', [
        Validators.required
      ]],
    });

    this.nombreButton = this.nombreButtonAux;
    if (this.autoAux) {
      this.autoForm.get('chasis').setValue(this.autoAux.chasis);
      this.autoForm.get('nombreMarca').setValue(this.autoAux.nombreMarca);
      this.autoForm.get('nombreModelo').setValue(this.autoAux.nombreModelo);
      this.autoForm.get('colorUno').setValue(this.autoAux.colorUno);
      this.autoForm.get('colorDos').setValue(this.autoAux.colorDos);
      this.autoForm.get('anio').setValue(this.autoAux.anio);
      this.autoForm.get('conductor').setValue(this.autoAux.conductor.id);
    }
    const conductor$ = this._conductorRest.findAll();
    conductor$.subscribe(
      (conductores) => this.conductores = conductores
    );
  }

  get f() {
    return this.autoForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.autoForm.invalid) {
      return;
    }

    let auto: Auto = {
      chasis: <number>this.f.chasis.value,
      nombreMarca: <string>this.f.nombreMarca.value,
      nombreModelo: <string>this.f.nombreModelo.value,
      colorUno: <string>this.f.colorUno.value,
      colorDos: <string>this.f.colorDos.value,
      anio: <number>this.f.anio.value,
      conductor: <number>this.f.conductor.value
    };
    this.loading = true;
    this.formularioValido.emit(auto);
  }

}
