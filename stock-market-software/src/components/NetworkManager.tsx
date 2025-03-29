export class NetworkManager {
  private finnhubApiKey = "csjs5u9r01qvrnd73fdgcsjs5u9r01qvrnd73fe0";
  private yahooFinanceApiKey = "T4YMtQfhAo7AHgA7z1uH06RhBeW5S8pI";
  private marketauxApiKey = "JXFAi23iEQCymnk3UDhfO46UYW74eyjVveESESSZ";

  constructor() {}

  async fetchStockSymbols(query: string): Promise<
    {
      symbol: string;
      name: string;
      price: number;
      percentChange: number;
      logo_url?: string;
    }[]
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
            logo_url: stockData.logo_url || "",
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

  async getStockData(symbol: string): Promise<{
    name?: string;
    price: number;
    percentChange?: number;
    logo_url?: string;
  }> {
    const quoteUrl = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${this.finnhubApiKey}`;
    const profileUrl = `https://api.polygon.io/v3/reference/tickers/${symbol}?apiKey=${this.yahooFinanceApiKey}`;

    try {
      const [quoteResponse, profileResponse] = await Promise.all([
        fetch(quoteUrl),
        fetch(profileUrl),
      ]);

      const quoteData = await quoteResponse.json();
      const profileData = await profileResponse.json();

      return {
        name: profileData.results?.name || symbol,
        price: quoteData.c || 0,
        percentChange: quoteData.dp || 0,
        logo_url: profileData.results?.branding?.logo_url || "", // ✅ Corrected to logo_url
      };
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
      return { price: 0, logo_url: "" }; // Prevent errors if no logo is found
    }
  }

  async fetchGainersAndLosers(): Promise<{ gainers: any[]; losers: any[] }> {
    const url = `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${this.finnhubApiKey}`;
    try {
      const response = await fetch(url);
      const symbols = await response.json();

      const stockDataPromises = symbols.slice(0, 50).map(async (stock: any) => {
        const stockData = await this.getStockData(stock.symbol);
        return {
          symbol: stock.symbol,
          name: stock.description, // Adding company name
          price: stockData.price,
          percentChange: stockData.percentChange || 0,
        };
      });

      const stocks = await Promise.all(stockDataPromises);
      const gainers = stocks
        .filter((stock) => stock.percentChange > 0)
        .sort((a, b) => b.percentChange - a.percentChange)
        .slice(0, 10);
      const losers = stocks
        .filter((stock) => stock.percentChange < 0)
        .sort((a, b) => a.percentChange - b.percentChange)
        .slice(0, 10);

      return { gainers, losers };
    } catch (error) {
      console.error("Error fetching gainers and losers:", error);
      return { gainers: [], losers: [] };
    }
  }

  async addStockToList(
    symbol: string,
    stockList: {
      symbol: string;
      name: string;
      price: number;
      percentChange: number;
      logo_url?: string;
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
    return [...stockList, stockInfo];
  }

  async getStockNews(ticker: string): Promise<
    {
      symbol: string;
      title: string;
      news: string;
      url: string;
      imageUrl?: string;
    }[]
  > {
    console.log(`getStockNews called with ticker: '${ticker}'`);
    const baseURL = "https://api.polygon.io/v2/reference/news";
    const newsURL = `${baseURL}?${
      ticker ? `ticker=${ticker}&` : ""
    }limit=10&apiKey=${this.yahooFinanceApiKey}`;

    try {
      console.log(`Fetching news from: ${newsURL}`);
      const response = await fetch(newsURL);

      if (!response.ok) {
        console.error(
          `Error fetching news: ${response.status} - ${response.statusText}`
        );
        return [];
      }

      const newsData = await response.json();
      console.log("News API Response:", newsData);
      if (!newsData.results || !Array.isArray(newsData.results)) {
        console.warn("getStockNews: No valid news data received.");
        return [];
      }

      return newsData.results.map(
        (news: {
          tickers?: string[];
          title?: string;
          description?: string;
          article_url?: string;
          image_url?: string;
          published_utc?: string; // UTC published date
          publisher?: {
            name?: string; // Publisher's name (company)
          };
        }) => ({
          symbol: news.tickers?.join(", ") || "General News",
          title: news.title || "No Title",
          news: news.description || "No News Available",
          url: news.article_url || "#",
          imageUrl: news.image_url || "",
          company: news.publisher?.name || "Unknown Source", // Use publisher.name as company
          date: news.published_utc
            ? new Date(news.published_utc).toLocaleString()
            : "Unknown Date", // Format published_utc date
        })
      );
    } catch (error) {
      console.error("Error in getStockNews:", error);
      return [];
    }
  }

  async getEgyptNews(page: number): Promise<News[]> {
    const url = `https://api.marketaux.com/v1/news/all?countries=eg&limit=10&language=en&sort=published_at&sort_order=desc&api_token=${this.marketauxApiKey}&page=${page}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(
          `Error fetching Egypt news: ${response.status} - ${response.statusText}`
        );
        return [];
      }
      const newsData = await response.json();
      return newsData.data.map((news: any) => ({
        symbol: "EG News",
        title: news.title || "No Title",
        news: news.description || "No News Available",
        url: news.url || "#",
        imageUrl: news.image_url || "https://placehold.co/600x400",
        company: news.source || "Unknown Source",
        date: news.published_at
          ? new Date(news.published_at).toLocaleString()
          : "Unknown Date",
      }));
    } catch (error) {
      console.error("Error fetching Egypt news:", error);
      return [];
    }
  }
}

interface News {
  symbol: string;
  title: string;
  news: string;
  url: string;
  image: string;
  company: string;
  date: string;
}
