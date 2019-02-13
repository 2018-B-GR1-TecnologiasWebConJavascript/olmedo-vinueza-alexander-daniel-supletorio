module.exports = {
  attributes: {
    auto_id:{
      model: 'auto',
      required: true
    },
    evento_id:{
      model: 'evento',
      required: true
    },
    precio_base:{
      type: 'number',
      required: true
    },
    factura_detalles:{
      collection: 'facturadetalle',
      via: 'evento_por_auto'
    },
  },
};
