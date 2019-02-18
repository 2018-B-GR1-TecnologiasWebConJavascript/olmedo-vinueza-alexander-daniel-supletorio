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
      min: -90,
      max: 90,
      defaultsTo: -0.210335
    },
    longitud:{
      type: 'number',
      min: -180,
      max: 180,
      defaultsTo: -78.489064
    },
    autos:{
      collection: 'auto',
      via: 'evento_id',
      through: 'eventoporauto'
    },
  },
};
