module.exports = {
  attributes: {
    nombres: {
      type: 'String',
      required: true,
      regex: /^[a-zA-Z\s]*$/i
    },
    apellidos: {
      type: 'String',
      required: true,
      regex: /^[a-zA-Z\s]*$/i
    },
    fechaNacimiento: {
      type: 'String',
      required: true
    },
    numeroAutos: {
      type: 'number',
      isInteger: true,
      required: true
    },
    licenciaValida: {
      type: 'boolean',
      required: true
    },
    usuario:{
      model: 'usuario',
      required: true
    },
    autos:{
      collection: 'auto',
      via: 'conductor'
    },
  },
};
