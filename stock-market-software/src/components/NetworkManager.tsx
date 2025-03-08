export class NetworkManager {
  private finnhubApiKey = "csjs5u9r01qvrnd73fdgcsjs5u9r01qvrnd73fe0";
  private yahooFinanceApiKey = "T4YMtQfhAo7AHgA7z1uH06RhBeW5S8pI";

  constructor() {}

  async fetchStockSymbols(
    query: string
  ): Promise<
    { symbol: string; name: string; price: number; percentChange: number }[]
  > {
    if (!query) return [];

    const url = `https://api.polygon.io/v3/reference/tickers?search=${query}&active=true&limit=20&apiKey=${this.yahooFinanceApiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data?.results) {
        const stockPromises = data.results.map(async (ticker: any) => {
          const stockData = await this.getStockData(ticker.ticker);
          return {
            symbol: ticker.ticker,
            name: ticker.name,
            price: stockData.price,
            percentChange: stockData.percentChange || 0,
          };
        });
        return await Promise.all(stockPromises);
      }
      return [];
    } catch (error) {
      console.error("Error fetching stock symbols:", error);
      return [];
    }
  }

  async getStockData(
    symbol: string
  ): Promise<{ price: number; percentChange?: number }> {
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${this.finnhubApiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data) {
        return {
          price: data.c || 0,
          percentChange: data.dp || 0,
        };
      }
      return { price: 0 };
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
      return { price: 0 };
    }
  }
}
