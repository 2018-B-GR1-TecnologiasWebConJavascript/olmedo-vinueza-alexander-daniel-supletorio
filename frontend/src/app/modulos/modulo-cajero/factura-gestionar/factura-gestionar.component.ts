import {Component, OnInit} from '@angular/core';
import {FacturaCabecera} from "../../../interfaces/factura";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuarioRestService} from "../../../servicios/rest/usuario-rest.service";
import {Roles} from "../../../interfaces/Roles";
import {AuthService} from "../../../servicios/rest/auth.service";
import {FacturaRestService} from "../../../servicios/rest/factura-rest.service";
import * as moment from "moment";

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
    private readonly _usuarioRestService: UsuarioRestService,
    private readonly _facturaRestService: FacturaRestService,
    private readonly _authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.facturaActual = this._facturaRestService.facturaActual;
    console.log(this.facturaActual);
    this.submitted = false;
    const clientes$ = this._usuarioRestService.findAll();
    clientes$.subscribe(
      (usuarios) => {
        this.listaClientes = usuarios.filter(usuario => {
          return usuario.roles.some(rol => rol.nombre === Roles.CLIENTE)
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
      direccion: ['', [
        Validators.required
      ]],
      estado: new FormControl(''),
      tipo_pago: ['', [
        Validators.required
      ]],
      total: new FormControl(''),
    });
    this.facturaCabeceraForm.get('estado').setValue('En compra');
    this.facturaCabeceraForm.get('total').setValue(0.0);

    if(this.facturaActual){
      this.facturaCabeceraForm.get('nombre').setValue(this.facturaActual.cliente.id);
      this.facturaCabeceraForm.get('cedula_o_ruc').setValue(this.facturaActual.cedula_o_ruc);
      this.facturaCabeceraForm.get('telefono').setValue(this.facturaActual.telefono);
      this.facturaCabeceraForm.get('correo_electronico').setValue(this.facturaActual.correo_electronico);
      this.facturaCabeceraForm.get('fecha').setValue(this.facturaActual.fecha);
      this.facturaCabeceraForm.get('direccion').setValue(this.facturaActual.direccion);
      this.facturaCabeceraForm.get('estado').setValue(this.facturaActual.estado);
      this.facturaCabeceraForm.get('tipo_pago').setValue(this.facturaActual.tipo_pago);
      this.facturaCabeceraForm.get('total').setValue(this.facturaActual.total);
    }
  }

  get f() {
    return this.facturaCabeceraForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.facturaCabeceraForm.invalid) {
      return;
    }

    let facturaCabecera: FacturaCabecera = {
      cliente: <string>this.f.nombre.value,
      cedula_o_ruc: <number>this.f.cedula_o_ruc.value,
      telefono: <number>this.f.telefono.value,
      correo_electronico: <string>this.f.correo_electronico.value,
      fecha: <string>this.f.fecha.value,
      direccion: <string>this.f.direccion.value,
      estado: <string>this.f.estado.value,
      tipo_pago: <string>this.f.tipo_pago.value,
      total: <number>this.f.total.value,
      cajero: this._authService.currentUserValue.id,
      evento: this._facturaRestService.eventoActualId
    };


    const factura$ = this._facturaRestService.create(facturaCabecera);
    factura$.subscribe(
      (facturaCabecera) => {
        this.facturaActual = facturaCabecera
      },
      (error) => {
        console.log(error);
        alert("No se ha podido crear la factura")
      }
    )


  }

}
