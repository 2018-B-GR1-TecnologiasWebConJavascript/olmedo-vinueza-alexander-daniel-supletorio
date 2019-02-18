/**
 * EventoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  eliminarAuto: async (req, res) => {
    const parametros = req.allParams();
    var autoEliminado = await EventoPorAuto.destroy({
      evento_id: parametros.evento_id,
      auto_id: parametros.auto_id,
    }).fetch();

    if (autoEliminado.length !== 0) {
      return res.ok(autoEliminado[0]);
    } else {
      return res.badRequest({mensaje: 'Error al eliminar auto'});
    }
  }
};

