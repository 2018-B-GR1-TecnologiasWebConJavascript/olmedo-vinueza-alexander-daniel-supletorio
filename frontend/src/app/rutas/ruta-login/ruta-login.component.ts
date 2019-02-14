import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../servicios/rest/auth.service";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-ruta-login',
  templateUrl: './ruta-login.component.html',
  styleUrls: ['./ruta-login.component.css']
})
export class RutaLoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _router: Router) {
  }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      correo: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/i),
        Validators.minLength(8),
        Validators.maxLength(16),
      ]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this._authService.login(this.f.correo.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          alert('Usuario logueado correctamente');
          this._router.navigate(['/']);
        },
        error => {
          this.loading = false;
          alert('Verifique el usuario y la contraseña');
          console.log(error)
        });
  }
}
