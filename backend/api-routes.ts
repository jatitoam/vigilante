import { Router } from "express";
import * as fs from "fs";
import { DepartamentController } from "./lib/Controllers/DepartamentoController";
import { MunicipioController } from "./lib/Controllers/MunicipioController";

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
router.route("/departamentos").get(DepartamentController.getList);
router.route("/departamentos/:id").get(DepartamentController.getItem);

// Municipio Routes
router.route("/municipio").get(MunicipioController.getList);
router.route("/municipio/:id").get(MunicipioController.getItem);

module.exports = router;
