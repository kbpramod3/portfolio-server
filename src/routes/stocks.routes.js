import { Router } from "express";

import stocksController from "../controllers/stocks.controller.js";

const router = Router();

router.get("/stock/:ticker", stocksController.getStockData);
router.get("/", stocksController.getStocksLiveData);
router.get("/list", stocksController.getStockList);

export default router;