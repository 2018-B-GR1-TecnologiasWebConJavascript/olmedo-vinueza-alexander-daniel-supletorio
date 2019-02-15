module.exports = {
  attributes: {
    chasis:{
      type: 'number',
      isInteger: true,
      required: true,
    },
    nombreMarca:{
      type: 'String',
      required: true,
      regex: /^[a-zA-Z\s]*$/i
    },
    nombreModelo:{
      type: 'String',
      required: true,
      regex: /^[a-zA-Z\s]*$/i
    },
    colorUno:{
      type: 'String',
      required: true,
      regex: /^[a-zA-Z\s]*$/i
    },
    colorDos:{
      type: 'String',
      required: true,
      regex: /^[a-zA-Z\s]*$/i
    },
    anio: {
      type: 'number',
      isInteger: true,
      required: true
    },
    conductor:{
      model: 'conductor',
      required: true
    },
    eventos:{
      collection: 'evento',
      via: 'auto_id',
      through: 'eventoporauto'
    },
  },
};
