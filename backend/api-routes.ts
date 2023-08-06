import { Router } from "express";
import * as fs from "fs";
import { DepartamentosController } from "./lib/Controllers/DepartamentosController";
import { MunicipiosController } from "./lib/Controllers/MunicipiosController";
import { FiscalesController } from "./lib/Controllers/FiscalesController";
import { UsuariosController } from "./lib/Controllers/UsuariosController";
import { PartidosController } from "./lib/Controllers/PartidosController";
import { RecuentosController } from "./lib/Controllers/RecuentosController";
import { MesasController } from "./lib/Controllers/MesasController";
import { CentrosController } from "./lib/Controllers/CentrosController";

const router: Router = Router();

// Set default API response
router.get("/", function (req, res) {
  res.status(404).end();
});

// Health
router.get("/health", function (req, res) {
  // Read package.json file
  fs.readFile("package.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).end();
      return;
    }

    try {
      // Parse package.json as JSON
      const packageData = JSON.parse(data);

      // Extract project name and version
      const projectName = packageData.name;
      const projectVersion = packageData.version;

      res.send({
        health: "Ok",
        projectName: projectName,
        projectVersion: projectVersion,
      });
    } catch (err) {
      res.status(500).end();
    }
  });
});

// Departamentos routes
router
  .route("/departamentos")
  .get(UsuariosController.verifyToken, DepartamentosController.getList);

router
  .route("/departamentos/:id")
  .get(UsuariosController.verifyToken, DepartamentosController.getItem);

// Municipio Routes
router
  .route("/municipios")
  .get(UsuariosController.verifyToken, MunicipiosController.getList);

router
  .route("/municipios/:id")
  .get(UsuariosController.verifyToken, MunicipiosController.getItem);

// Fiscales Routes
router
  .route("/fiscales")
  .get(UsuariosController.verifyToken, FiscalesController.getFromUser);

// Partidos Routes
router
  .route("/partidos")
  .get(UsuariosController.verifyToken, PartidosController.getList);

// Recuentos Routes
router
  .route("/recuentos")
  .put(UsuariosController.verifyToken, RecuentosController.updateRecuento);

// Mesas routes
router
  .route("/mesas/:id")
  .get(UsuariosController.verifyToken, MesasController.getItem);

// Centros controller
router
  .route("/centros/:id")
  .get(UsuariosController.verifyToken, CentrosController.getItem);

// Login route
router.route("/login").post(UsuariosController.login);

module.exports = router;
