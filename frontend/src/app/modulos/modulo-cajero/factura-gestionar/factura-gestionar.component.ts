import { Component, OnInit } from '@angular/core';
import {FacturaCabecera} from "../../../interfaces/factura";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuarioRestService} from "../../../servicios/rest/usuario-rest.service";
import {Roles} from "../../../interfaces/Roles";
import {Evento} from "../../../interfaces/evento";

@Component({
  selector: 'app-factura-gestionar',
  templateUrl: './factura-gestionar.component.html',
  styleUrls: ['./factura-gestionar.component.css']
})
export class FacturaGestionarComponent implements OnInit {

  facturaCabeceraForm: FormGroup;
  facturaActual: FacturaCabecera;
  listaClientes: any;
  submitted = false;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _usuarioRestService: UsuarioRestService
  ) { }

  ngOnInit() {
    this.submitted = false;
    const clientes$ = this._usuarioRestService.findAll();
    clientes$.subscribe(
      (usuarios) => {
        this.listaClientes = usuarios.filter(usuario =>{
          return usuario.roles.some(rol=>rol.nombre===Roles.CLIENTE)
        });
      }
    );

    this.facturaCabeceraForm = this._formBuilder.group({
      nombre: ['', [
        Validators.required
      ]],
      cedula_o_ruc: ['', [
        Validators.required,
        Validators.pattern(/^[0-9-]*$/i)
      ]],
      telefono: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]*$/i)
      ]],
      correo_electronico: ['', [
        Validators.required,
        Validators.email
      ]],
      fecha: ['', [
        Validators.required
      ]],
      direccion:['', [
        Validators.required
      ]],
      estado: new FormControl(''),
      tipo_pago:['', [
        Validators.required
      ]],
      total: new FormControl(''),
    });
    this.facturaCabeceraForm.get('estado').setValue('En compra');
    this.facturaCabeceraForm.get('total').setValue(0.0);
  }

  get f() {
    return this.facturaCabeceraForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.facturaCabeceraForm.invalid) {
      return;
    }

  }

}
