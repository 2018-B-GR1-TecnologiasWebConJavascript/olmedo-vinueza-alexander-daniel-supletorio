import {Auto} from "./auto";
import {Evento} from "./evento";

export interface EventoAutoInterface {
  id?: string | number,
  evento_id: any
  auto_id: any
  precio_base: number
}
