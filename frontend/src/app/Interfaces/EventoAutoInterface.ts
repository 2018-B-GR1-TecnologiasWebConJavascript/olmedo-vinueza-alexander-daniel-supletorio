import {Auto} from "./auto";
import {Evento} from "./evento";

export interface EventoAutoInterface {
  id: string | number,
  idEvento: number | string | Evento,
  idAuto: number | string | Auto,
}
