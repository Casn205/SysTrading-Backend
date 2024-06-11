const express = require('express');
const router = express.Router();
const sequelize = require('../services/config-db'); // Importa la configuración de Sequelize
const initModels = require('../models/init-models'); // Importa la función de inicialización de modelos
const models = initModels(sequelize); // Inicializa los modelos
const detalle_pedido = require("../services/detalle_pedido");
const {actualizarCantidadProducto} = require("../services/products");

router.post('/registrar', async function (req, res, next) {
  const { idPedido, idProducto, Cantidad } = req.body;
  try {
    const pedido = await models.pedido.findByPk(idPedido);

    if (pedido && pedido.estado === 'Completado') {
      await actualizarCantidadProducto(idProducto, parseInt(Cantidad, 10));
    }
    
    res.json(await detalle_pedido.RegistrarDetalle_pedido({ idPedido, idProducto, Cantidad }));
  } catch (err) {
    console.error(`Error no se puede crear el detalle del pedido`, err.message);
    next(err);
  }
});

router.get('/obtener', async function (req, res, next) {
  try {
    res.json(await detalle_pedido.ListaDetalle_pedido());
  } catch (err) {
    console.error(`Error al obtener la lista del detalle de pedido`, err.message);
    next(err);
  }
});

router.put('/actualizar/:id', async function (req, res, next) {
  try {
    res.json(await detalle_pedido.actualizarDetalle_pedido(req.params.id, req.body));
  } catch (err) {
    console.error(`Error al actualizar el detalle de pedido`, err.message);
    next(err);
  }
});

router.delete('/eliminar/:id', async function (req, res, next) {
  try {
    res.json(await detalle_pedido.eliminarDetalle_pedido(req.params.id));
  } catch (err) {
    console.error(`Error al eliminar el Pedido`, err.message);
    next(err);
  }
});

module.exports = router;
