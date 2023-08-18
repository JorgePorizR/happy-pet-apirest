//import express from 'express';
const express = require('express');
const app = express();
//import cors from 'cors';
const cors = require('cors');

//import multer from 'multer';
//import mimeTypes from 'mime-types';
//import path from 'path';
const multer = require('multer');
const mimeTypes = require('mime-types');
const path = require('path');

const port = process.env.PORT || 3000;

//const multer = multer();
//const mimeTypes = mimeTypes();
//const path = path();

/*const multer = require('multer');
const mimeTypes = require('mime-types');

const storage = multer.diskStorage({
  destination:  __dirname+'/uploads/',
  filename: function(req, file, cb){
    // + file.originalname + "."
    cb("", Date.now() + "." + mimeTypes.extension(file.mimetype));
  }
});
const upload = multer({  
  storage,
  dest: __dirname+'/uploads/'
}).single('imagen');

app.post("/upload", upload, (req, res)=>{
  console.log("Nombre: ",req.file.filename);
  console.log("path: ",req.file.path);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  console.log("Date: ",formattedDate);
  //res.send("Todo bien!");
});*/


const whitelist = ['http://127.0.0.1:5500', 'http://localhost:3000', '*'];

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: whitelist
}));

const storage = multer.diskStorage({
  destination:  path.join(__dirname, 'public/uploads/'),
  filename: function(req, file, cb){
    // + file.originalname + "."
    cb(null, Date.now() + "." + mimeTypes.extension(file.mimetype));
  }
});
app.use(multer({  
  storage,
  dest: path.join(__dirname, 'public/uploads/'),
  limits: {fieldSize: 2000000},
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if(mimetype && extname){
      return cb(null, true);
    }
    cb("Error: File not is Image");
  }
}).single('imagen'));
//app.use(express.static('/frontend/principal'));

// Ruta para servir los archivos CSS
/*app.use('/css_principal', express.static(path.resolve(__dirname, '../frontend/principal/css_principal')));
app.use('/img', express.static(path.resolve(__dirname, '../frontend/img')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/principal/principal.html'));
});
app.use('/js', express.static(path.resolve(__dirname, '../frontend/principal/js')));*/

/*app.get("/", (req, res)=>{
  res.send("Hola Mundo");
});*/

// routes
app.use(require('./routes/index'));

app.listen(port, () => {
  console.log('Server on port: ', port);
});
