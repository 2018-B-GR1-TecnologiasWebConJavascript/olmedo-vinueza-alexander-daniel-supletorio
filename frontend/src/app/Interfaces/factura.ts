export interface FacturaCabecera {
  cliente?: any;
  cedula_o_ruc: number;
  telefono: number;
  direccion:string;
  correo_electronico:string;
  fecha:string;
  total: number;
  tipo_pago: string;
  estado: string;
  factura_detalles?: any;
  cajero?: any;
}
