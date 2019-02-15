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
    },
    longitud:{
      type: 'number',
    },
    autos:{
      collection: 'auto',
      via: 'evento_id',
      through: 'eventoporauto'
    },
  },
};
