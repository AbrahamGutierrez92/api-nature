import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config.js";
import indexRoutes from "./src/routes/index.routesE.js";
import usuariosRoutes from "./src/routes/usuario.router.js";
import productoRoutes from "./src/routes/producto_routes.js";
import cors from "cors";

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credential: true,
    origin: ["http://localhost:5173", "http://localhost:3000/places"],
  })
);

app.use(indexRoutes);
app.use("/api", usuariosRoutes);
app.use("/api", productoRoutes);

app.listen(PORT, () => {
  console.log("Server Activo", PORT);
});
