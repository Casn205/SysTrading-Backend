const express = require('express');
const router = express.Router();
const sequelize = require('../services/config-db'); // Importa la configuración de Sequelize
const initModels = require('../models/init-models'); // Importa la función de inicialización de modelos
const models = initModels(sequelize); // Inicializa los modelos
const egreso= require("../services/egreso");
const {actualizarCantidadProducto} = require("../services/products");
const {QuitarCantidadProducto} = require("../services/products");

router.post('/registrar', async function (req, res, next) {
  const { idProducto, Cantidad } = req.body;
  try {
  await QuitarCantidadProducto(idProducto, parseInt(Cantidad, 10));
    
    res.json(await egreso.RegistrarEgreso({ idProducto, Cantidad }));
  } catch (err) {
    console.error(`Error no se puede crear el egreso`, err.message);
    next(err);
  }
});

router.get('/obtener', async function (req, res, next) {
  try {
    res.json(await egreso.ListaEgreso());
  } catch (err) {
    console.error(`Error al obtener el egreso`, err.message);
    next(err);
  }
});

router.put('/actualizar/:id', async function (req, res, next) {
  try {
    res.json(await egreso.actualizarEgreso(req.params.id, req.body));
  } catch (err) {
    console.error(`Error al actualizar el egreso`, err.message);
    next(err);
  }
});

router.delete('/eliminar/:id', async function (req, res, next) {
  try {
    res.json(await egreso.eliminarEgreso(req.params.id));
  } catch (err) {
    console.error(`Error al eliminar el egreso`, err.message);
    next(err);
  }
});

module.exports = router;
