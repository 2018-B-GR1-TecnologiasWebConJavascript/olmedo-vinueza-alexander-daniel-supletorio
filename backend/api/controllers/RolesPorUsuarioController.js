/**
 * RolesPorUsuarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  rolesporusuarioId: async (req, res) => {
    const parametros = req.allParams();
    var usuarioLogeado = await RolesPorUsuario.find({
      idUsuario: parametros.id
    });
    if(usuarioLogeado){
        return res.ok(usuarioLogeado);
    }else{
      return res.badRequest({mensaje:'Usuario Invalido'});
    }
  },

  rolesUsuario: async (req, res) => {
    const parametros = req.allParams();
    var usuarioLogeado = await RolesPorUsuario.find({
      idUsuario: parametros.id
    }).populate('idRol');
    if(usuarioLogeado){
      return res.ok(usuarioLogeado);
    }else{
      return res.badRequest({mensaje:'Usuario Invalido'});
    }
  }

};

