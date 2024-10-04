import { Router } from "express";
import {getIndex} from "../controllers/index.controller.js";

const router = Router();

router.get("/nature", getIndex);

export default router;