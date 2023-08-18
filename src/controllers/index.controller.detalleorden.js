const { response } = require("express");
const pool = require("../connection_db/index.connection");

const getDetalleOrden = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM detalleorden");
    //console.log(response.rows);
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const getDetalleOrdenById = async (req, res) => {
  const detalle_id = req.params.id;
  try {
    const response = await pool.query(
      "SELECT * FROM detalleorden WHERE detalle_id = $1",
      [detalle_id]
    );
    //console.log(response.rows);
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const createDetalleOrden = async (req, res) => {
  const { dCantidad, dSubTotal, idProducto, idOrden } = req.body;

  try {
    const response = await pool.query(
      "INSERT INTO detalleorden (dCantidad, dSubTotal, idProducto, idOrden) VALUES ($1, $2, $3, $4)",
      [dCantidad, dSubTotal, idProducto, idOrden]
    );
    console.log(response.rows);
    res.send("detalleOrden created");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor al Crear" });
  }
};

module.exports = {
    getDetalleOrden,
    getDetalleOrdenById,
    createDetalleOrden,
};