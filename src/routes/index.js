const { Router } = require("express");
const router = Router();

const {
  getProducto,
  getProductoDestacado,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  getCategoria,
  getCategoriaById,
  getProductosCategoriaById,
} = require("../controllers/index.controller.producto");

router.get("/api/productos", getProducto);
router.get("/api/destacados/productos", getProductoDestacado);
router.get("/api/productos/:id", getProductoById);
router.post("/api/productos", createProducto);
router.put("/api/update/productos/:id", updateProducto);
router.delete("/api/productos/:id", deleteProducto);

router.get("/productos/categoria", getCategoria);
router.get("/productos/categoria/:id", getCategoriaById);

router.get("/categoria/productos/:id", getProductosCategoriaById);

const {
  getImagenById,
  getImagenByname,
  createProductoImg,
} = require("../controllers/index.controller.imagen");

router.get("/imagen/:id", getImagenById);
router.get("/nameimage/:name", getImagenByname);
router.post("/upload", createProductoImg);

const {
  getUsuario,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  usuarioLogin,
} = require("../controllers/index.controller.usuario");

router.get("/api/usuarios", getUsuario);
router.get("/api/usuarios/:id", getUsuarioById);
router.post("/api/usuarios", createUsuario);
router.put("/api/usuarios/:id", updateUsuario);
router.delete("/api/usuarios/:id", deleteUsuario);

router.post("/usuarios/login", usuarioLogin);

const {
  getOrden,
  getOrdenById,
  createOrden,
} = require("../controllers/index.controller.orden");

router.get("/api/ordenes", getOrden);
router.get("/api/ordenes/:id", getOrdenById);
router.post("/api/ordenes", createOrden);

const {
  getDetalleOrden,
  getDetalleOrdenById,
  createDetalleOrden,
} = require("../controllers/index.controller.detalleorden");

router.get("/api/detalleorden", getDetalleOrden);
router.get("/api/detalleorden/:id", getDetalleOrdenById);
router.post("/api/detalleorden", createDetalleOrden);

module.exports = router;
