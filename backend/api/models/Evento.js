module.exports = {
  attributes: {
    nombre:{
      type: 'string',
      required: true,
      unique: true
    },
    fecha:{
      type: 'string',
      required: true
    },
    latitud: {
      type: 'number',
      required: true
    },
    longitud:{
      type: 'number',
      required: true
    },
    autos:{
      collection: 'auto',
      via: 'evento_id',
      through: 'eventoporauto'
    },
  },
};
