const pool = require("../connection_db/index.connection");

// FUNCIONES PRINCIPALES DE USUARIOS
const getUsuario = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM usuario");
    //console.log(response.rows);
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const getUsuarioById = async (req, res) => {
  const cliente_id = req.params.id;
  try {
    const response = await pool.query(
      "SELECT * FROM usuario WHERE cliente_id = $1",
      [cliente_id]
    );
    //console.log(response.rows);
    res.json(response.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const createUsuario = async (req, res) => {
  const { cNombre, cContrasena, cEmail, cTelefono } = req.body;
  try {
    const response = await pool.query(
      "INSERT INTO usuario (cNombre, cContrasena, cEmail, cTelefono) VALUES ($1, $2, $3, $4)",
      [cNombre, cContrasena, cEmail, cTelefono]
    );
    console.log(response.rows);
    res.send("Usuario created");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor al Crear" });
  }
};

const updateUsuario = async (req, res) => {
  const cliente_id = req.params.id;
  const { cNombre, cContrasena, cEmail, cTelefono } = req.body;
  try {
    const response = await pool.query(
      "UPDATE usuario SET cNombre = $1, cContrasena = $2 , cEmail = $3, cTelefono = $4 WHERE producto_id = $5",
      [cNombre, cContrasena, cEmail, cTelefono, cliente_id]
    );
    console.log(response.rows);
    res.send("usuario updated");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const deleteUsuario = async (req, res) => {
  const cliente_id = req.params.id;
  try {
    const response = await pool.query(
      "DELETE FROM usuario WHERE cliente_id = $1",
      [cliente_id]
    );
    console.log(response.rows);
    res.send("Usuario deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// OTRAS FUNCIONES

const usuarioLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("Datos llegando al servidor", req.body);
  try {
    const response = await pool.query(
      `SELECT cliente_id, cEmail, cNombre, cContrasena, cTelefono, cAdmin FROM usuario WHERE cEmail = '${email}'`
    );

    if (response.rows.length != 1) {
      res.status(401).json({ message: "Email y/o password incorrectos" });
      return;
    }
    const user = response.rows[0];
    if (user.ccontrasena !== password) {
      res.status(401).json({ message: "Email y/o password incorrectos" });
      return;
    }

    const dataToSend = {
      email,
      usuarioId: user.cliente_id,
      nombre: user.cnombre,
      telefono: user.ctelefono,
      administrador: user.cadmin
    };
    console.log("Datos enviados en res.json:", dataToSend);

    res.json(dataToSend);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  getUsuario,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  usuarioLogin,
};
