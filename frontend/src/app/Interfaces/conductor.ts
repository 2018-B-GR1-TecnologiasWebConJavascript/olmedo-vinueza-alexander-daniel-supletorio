import {Usuario} from './usuario';

export interface Conductor {
  id?: number;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  numeroAutos: number;
  licenciaValida: boolean;
  usuario?: Usuario;
}
