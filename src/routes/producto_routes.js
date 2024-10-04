import { Router } from "express";
import { getProducto, getProductoId, postProducto, putProducto, deleteProducto } from "../controllers/producto_controllers.js";

const router = Router();

router.get("/productos", getProducto);

router.get("/productos/:id", getProductoId);

router.post("/productos", postProducto);

router.put("/productos/:id", putProducto);

router.delete("/productos/:id", deleteProducto);


export default router;