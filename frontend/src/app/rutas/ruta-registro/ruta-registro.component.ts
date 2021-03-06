import {Component, OnInit} from '@angular/core';
import {UsuarioRestService} from "../../servicios/rest/usuario-rest.service";
import {Usuario} from "../../interfaces/usuario";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-ruta-registro',
  templateUrl: './ruta-registro.component.html',
  styleUrls: ['./ruta-registro.component.css']
})
export class RutaRegistroComponent implements OnInit {

  signUpForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private readonly _usuarioRestService: UsuarioRestService,
              private readonly _formBuilder: FormBuilder,
              private readonly _router: Router) {
  }

  ngOnInit() {
    this.signUpForm = this._formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/i)
      ]],
      correo: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/i),
        Validators.minLength(8),
        Validators.maxLength(16),
      ]],
      fecha_nacimiento: ['', [
        Validators.required
      ]]
    })
  }

  get f() {
    return this.signUpForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.signUpForm.invalid) {
      return;
    }

    this.loading = true;
    this._usuarioRestService.create(
      this.f.nombre.value,
      this.f.correo.value,
      this.f.password.value,
      this.f.fecha_nacimiento.value,
    ).subscribe((user) => {
      this._usuarioRestService.asignarRol(user.id, 4)
        .subscribe(
          (rol) => {
            alert('Usuario registrado correctamente');
            this._router.navigate(['/login']);
          }, (error) => {
            console.log(error)
          }
        );
      },
      error => {
        this.loading = false;
        if (error.error.code == 'E_UNIQUE') {
          alert('El correo ya se encuentra registrado');
        }
        console.log(error)
      }
    )
  }
}
