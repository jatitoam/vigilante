import { Router } from "express";
import * as fs from "fs";
import { DepartamentosController } from "./lib/Controllers/DepartamentosController";
import { MunicipiosController } from "./lib/Controllers/MunicipiosController";
import { UsuariosController } from "./lib/Controllers/UsuariosController";
import { PartidosController } from "./lib/Controllers/PartidosController";
import { MesasController } from "./lib/Controllers/MesasController";
import { CentrosController } from "./lib/Controllers/CentrosController";
import { FiscaliasController } from "./lib/Controllers/FiscaliasController";

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

// Login route
router.route("/login").post(UsuariosController.login);

// Departamentos routes
router
  .route("/departamentos")
  .get(UsuariosController.verifyToken, DepartamentosController.getList);

router
  .route("/departamentos/:id")
  .get(UsuariosController.verifyToken, DepartamentosController.getItem);

router
  .route("/departamentos/:id/reset")
  .put(UsuariosController.verifyToken, DepartamentosController.resetRecuentos);

// Municipio Routes
router
  .route("/departamentos/:id/municipios")
  .get(UsuariosController.verifyToken, MunicipiosController.getByDepartamento);

router
  .route("/municipios/:id")
  .get(UsuariosController.verifyToken, MunicipiosController.getItem);

// Centros controller
router
  .route("/municipios/:id/centros")
  .get(UsuariosController.verifyToken, CentrosController.getByMunicipio);

router
  .route("/centros/:id")
  .get(UsuariosController.verifyToken, CentrosController.getItem);

// Mesas routes
router
  .route("/centros/:id/mesas")
  .get(UsuariosController.verifyToken, MesasController.getByCentro);

router
  .route("/mesas/:id")
  .get(UsuariosController.verifyToken, MesasController.getItem);

router
  .route("/mesas/:id/recuentos")
  .put(UsuariosController.verifyToken, MesasController.updateRecuento);

// Partidos Routes
router
  .route("/partidos")
  .get(UsuariosController.verifyToken, PartidosController.getList);

// Fiscalias
router
  .route("/fiscalias")
  .get(UsuariosController.verifyToken, FiscaliasController.getByUsuario);

module.exports = router;
