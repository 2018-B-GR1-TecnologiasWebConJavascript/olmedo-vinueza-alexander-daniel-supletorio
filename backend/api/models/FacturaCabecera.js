module.exports = {
  attributes: {
    cliente: {
      model: 'usuario',
      required: true
    },
    cedula_o_ruc:{
      type: 'number',
      required: true,
    },
    telefono:{
      type: 'number',
      isInteger: true,
      required: true,
    },
    direccion: {
      type: 'string',
      required: true,
    },
    correo_electronico: {
      type: 'string',
      isEmail: true
    },
    fecha:{
      type: 'string',
      required: true,
    },
    total:{
      type: 'number',
      required: true,
    },
    tipo_pago:{
      type: 'string',
      isIn: ['Efectivo','Tarjeta','Cheque']
    },
    estado:{
      type: 'string',
      isIn: ['En compra','Pagado']
    },
    factura_detalles:{
      collection: 'facturadetalle',
      via: 'factura_cabecera'
    },
    cajero:{
      model: 'usuario',
      required: true
    },
    evento:{
      model: 'evento',
      required: true
    },
  },

};

