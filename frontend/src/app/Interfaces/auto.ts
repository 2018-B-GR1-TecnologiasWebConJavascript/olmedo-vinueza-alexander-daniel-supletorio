import {Conductor} from "./conductor";

export interface Auto {
  id: string | number;
  chasis: number;
  nombreMarca:string;
  colorUno:string;
  colorDos:string;
  nombreModelo:string;
  anio: number;
  idConductor: number |string | Conductor;
}
