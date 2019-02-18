import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {EventoRestService} from "../../../servicios/rest/evento-rest.service";
import {Auto} from "../../../interfaces/auto";
import {AutoRestService} from "../../../servicios/rest/auto-rest.service";
import {AuthService} from "../../../servicios/rest/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EventoAutoInterface} from "../../../interfaces/EventoAutoInterface";
import {Rol} from "../../../interfaces/rol";

@Component({
  selector: 'app-evento-agregar-hijo',
  templateUrl: './evento-agregar-hijo.component.html',
  styleUrls: ['./evento-agregar-hijo.component.css']
})
export class EventoAgregarHijoComponent implements OnInit {

  mapUrl: string;
  autosActuales: Auto[];
  autosDisponibles: Auto[];
  agregarAutoForm: FormGroup;
  loading = false;
  submitted = false;
  registroRepetido = false;

  eventoActual: any = {
    nombre: '',
    fecha: '',
    latitud: -0.210335,
    longitud: -78.489064
  };

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private readonly _eventoRestService: EventoRestService,
    private readonly _autoRestService: AutoRestService,
    private readonly _authService: AuthService,
    private readonly _formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.submitted = false;
    const rutaActiva$ = this._activatedRoute.params;
    rutaActiva$
      .subscribe(
        (parametros) => {
          this.findEvento(parametros.idEvento);
          this.autosDisponibles = [];
          this.findAutosDisponibles();
        }
      );
    this.agregarAutoForm = this._formBuilder.group({
      auto: ['', [
        Validators.required
      ]],
      precio_base: ['', [
        Validators.required,
        Validators.min(0)
      ]],
    });
  }

  get f() {
    return this.agregarAutoForm.controls;
  }


  findEvento(idEvento) {
    const eventos$ = this._eventoRestService
      .findEventoById(idEvento);
    eventos$
      .subscribe(
        (evento: any) => {
          this.eventoActual = evento;
          this.mapUrl = 'https://maps.google.com/maps?q=' + this.eventoActual.latitud + '%2C' + this.eventoActual.longitud + '&t=&z=15&ie=UTF8&iwloc=&output=embed';
          this.autosActuales = evento.autos;
        },
        (error) => {
          console.error('Error', error);
        }
      );
  }

  findAutosDisponibles() {
    const autosDisponibles$ = this._autoRestService.findAll();
    autosDisponibles$
      .subscribe(
        (autos: Auto[]) => {
          this.autosDisponibles = autos.filter(auto => {
            return auto.conductor.usuario == this._authService.currentUserValue.id
          });
        }, (error) => {
          console.log(error)
        }
      )
  }

  onSubmit() {
    this.submitted = true;
    if (this.agregarAutoForm.invalid) {
      return;
    }

    if (this.autosActuales.some((auto) => {
      return auto.id === parseInt(this.f.auto.value)
    })) {
      this.registroRepetido = true;
    } else {
      this.registroRepetido = false;
      let eventoPorAuto: EventoAutoInterface = {
        evento_id: this.eventoActual.id,
        auto_id: parseInt(this.f.auto.value),
        precio_base: Number(this.f.precio_base.value)
      };
      const crearEventoPorAuto$ = this._eventoRestService.createEventoPorAuto(eventoPorAuto);
      crearEventoPorAuto$.subscribe(
        (eventoPorAuto) => {
          this.ngOnInit();
        }, (error) => {
          console.log(error)
        }
      )

    }
  }

  eliminarAuto(autoEliminado: Auto) {
    if (this.autosDisponibles.some((auto) => {
      return auto.id === autoEliminado.id
    })) {
      const autoEliminado$ = this._eventoRestService.eliminarAuto(Number(autoEliminado.id), this.eventoActual.id)
      autoEliminado$.subscribe(
        (auto) => {
          console.log(auto);
          this.ngOnInit();
        }, (error) => {
          console.log(error)
        }
      );
    } else {
      alert("Usted no puede eliminar ese auto")
    }
  }
}
