import { Router } from "express";
import { getUsuarios, getUsuarioId, registerUsuario, loginUsuario, putUsuario, deleteUsuario, postLogout } from "../controllers/usuario.control.js";

const router = Router();

router.get("/usuario", getUsuarios);

router.get('/usuario/:id', getUsuarioId);

router.post('/usuario/registro', registerUsuario);

router.put('/usuario/:id', putUsuario);

router.delete('/usuario/:id', deleteUsuario);

/* Sistema de credenciales */
router.post('/usuario/login',loginUsuario);

router.post('/usuario/logout', postLogout);

export default router;
