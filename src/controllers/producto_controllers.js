import { pool } from "../../db.js";

export const getProducto = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM producto");
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Sin conexion",
      error,
    });
  }
};

export const getProductoId = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM producto WHERE id_producto = ?", [
      id
    ]);

    if(rows.length <= 0){
      return res.status(400).json({
        message: "Producto no encontrado",
      })
     }else{
      res.json(rows)
     }
  } catch (error) {
    res.status(500).json({
      message: "sin conexion",
      error,
    });
  }
};

export const postProducto = async (req, res) => {
  const { url_Imagen_Prod, nombre, precio, descripcion } = req.body;

  try {
    const [rows] = await pool.query(
      "INSERT INTO producto (url_Imagen_Prod, nombre, precio, descripcion) values (?, ?, ?, ?)",
      [url_Imagen_Prod, nombre, precio, descripcion]
    );

    res.json({
      message: "Added Product",
      nombre,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Hay un Error",
      error,
    });
  }
};

export const putProducto = async(req, res) => {
  const {id} = req.params;

  const { url_Imagen_Prod, nombre, precio, descripcion } = req.body;

  try{
    const [rows] = await pool.query("UPDATE producto SET url_Imagen_Prod = ?, nombre = ?, precio = ?, descripcion = ?  WHERE id_producto = ?",[url_Imagen_Prod, nombre, precio, descripcion, id]);

    res.json({
      message: "Update Complete"
    });

  }catch(error){
   return res.status(400).json({
    message: "Hay un error",
    error,
   })
  }

}

export const deleteProducto = async(req, res) =>{
  const {id} = req.params

  try{
   const [rows] = await pool.query("DELETE FROM producto WHERE id_producto = ?",[id]);

   if(rows.affectedRows <= 0){
    return res.status(400).json({
      message: "Producto no encontrado",
    })
   }else{
    res.json({
      message:"Producto Eliminado"
    })
   }
  }catch(error){
  return res.status(500).json({
    message: "Hay Un error"
  })
  }
}


