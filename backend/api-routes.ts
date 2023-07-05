import { Router } from "express";

const router: Router = Router();

// Set default API response
router.get("/", function (req, res) {
  res.status(404).end();
});

module.exports = router;
