const express = require("express");
const app = express();
const port = 8080;
const usuarioRouter = require("./routes/users");
const ProveedorRouter = require("./routes/Proveedor");
const RolRouter = require("./routes/Rol");
const ProductsRouter = require("./routes/products");
const pedidoRouter = require("./routes/pedidoRoutes");
const RolUserRouter = require("./routes/Rol_Usuario");
const DetalleRouter= require("./routes/detalle_pedido")
const EgresoRouter= require("./routes/egreso");
const cors = require('cors');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use(cors());
app.use("/usuario", usuarioRouter); //Enrutador de usuarios
app.use("/proveedor", ProveedorRouter);
app.use("/Rol",RolRouter);
app.use("/Rol",RolRouter);
app.use("/products",ProductsRouter);
app.use("/pedido",pedidoRouter);
app.use("/RolUser",RolUserRouter);
app.use("/Detalle",DetalleRouter);
app.use("/egreso",EgresoRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
