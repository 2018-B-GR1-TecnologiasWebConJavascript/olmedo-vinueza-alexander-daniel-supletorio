export interface FacturaDetalle {
  id?: number;
  nombre: string;
  cantidad: number;
  precio: number;
  total: number;
  factura_cabecera?: any;
  evento_por_auto?: any;
}
