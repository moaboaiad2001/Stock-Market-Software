export class NetworkManager {
  private finnhubApiKey = "csjs5u9r01qvrnd73fdgcsjs5u9r01qvrnd73fe0";
  private yahooFinanceApiKey = "Fb7LNj6K1zBvnardW_HTHkXkJM0rLBLs";

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

  async addStockToList(
    symbol: string,
    stockList: {
      symbol: string;
      name: string;
      price: number;
      percentChange: number;
    }[]
  ): Promise<
    { symbol: string; name: string; price: number; percentChange: number }[]
  > {
    const stockData = await this.getStockData(symbol);
    const stockInfo = {
      symbol,
      name: symbol, // You can adjust this to fetch the full name if needed
      price: stockData.price,
      percentChange: stockData.percentChange || 0,
    };

    // Add the stock to the list
    return [...stockList, stockInfo];
  }

  async getStockNews(
    query: string
  ): Promise<{ symbol: string; title: string; news: string }[]> {
    if (!query) return [];

    const newsURL = `https://api.polygon.io/v2/reference/news?limit=10&apiKey=Fb7LNj6K1zBvnardW_HTHkXkJM0rLBLs`;

    try {
      const response = await fetch(newsURL, {
        headers: {
          "Cache-Control": "no-cache", // Prevent caching
          "If-None-Match": "no-match",
        },
      });
      const newsData: { results?: { title?: string; description?: string }[] } =
        await response.json();

      if (Array.isArray(newsData.results)) {
        console.log(newsData);
        return newsData.results.map(
          (news: { title?: string; description?: string }) => ({
            symbol: query,
            title: news.title || "No Title",
            news: news.description || "No News Available",
          })
        );
      }

      return [];
    } catch (error) {
      console.error(`Error fetching news for ${query}:`, error);
      return [];
    }
  }
}
