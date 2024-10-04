import { pool } from "../../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { SECRET_JWT_KEY } from '../../config.js';

export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM usuario");
    return res.json(rows);

  } catch (error) {
    return res.status(400).json({
      message: "Error, Problema de Conexion",
      error,
    });
  }
};

export const getUsuarioId = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM usuario WHERE id = ?", [id]);

    if (rows.length <= 0) {
      return res.status(400).json({
        message: "No se encuentra usuario registrado",
      });
    }
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Hay error en la conexion, CODIGO 500",
    });
  }
};

export const registerUsuario = async (req, res) => {
  const {
    codigo_empleado,
    url_Imagen,
    nombre,
    correo,
    contrasena,
    cargo,
    rol,
  } = req.body;

  const passCode = bcrypt.hash(contrasena, 10);

  try {
    const [rows] = await pool.query(
      "INSERT INTO usuario (codigo_empleado,url_Imagen,nombre, correo, contrasena, cargo, rol) values (?,?,?, ?, ?, ?, ?)",
      [codigo_empleado, url_Imagen, nombre, correo, passCode, cargo, rol]
    );
    res.json({
      user: "User Created:",
      nombre,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Hay un Error",
    });
  }
};

export const putUsuario = async (req, res) => {
  const { id } = req.params;
  const {
    codigo_empleado,
    url_Imagen,
    nombre,
    correo,
    contrasena,
    cargo,
    rol,
  } = req.body;

  const passCode = await bcrypt.hash(contrasena, 10);

  try {
    const [rows] = await pool.query(
      "UPDATE usuario SET codigo_empleado = ?, url_Imagen = ?, nombre = ?, correo= ?, contrasena = ?, cargo = ?, rol = ? WHERE id = ?",
      [codigo_empleado, url_Imagen, nombre, correo, passCode, cargo, rol, id]
    );
    res.json("Update Complete");
  } catch (error) {
    return res.status(500).json({
      message: "Hay un error",
      error,
    });
  }
};

export const deleteUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("DELETE FROM usuario WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({
        message: "Usuario no Encontrado",
      });
    } else {
      res.json({
        message: "Usuario Eliminado",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Hay Un error",
    });
  }
};

/* Login de Usuario */

export const loginUsuario = async (req, res) => {
  const { correo, contrasena } = req.body;
   
  try {
    const [rows] = await pool.query("SELECT * FROM usuario WHERE correo = ? ",[correo]);

    const ValidContrasena = bcrypt.compareSync(contrasena, rows[0].contrasena);
    
    if(ValidContrasena){
     const token = jwt.sign(
      {id: rows[0].id, nombre: rows[0].nombre},
      SECRET_JWT_KEY,
      {
        expiresIn: "1h"
      }
     );
     const {contrasena: _, ...publicUser} = rows

     res.cookie('access_token', token, {
      httpOnly:true
     })
     .json({publicUser, token})
    }else{
      res.json({
        "message": "Contraseña no Valida"
      })
    }
     
    if (!rows) {
      res.json({
        message: "No se encuentra usuario",
      });
    }
    
  } catch (error) {
    res.status(500).json({
      message: "Conexion Fallida",
      error,
    });
  }
};

export const postLogout = (req, res) =>{
 res.clearCookie('access_token')
 .json({message: 'Logout successfull'})
}
/* FIN Login de Usuario */
