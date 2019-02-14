import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RutaLoginComponent} from './rutas/ruta-login/ruta-login.component';
import {HttpClientModule} from "@angular/common/http";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RutaMenuComponent} from './rutas/ruta-menu/ruta-menu.component';
import {RutaGestionUsuariosComponent} from "./rutas/ruta-gestion-usuarios/ruta-gestion-usuarios.component";
import {AuthService} from "./servicios/rest/auth.service";
import {UsuarioRestService} from "./servicios/rest/usuario-rest.service";
import {TableModule} from "primeng/table";
import {
  ButtonModule, CardModule,
  DropdownModule,
  InputTextModule,
  MessageModule,
  MessagesModule,
  ToolbarModule
} from "primeng/primeng";
import {RutaRegistroComponent} from './rutas/ruta-registro/ruta-registro.component';
import {RutaActualizarUsuarioComponent} from './rutas/ruta-actualizar-usuario/ruta-actualizar-usuario.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UsuarioMainComponent} from './modulos/usuario-main/usuario-main.component';
import {ConductorVisualizarComponent} from './modulos/modulo-conductor/conductor-visualizar/conductor-visualizar.component';
import {ConductorCrearComponent} from './modulos/modulo-conductor/conductor-crear/conductor-crear.component';
import {FormConductorComponent} from './componentes/form-conductor/form-conductor.component';
import {ConductorActualizarComponent} from './modulos/modulo-conductor/conductor-actualizar/conductor-actualizar.component';
import {AutoVisualizarComponent} from './modulos/modulo-auto/auto-visualizar/auto-visualizar.component';
import {AutoCrearComponent} from './modulos/modulo-auto/auto-crear/auto-crear.component';
import {FormAutoComponent} from './componentes/form-auto/form-auto.component';
import {AutoActualizarComponent} from './modulos/modulo-auto/auto-actualizar/auto-actualizar.component';
import {EventoVerComponent} from './modulos/modulo-evento/evento-ver/evento-ver.component';
import {EventoCrearComponent} from './modulos/modulo-evento/evento-crear/evento-crear.component';
import {FormEventoComponent} from './componentes/form-evento/form-evento.component';
import {EventoActualizarComponent} from './modulos/modulo-evento/evento-actualizar/evento-actualizar.component';
import {EventoVisualizarComponent} from './modulos/modulo-evento/evento-visualizar/evento-visualizar.component';
import {EventoVerAutoComponent} from './modulos/modulo-evento/evento-ver-auto/evento-ver-auto.component';
import {ListaAutosComponent} from './componentes/lista-autos/lista-autos.component';

@NgModule({
  declarations: [
    AppComponent,
    RutaLoginComponent,
    RutaMenuComponent,
    RutaGestionUsuariosComponent,
    RutaRegistroComponent,
    RutaActualizarUsuarioComponent,
    UsuarioMainComponent,
    ConductorVisualizarComponent,
    ConductorCrearComponent,
    FormConductorComponent,
    ConductorActualizarComponent,
    AutoVisualizarComponent,
    AutoCrearComponent,
    FormAutoComponent,
    AutoActualizarComponent,
    EventoVerComponent,
    EventoCrearComponent,
    FormEventoComponent,
    EventoActualizarComponent,
    EventoVisualizarComponent,
    EventoVerAutoComponent,
    ListaAutosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    BrowserAnimationsModule,
    ToolbarModule,
    MessagesModule,
    MessageModule,
    CardModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    UsuarioRestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
