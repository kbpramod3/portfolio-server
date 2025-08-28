import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import stocksRoutes from "./routes/stocks.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/stocks", stocksRoutes);
app.use("/api/portfolio", portfolioRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

sequelize.authenticate()
  .then(() => console.log("✅ MySQL Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

sequelize.sync()
  .then(() => console.log("✅ Tables synced"))
  .catch((err) => console.error("❌ Sync Error:", err));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});