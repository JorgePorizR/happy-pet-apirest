const { response } = require("express");
const pool = require("../connection_db/index.connection");

const getImagenById = async (req, res) => {
  const imagen_id = req.params.id;
  try {
    const response = await pool.query(
      "SELECT * FROM imagen WHERE imagen_id = $1",
      [imagen_id]
    );
    res.json(response.rows[0].inombre);
    //console.log(response.rows[0].inombre);
    //console.log(response.rows[0].inombre)
    //res.json(response.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const getImagenByname = async (req, res) => {
  const name_img = req.params.name;
  try {
    const response = await pool.query(
      "SELECT * FROM imagen WHERE iNombre = $1",
      [name_img]
    );
    res.json(response.rows[0]);
    console.log("id de la imagen: ", response.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
const createProductoImg = async (req, res) => {
  /*console.log("Nombre: ",req.file.filename);
      console.log("path: ",req.file.path);
    
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
    
      const formattedDate = `${year}-${month}-${day}`;
      console.log("Date: ",formattedDate);
      const body = req.body;*/
  const imagen = req.file;
  const imagen_nombre = imagen.filename;
  const imagen_path = imagen.path;
  const temp = false;

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  //console.log(imagen);
  //res.send("Todo bien del post!");
  //console.log("Datos Img: ", imagen);

  if (imagen.size > 2000000){
    res.status(400);
    return;
  }
  try {
    const response = await pool.query(
      "INSERT INTO imagen (iNombre, iPath, iTemporal, iFechaSubida) VALUES ($1, $2, $3, $4)",
      [imagen_nombre, imagen_path, temp, formattedDate]
    );
    //console.log(response.rows);

    const response2 = await pool.query(
      "SELECT * FROM imagen WHERE iNombre = $1",
      [imagen_nombre]
    );
    res.json(response2.rows[0]);
    
    console.log("id Img: ", response2.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  getImagenById,
  getImagenByname,
  createProductoImg,
}