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
      defaultsTo: -0.210335
    },
    longitud:{
      type: 'number',
      defaultsTo: -78.489064
    },
    autos:{
      collection: 'auto',
      via: 'evento_id',
      through: 'eventoporauto'
    },
  },
};
