import { Router } from "express";
import portfolioController from "../controllers/portfolio.controller.js";

const router = Router();

router.get("/", portfolioController.getPortfolioByUserId);
router.post("/add", portfolioController.addStock);
router.delete("/:id", portfolioController.removeStock);

export default router;