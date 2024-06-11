const sequelize = require("./config-db");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
/**
 * usamos bcrypt para encriptar la constraseña del usuario y comparar la contraseña encriptada en BD.
 */
const { json } = require("express");
const { where } = require("sequelize");
/**
 * Esta funcion se utiliza para registrar un usuario en la base de datos
 * @param {*} user objeto tiene los datos del usuario (ejem: nombre,password)
 * @returns un mensaje si el usuario ha sido creado o no
 */
async function ListaEgreso() {
  try {
    const egreso = await models.egreso.findAll({});
    return egreso;
  } catch (error) {
    console.log(error);
    return { mensaje: "No se pudo obtener la lista de egreso" };
  }
}

async function RegistrarEgreso(egreso) {
  try {
    const dbUser = await models.egreso.create({
      ...egreso
    });

    return { mensaje: "Egreso creado exitosamente" };
  } catch (error) {
    console.log(error);
    return { mensaje: "No se pudo crear el egreso" };
  }
}
/**
 * Funcion para loguear el usuario en la API
 * @param {*} pedido objeto con datos de usuario para loguear (nombre, password)
 * @returns un mensaje si el usuario y contraseña son incorrectos, o el objeto usuario obtenido de la base de datos.
 */

async function actualizarEgreso(id, egreso) {
  try {
    await models.egreso.update(egreso, {
      where: { idEgreso: id }
    });
    return { mensaje: "Egreso actualizado exitosamente" };
  } catch (error) {
    console.log(error);
    return { mensaje: "No se pudo actualizar el egreso" };
  }
}

async function eliminarEgreso(id) {
  try {
    await models.egreso.destroy({
      where: { idEgreso: id }
    });
    return { mensaje: "Egreso eliminado exitosamente" };
  } catch (error) {
    console.log(error);
    return { mensaje: "No se pudo eliminar egreso" };
  }
}

module.exports = {
  RegistrarEgreso,
  ListaEgreso,
  actualizarEgreso,
  eliminarEgreso,
};