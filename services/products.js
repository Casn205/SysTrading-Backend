const sequelize = require("./config-db");
const initModels = require("../models/init-models");
const models = initModels(sequelize);

async function registrar(Product) {
  try {
    const dbProduct = await models.products.create({ ...Product });
    return {
      mensaje: "Producto creado exitosamente",
    };
  } catch (error) {
    console.log(error);
    return { message: "No se pudo crear el producto" + error };
  }
}

async function ListaProductos() {
  try {
    const productos = await models.products.findAll();
    return productos;
  } catch (error) {
    console.log(error);
    return { mensaje: "No se pudo obtener la lista de productos" };
  }
}

async function actualizarProducto(id, product) {
  try {
    await models.products.update(product, {
      where: { idproduct: id }
    });

    return { mensaje: "Producto actualizado exitosamente" };
  } catch (error) {
    console.log(error);
    return { mensaje: "No se pudo actualizar el producto" };
  }
}

async function eliminarProducto(id) {
  try {

    await models.detalle_pedido.destroy({
      where: {idProducto: id}
    });
    await models.products.destroy({

      where: { idproduct: id }
    });
    return { mensaje: "Producto eliminado exitosamente" };
  } catch (error) {
    console.log(error);
    return { mensaje: "No se pudo eliminar el producto" };
  }
}

async function actualizarCantidadProducto(idProducto, cantidad) {
  try {
    const producto = await models.products.findByPk(idProducto);
    if (producto) {
      producto.cantidad += cantidad;
      await producto.save();
    }
  } catch (err) {
    console.error('Error al actualizar la cantidad del producto:', err);
  }
}

async function QuitarCantidadProducto(idProducto, cantidad) {
  try {
    const producto = await models.products.findByPk(idProducto);
    if (producto) {
      producto.cantidad -= cantidad;
      await producto.save();
    }
  } catch (err) {
    console.error('Error al actualizar la cantidad del producto:', err);
  }
}
module.exports = {
  registrar,
  ListaProductos,
  actualizarProducto,
  eliminarProducto,
  actualizarCantidadProducto,
  QuitarCantidadProducto
};
