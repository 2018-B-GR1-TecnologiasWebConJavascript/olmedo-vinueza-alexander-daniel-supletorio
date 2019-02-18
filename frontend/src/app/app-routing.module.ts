import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaLoginComponent} from './rutas/ruta-login/ruta-login.component';
import {RutaGestionUsuariosComponent} from './rutas/ruta-gestion-usuarios/ruta-gestion-usuarios.component';
import {RutaMenuComponent} from "./rutas/ruta-menu/ruta-menu.component";
import {RutaRegistroComponent} from "./rutas/ruta-registro/ruta-registro.component";
import {RutaActualizarUsuarioComponent} from "./rutas/ruta-actualizar-usuario/ruta-actualizar-usuario.component";
import {UsuarioMainComponent} from "./modulos/usuario-main/usuario-main.component";
import {ConductorVisualizarComponent} from "./modulos/modulo-conductor/conductor-visualizar/conductor-visualizar.component";
import {ConductorCrearComponent} from "./modulos/modulo-conductor/conductor-crear/conductor-crear.component";
import {ConductorActualizarComponent} from "./modulos/modulo-conductor/conductor-actualizar/conductor-actualizar.component";
import {AutoVisualizarComponent} from "./modulos/modulo-auto/auto-visualizar/auto-visualizar.component";
import {AutoCrearComponent} from "./modulos/modulo-auto/auto-crear/auto-crear.component";
import {AutoActualizarComponent} from "./modulos/modulo-auto/auto-actualizar/auto-actualizar.component";
import {EventoVerComponent} from "./modulos/modulo-evento/evento-ver/evento-ver.component";
import {EventoCrearComponent} from "./modulos/modulo-evento/evento-crear/evento-crear.component";
import {RutaHomeComponent} from "./rutas/ruta-home/ruta-home.component";
import {RutaEventosComponent} from "./rutas/ruta-eventos/ruta-eventos.component";
import {EventoAgregarHijoComponent} from "./modulos/modulo-evento/evento-agregar-hijo/evento-agregar-hijo.component";
import {EventoVerAutosComponent} from "./modulos/modulo-evento/evento-ver-autos/evento-ver-autos.component";
import {FacturaVisualizarComponent} from "./modulos/modulo-cajero/factura-visualizar/factura-visualizar.component";

const routes: Routes = [
  {
    path: '',
    component: RutaHomeComponent
  },
  {
    path: 'login',
    component: RutaLoginComponent
  },
  {
    path: 'registro',
    component: RutaRegistroComponent
  },
  {
    path: 'administrador',
    component: RutaMenuComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'gestion-usuarios',
      },
      {
        path: 'gestion-usuarios',
        component: RutaGestionUsuariosComponent
      },
      {
        path: 'gestion-usuarios/:idUsuario',
        component: RutaActualizarUsuarioComponent,
      },
    ]
  },
  {
    path: 'eventos',
    component: RutaEventosComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'lista',
      },
      {
        path: 'lista',
        component: EventoVerComponent,
      },
      {
        path: 'crearEvento',
        component: EventoCrearComponent,
      },
      {
        path: 'agregarHijos/:idEvento',
        component: EventoAgregarHijoComponent,
      },
      {
        path: 'verEvento/:idEvento',
        component: EventoVerAutosComponent,
      },
      {
        path: 'listaFacturas/:idEvento',
        component: FacturaVisualizarComponent,
      },
    ]
  },
  {
    path: 'usuario',
    component: UsuarioMainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'gestionConductor',
      },
      {
        path: 'gestionConductor',
        component: ConductorVisualizarComponent,
      },
      {
        path: 'crearConductor',
        component: ConductorCrearComponent,
      },
      {
        path: 'actualizarConductor/:idConductor',
        component: ConductorActualizarComponent,
      },
      {
        path: 'gestionAuto',
        component: AutoVisualizarComponent,
      },
      {
        path: 'crearAuto',
        component: AutoCrearComponent,
      },
      {
        path: 'actualizarAuto/:idAuto',
        component: AutoActualizarComponent,
      }],
      // {
      //   path: 'gestionEvento',
      //   component: EventoVerComponent,
      // },
      // {
      //   path: 'crearEvento',
      //   component: EventoCrearComponent,
      // },
      // {
      //   path: 'actualizarEvento/:idEvento',
      //   component: EventoActualizarComponent,
      // },
      // {
      //   path: 'eventos',
      //   component: EventoVisualizarComponent,
      //   children: [
      //     {
      //       path: 'autos/:idEvento',
      //       component: EventoVerAutoComponent
      //     }
      //   ]
      // }]
    //   {
    //     path: 'eventAuto',
    //     component: EventoAutoMainComponent,
    //     children:[
    //       {
    //         path: '',
    //         pathMatch: 'full',
    //         redirectTo: 'EventoAuto'
    //       },
    //       {
    //         path: 'EventoAuto',
    //         component: EventoAutoVisualizarComponent
    //       },
    //       {
    //         path: 'AgregarEventoAutoo',
    //         component: EventoAutoAgregarComponent
    //       }
    //     ]
    //   }
    // ]
  },
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
