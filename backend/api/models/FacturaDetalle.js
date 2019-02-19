module.exports = {
  attributes: {
    cantidad:{
      type: 'number',
      isInteger: true,
      required: true
    },
    precio:{
      type: 'number',
      required: true
    },
    total:{
      type: 'number',
      required: true
    },
    factura_cabecera:{
      model: 'facturacabecera',
      required: true
    },
    evento_por_auto:{
      model: 'eventoporauto',
      required: true
    }
  }
};
