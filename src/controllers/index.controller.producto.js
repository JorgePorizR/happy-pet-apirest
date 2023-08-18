const { response } = require("express");
const pool = require("../connection_db/index.connection");

const getProducto = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM producto");
    res.json(response.rows);
    //console.log(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const getProductoDestacado = async (req, res) => {
  try {
    const response = await pool.query(`SELECT idProducto, COUNT(idProducto) AS frecuencia
    FROM detalleOrden
    GROUP BY idProducto
    ORDER BY frecuencia DESC
    LIMIT 2;`);
    res.json(response.rows);
    //console.log(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const getProductoById = async (req, res) => {
  const producto_id = req.params.id;
  try {
    const response = await pool.query(
      "SELECT * FROM producto WHERE producto_id = $1",
      [producto_id]
    );
    //console.log(response.rows);
    res.json(response.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const createProducto = async (req, res) => {
  const {
    pNombre,
    pPrecio,
    pPeso,
    pDescripcion,
    pFecha_emision,
    idImage,
    categoria_id,
  } = req.body;
  console.log("este id de imagen me llego: ", idImage);
  try {
    const response = await pool.query(
      "INSERT INTO producto (pNombre, pPrecio, pPeso, pDescripcion, pFecha_emision, idImage, categoria_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        pNombre,
        pPrecio,
        pPeso,
        pDescripcion,
        pFecha_emision,
        idImage,
        categoria_id,
      ]
    );
    //console.log("Producto Creado: ", response.rows);
    //res.send("Producto created");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const updateProducto = async (req, res) => {
  const producto_id = req.params.id;
  const {
    pNombre,
    pPrecio,
    pPeso,
    pDescripcion,
    pFecha_emision,
    idImage,
    categoria_id,
  } = req.body;

  /*const regexNombre = /^[A-Za-z0-9\s]+$/;

  if (regexNombre.test(pNombre)) {
    res.status(400);
    return;
  }*/

  try {
    const response = await pool.query(
      "UPDATE producto SET pNombre = $1, pPrecio = $2 , pPeso = $3, pDescripcion = $4, pFecha_emision = $5, idImage = $6, categoria_id =$7 WHERE producto_id = $8",
      [
        pNombre,
        pPrecio,
        pPeso,
        pDescripcion,
        pFecha_emision,
        idImage,
        categoria_id,
        producto_id,
      ]
    );
    console.log(response.rows);
    res.send("Producto updated");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const deleteProducto = async (req, res) => {
  const producto_id = req.params.id;
  try {
    const response = await pool.query(
      "DELETE FROM producto WHERE producto_id = $1",
      [producto_id]
    );
    console.log(response.rows);
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const getCategoria = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM categoria");
    res.json(response.rows);
    //console.log(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const getCategoriaById = async (req, res) => {
  const categoria_id = req.params.id;
  try {
    const response = await pool.query(
      "SELECT * FROM categoria WHERE categoria_id = $1",
      [categoria_id]
    );
    //console.log(response.rows);
    res.json(response.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const getProductosCategoriaById = async (req, res) => {
  const categoria_id = req.params.id;
  try {
    const response = await pool.query(
      "SELECT * FROM producto WHERE categoria_id = $1",
      [categoria_id]
    );
    //console.log(response.rows);
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  getProducto,
  getProductoDestacado,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  getCategoria,
  getCategoriaById,
  getProductosCategoriaById,
};
