module.exports = {
  attributes: {
    nombre: {
      type: 'string',
      unique: true,
    },
    usuarios:{
      collection: 'usuario',
      via: 'rol_id',
      through: 'rolesporusuario'
    },
  },
};
