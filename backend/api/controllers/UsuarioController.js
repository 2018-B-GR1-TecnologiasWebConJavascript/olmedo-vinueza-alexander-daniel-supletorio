/**
 * UsuarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  login: async (req, res) => {
    const parametros = req.allParams();
    var usuarioLogeado = await Usuario.find({
      correo: parametros.correo,
      password: parametros.password,
    }).populate('roles');
    if(usuarioLogeado.length!==0){
      return res.ok(usuarioLogeado[0]);
    }else{
      return res.badRequest({mensaje:'Correo o contraseña inválidos'});
    }
  },
  eliminar: async (req, res) => {
    const parametros = req.allParams();
    var usuarioEliminado = await Usuario.destroy({
      id: parametros.usuario_id,
    }).fetch();
    const error = usuarioEliminado.length === 0;
    console.log(usuarioEliminado);

    if(!error){
      return res.ok(usuarioEliminado);
    }else{
      return res.badRequest({mensaje:'Error al eliminar'});
    }
  },

  eliminarRol: async (req, res) => {
    const parametros = req.allParams();
    var rolEliminado = await RolesPorUsuario.destroy({
      usuario_id: parametros.usuario_id,
      rol_id: parametros.rol_id,
    }).fetch();
    const error = rolEliminado.length === 0;
    if(!error){
      console.log('Rol eliminado'+rolEliminado[0]);
      return res.ok(rolEliminado);
    }else{
      return res.badRequest({mensaje:'Error al eliminar'});
    }
  }
};

