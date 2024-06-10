const express = require("express");
const router = express.Router();
const usuario = require("../services/users");

/* POST programming language */
router.get('/Obtener', async function (req, res, next) {
  try {
    res.json(await usuario.ListaUsuarios());
  } catch (err) {
    console.error(`Error al obtener la lista de usuarios`, err.message);
    next(err);
  }
});

router.get('/ObtenerRol', async function (req, res, next) {
  try {
    res.json(await usuario.ObtenerRol(req.body));
  } catch (err) {
    console.error(`Error al obtener la lista de usuarios`, err.message);
    next(err);
  }
});

router.post("/registrar/:Rol", async function (req, res, next) {
  try {
    res.json(await usuario.registrar(req.body,req.params.Rol));

  } catch (err) {
    console.error(`Error no se puede crear usuario`, err.message);
    next(err);
  }
});

router.post("/login", async function (req, res, next) {
    try {
      res.json(await usuario.login(req.body));
    } catch (err) {
      console.error(`Error al ingresar el usuario`, err.message);
      next(err);
    }
});

router.put('/actualizar/:id', async function (req, res, next) {
  try {
    res.json(await usuario.actualizarUsuario(req.params.id, req.body));
  } catch (err) {
    console.error(`Error al actualizar el usuario`, err.message);
    next(err);
  }
});

router.delete('/eliminar/:id', async function (req, res, next) {
  try {
    res.json(await usuario.eliminarUsuario(req.params.id));
  } catch (err) {
    console.error(`Error al eliminar el usuario`, err.message);
    next(err);
  }
});

module.exports = router;
