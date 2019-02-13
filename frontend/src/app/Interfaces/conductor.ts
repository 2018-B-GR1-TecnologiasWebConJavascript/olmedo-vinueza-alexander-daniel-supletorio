import {Usuario} from './usuario';

export interface Conductor {
  id: number | string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  numeroAutos: number;
  licenciaValida: boolean;
  idUsuario: number | string | Usuario
}
