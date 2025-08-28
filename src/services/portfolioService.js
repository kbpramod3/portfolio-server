import Order from "../models/order.model.js";
import portfolioCache from "../config/portfolioCache.js";

const portfolioService = {
  getPortfolioByUserId: async (userId) => {
    if (portfolioCache.has(userId)) {
      return portfolioCache.get(userId);
    }
    const portfolio = await Order.findAll({ where: { user_id: userId } });
    portfolioCache.set(userId, portfolio);
    return portfolio;
  },

  addStock: async (userId, stockData) => {
    const newStock = await Order.create({ user_id: userId, ...stockData });
    const cached = portfolioCache.get(userId) || [];
    portfolioCache.set(userId, [...cached, newStock]);
    return newStock;
  },

  removeStock: async (userId, id) => {
    const deleted = await Order.destroy({ where: { user_id: userId, id } });
    if (deleted) {
      const cached = portfolioCache.get(userId) || [];
      portfolioCache.set(userId, cached.filter(item => item.id !== id));
    }
    return deleted;
  }
};

export default portfolioService;
