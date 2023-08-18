const { response } = require("express");
const pool = require("../connection_db/index.connection");

const getOrden = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM orden");
    //console.log(response.rows);
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const getOrdenById = async (req, res) => {
  const orden_id = req.params.id;
  try {
    const response = await pool.query(
      "SELECT * FROM orden WHERE orden_id = $1",
      [orden_id]
    );
    //console.log(response.rows);
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const createOrden = async (req, res) => {
  const { oFechaPedido, oTotal, idCliente } = req.body;

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}${month}${day}`;

  let fecha = new Date();
  let hora = fecha.getHours();
  let minuto = fecha.getMinutes();
  let segundo = fecha.getSeconds();

  hora = hora < 10 ? "0" + hora : hora;
  minuto = minuto < 10 ? "0" + minuto : minuto;
  segundo = segundo < 10 ? "0" + segundo : segundo;

  const oCodigo = formattedDate + hora + minuto + segundo;
  try {
    const response = await pool.query(
      "INSERT INTO orden (oFechaPedido, oTotal, oCodigo, idCliente) VALUES ($1, $2, $3, $4)",
      [oFechaPedido, oTotal, oCodigo, idCliente]
    );

    const response2 = await pool.query(
        "SELECT * FROM orden WHERE oFechaPedido = $1 AND oTotal = $2 AND oCodigo = $3 AND idCliente = $4",
        [oFechaPedido, oTotal, oCodigo, idCliente]
      );
    console.log(response2.rows[0]);
    res.json(response2.rows[0]);
    //res.send("Orden created");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor al Crear" });
  }
};

module.exports = {
    getOrden,
    getOrdenById,
    createOrden,
};
