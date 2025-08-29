import portfolioService from "../services/portfolioService.js";

const portfolioController = {
    getPortfolioByUserId: async (req, res) => {
    const userId = 1;
    try {
      const portfolio = await portfolioService.getPortfolioByUserId(userId);
      res.json(portfolio);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch portfolio' });
    }
  },

  addStock: async (req, res) => {
    const userId = 1;
    const { stock, ticker, qty, price } = req.body;
    try {
      const newStock = await portfolioService.addStock(userId, { stock, ticker, qty, price });
      res.status(201).json({ message: 'Stock added to portfolio' , stock: newStock });
    } catch (err) {
      res.status(500).json({ error: 'Failed to add stock' });
    }
  },

    removeStock: async (req, res) => {
        try {
        const userId = 1;
        const id = req.params.id;
        const deleted = await portfolioService.removeStock(userId, id);

        if (!deleted) {
            return res.status(404).json({ error: 'Stock not found' });
        }

        res.json({ message: 'Stock removed from portfolio' });
        } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to remove stock' });
        }
    }
};

export default portfolioController;