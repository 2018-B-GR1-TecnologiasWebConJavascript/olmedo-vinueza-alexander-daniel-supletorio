import {Rol} from "./rol";

export interface Usuario {
  id?: number;
  nombre: string;
  correo: string;
  password: string;
  fecha_nacimiento: string;
  roles?: Rol[]
  createdAt?: number;
  updatedAt?: number;
}
