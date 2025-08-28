import yahooService from "../services/yahoo.js";
import portfolioService from "../services/portfolioService.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const stocksController = {
    async getStockData(req, res) {
        const { ticker } = req.params;
        try {
            const data = await yahooService.getStockData(ticker);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch stock data' });
        }
    },

    async getStocksLiveData(req, res) {
         
        try {
            const portfolio = await portfolioService.getPortfolioByUserId(1);
            const data = await yahooService.getStocksLiveData(portfolio);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch multiple stock data' });
        }
    },

    async getStockList(req, res) {
        try {
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const filePath = path.join(__dirname, "../data/stocklist.json");
            const rawData = fs.readFileSync(filePath, "utf-8");
            const stocks = JSON.parse(rawData);
            res.json(stocks);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch stock list' });
        }
    }
};

export default stocksController;