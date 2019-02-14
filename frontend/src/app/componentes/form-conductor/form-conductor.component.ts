import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Conductor} from "../../interfaces/conductor";
import {AuthService} from "../../servicios/rest/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Usuario} from "../../interfaces/usuario";

@Component({
  selector: 'app-form-conductor',
  templateUrl: './form-conductor.component.html',
  styleUrls: ['./form-conductor.component.css']
})
export class FormConductorComponent implements OnInit {

  conductorForm: FormGroup;
  loading = false;
  submitted = false;
  nombreButton: string = " ";

  @Input()
  conductorAux: Conductor;

  @Input()
  nombreButtonAux: string;

  @Output()
  formularioValido = new EventEmitter();

  constructor(
    private readonly _authService: AuthService,
    private readonly _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.conductorForm = this._formBuilder.group({
      nombres: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/i)
      ]],
      apellidos: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/i)
      ]],
      fechaNacimiento: ['', [
        Validators.required
      ]],
      numeroAutos: ['',[
        Validators.required,
      ]],
      licenciaValida: new FormControl()
    });

    if (this.conductorAux){
      this.conductorForm.get('nombres').setValue(this.conductorAux.nombres);
      this.conductorForm.get('apellidos').setValue(this.conductorAux.apellidos);
      this.conductorForm.get('fechaNacimiento').setValue(this.conductorAux.fechaNacimiento);
      this.conductorForm.get('numeroAutos').setValue(this.conductorAux.numeroAutos);
      this.conductorForm.patchValue({licenciaValida:this.conductorAux.licenciaValida})
    }

    this.nombreButton = this.nombreButtonAux;


  }

  get f() {
    return this.conductorForm.controls;
  }

  onSubmit() {

    this.submitted = true;

    if (this.conductorForm.invalid) {
      return;
    }

    let conductor: Conductor = {
      nombres: <string> this.f.nombres.value,
      apellidos: <string> this.f.apellidos.value,
      fechaNacimiento: <string> this.f.fechaNacimiento.value,
      numeroAutos: <number> this.f.numeroAutos.value,
      licenciaValida: this.f.licenciaValida.value
    };
    this.loading = true;
    this.formularioValido.emit(conductor);
  }

}
