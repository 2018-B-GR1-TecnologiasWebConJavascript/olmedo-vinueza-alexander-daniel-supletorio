import {Component, OnInit} from '@angular/core';
import {FacturaCabecera} from "../../../interfaces/factura";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuarioRestService} from "../../../servicios/rest/usuario-rest.service";
import {Roles} from "../../../interfaces/Roles";
import {AuthService} from "../../../servicios/rest/auth.service";
import {FacturaRestService} from "../../../servicios/rest/factura-rest.service";
import {Router} from "@angular/router";
import {FacturaDetalle} from "../../../interfaces/facturadetalle";

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
  detallesActuales: FacturaDetalle[];
  botonGuardar = false;
  readonly=false;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _usuarioRestService: UsuarioRestService,
    private readonly _facturaRestService: FacturaRestService,
    private readonly _authService: AuthService,
    private readonly _router: Router,
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

    if (this.facturaActual) {
      console.log(this._facturaRestService.esCliente);
      console.log(this.facturaActual.estado=="Pagado");
      if(this._facturaRestService.esCliente||this.facturaActual.estado=="Pagado"){
        this.readonly = true;
        this.facturaCabeceraForm.get('nombre').disable();
        this.facturaCabeceraForm.get('tipo_pago').disable()
      }
      this.facturaCabeceraForm.get('nombre').setValue(this.facturaActual.cliente.id);
      this.facturaCabeceraForm.get('cedula_o_ruc').setValue(this.facturaActual.cedula_o_ruc);
      this.facturaCabeceraForm.get('telefono').setValue(this.facturaActual.telefono);
      this.facturaCabeceraForm.get('correo_electronico').setValue(this.facturaActual.correo_electronico);
      this.facturaCabeceraForm.get('fecha').setValue(this.facturaActual.fecha);
      this.facturaCabeceraForm.get('direccion').setValue(this.facturaActual.direccion);
      this.facturaCabeceraForm.get('estado').setValue(this.facturaActual.estado);
      this.facturaCabeceraForm.get('tipo_pago').setValue(this.facturaActual.tipo_pago);
      this.facturaCabeceraForm.get('total').setValue(this.facturaActual.total);
      const facturaDetalles$ = this._facturaRestService.findAllFacturaDetalles();
      facturaDetalles$.subscribe(
        (facturaDetalles: FacturaDetalle[]) => {
          this.detallesActuales = facturaDetalles.filter(facturaDetalle => {
            return facturaDetalle.factura_cabecera.id == this.facturaActual.id
          });
          var valorInicial = 0;
          var totalSuma = this.detallesActuales.reduce(function (acumulador, valorActual) {
            return acumulador + valorActual.total
          }, valorInicial);
          this.facturaCabeceraForm.get('total').setValue(totalSuma);
          this.onSubmit();
        }, (error) => {
          console.log(error)
        }
      )
    }
  }

  get f() {
    return this.facturaCabeceraForm.controls;
  }

  anadirItem() {
    if (this.facturaActual) {
      this._facturaRestService.esCliente=false;
      this._router.navigate((['/eventos/anadirItem/' + this.facturaActual.id]))
    } else {
      alert('Primero debe guardar los datos de la factura')
    }

  }

  onSubmit() {
    this.submitted = true;
    if (this.facturaCabeceraForm.invalid) {
      return;
    }
    if (this.facturaActual) {
      let facturaCabecera: FacturaCabecera = {
        id: this.facturaActual.id,
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

      const factura$ = this._facturaRestService.updateFacturaCabecera(facturaCabecera);
      factura$.subscribe(
        (facturaCabecera) => {
          this.facturaActual = facturaCabecera;
          if (this.botonGuardar) {
            alert("Cabecera guardada exitosamente")
          }
          this.botonGuardar = true;
        },
        (error) => {
          console.log(error);
          alert("No se ha podido actualizar la factura")
        }
      );

    } else {
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

      const factura$ = this._facturaRestService.createFacturaCabecera(facturaCabecera);
      factura$.subscribe(
        (facturaCabecera) => {
          this.facturaActual = facturaCabecera;
          this._facturaRestService.facturaActual = facturaCabecera;
          alert("Cabecera creada exitosamente")
        },
        (error) => {
          console.log(error);
          alert("No se ha podido crear la factura")
        }
      )
    }
  }

  eliminarDetalle(idFacturadetalle){
    const facturaDetalle$ = this._facturaRestService.deleteFacturaDetalle(idFacturadetalle);
    facturaDetalle$.subscribe(
      (facturaDetalle) => {
        console.log(facturaDetalle)
        this.botonGuardar=false;
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
        alert("No se ha podido eliminar el detalle")
      }
    )
  }

  pagarFactura(){
    let facturaCabecera: FacturaCabecera = {
      id: this.facturaActual.id,
      cliente: <string>this.f.nombre.value,
      cedula_o_ruc: <number>this.f.cedula_o_ruc.value,
      telefono: <number>this.f.telefono.value,
      correo_electronico: <string>this.f.correo_electronico.value,
      fecha: <string>this.f.fecha.value,
      direccion: <string>this.f.direccion.value,
      estado: "Pagado",
      tipo_pago: <string>this.f.tipo_pago.value,
      total: <number>this.f.total.value,
      cajero: this._authService.currentUserValue.id,
      evento: this._facturaRestService.eventoActualId
    };

    const factura$ = this._facturaRestService.updateFacturaCabecera(facturaCabecera);
    factura$.subscribe(
      (facturaCabecera) => {
        this.facturaActual = facturaCabecera;
         alert("Factura pagada exitosamente");
         this._router.navigate(["eventos","listaFacturas",this._facturaRestService.eventoActualId])
      },
      (error) => {
        console.log(error);
        alert("No se ha podido pagar la factura")
      }
    );
  }
}
