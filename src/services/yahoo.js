import yf from 'yahoo-finance2';
import epsCache from '../config/epsCache.js';

const yahooService = {
    async getStockData(ticker) {
        try {
            const queryOptions = { period1: '2023-01-01', interval: '1d' };
            const result = await yf.historical(ticker, queryOptions);
            return result;
        } catch (error) {
            console.error('Error fetching stock data:', error);
            throw error;
        }
    },

    async googlefinance(symbol) {
        const cached = epsCache.get(symbol);
        if (cached) {
            return cached;
        }
        const data = await yf.quoteSummary(symbol, { 
                    modules: ["defaultKeyStatistics", "financialData"] 
                });
        const eps = data.defaultKeyStatistics?.trailingEps;
        epsCache.set(symbol, { eps });
        return { eps };
        },

    async getStocksLiveData(portfolio) {
        try {
            const tickers = portfolio.map(o => o.ticker);

            const quotes = await Promise.all(
            tickers.map(t => yf.quote(t))
            );
            const googledata = await Promise.all(tickers.map(t => this.googlefinance(t)));

            //const googledata = await Promise.all(tickers.map(t => finnhubClient.quote(t)));

            const totalInvestment = portfolio.reduce((sum, o) => sum + (o.price * o.qty), 0);

            const portfolioData = portfolio.map((o, idx) => {
                    const q = quotes[idx];
                    const f = googledata[idx];

                    const plainObj = o.get({ plain: true });

                    const investment = plainObj.price * plainObj.qty;
                    const presentValue = q.regularMarketPrice * plainObj.qty;

                    return {
                        ...plainObj,
                        livePrice: q.regularMarketPrice,
                        investment,
                        presentValue,
                        gainLoss: presentValue - investment,
                        portfolioPercent: ( investment / totalInvestment * 100).toFixed(2),
                        peRatio: f?.eps ? parseFloat(q.regularMarketPrice / f.eps).toFixed(2) : null,
                        eps: f?.eps ? parseFloat(f.eps) : null
                    };
                });
            return portfolioData;
        } catch (error) {
            console.error('Error fetching multiple stock data:', error);
            throw error;
        }
    }
};

export default yahooService;