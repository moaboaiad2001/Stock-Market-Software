export class NetworkManager {
  private finnhubApiKey = "cvnjukpr01qq3c7fphigcvnjukpr01qq3c7fphj0";
  private yahooFinanceApiKey = "Fb7LNj6K1zBvnardW_HTHkXkJM0rLBLs";
  private marketauxApiKey = "JXFAi23iEQCymnk3UDhfO46UYW74eyjVveESESSZ";
  private logoCache: { [key: string]: string } = {}; // Cache for logos

  private enabled = {
    fetchLogo: false,
    fetchStockSymbols: false,
    getStockData: false,
    fetchGainersAndLosers: false,
    addStockToList: false,
    getStockNews: false,
    getEgyptNews: true,
  };

  constructor() {}

  async fetchLogo(ticker: string): Promise<string | null> {
    if (!this.enabled.fetchLogo) {
      console.log("fetchLogo is disabled");
      return "https://placehold.co/40x40";
    }
    if (this.logoCache[ticker]) {
      return this.logoCache[ticker];
    }
    const url = `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${this.yahooFinanceApiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const logoUrl = data.results?.branding?.icon_url;
      if (logoUrl) {
        this.logoCache[ticker] = logoUrl;
        return logoUrl;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching logo for ${ticker}:`, error);
      return null;
    }
  }

  async fetchStockSymbols(query: string): Promise<any[]> {
    if (!this.enabled.fetchStockSymbols) {
      console.log("fetchStockSymbols is disabled");
      return [
        {
          symbol: "MOCK",
          name: "Mock Corporation",
          price: 123.45,
          percentChange: 2.5,
          logo_url: "https://placehold.co/40x40",
        },
      ];
    }
    if (!query) return [];
    const url = `https://api.polygon.io/v3/reference/tickers?search=${query}&active=true&limit=20&apiKey=${this.yahooFinanceApiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data?.results) {
        const stockPromises = data.results.map(async (ticker: any) => {
          const stockData = await this.getStockData(ticker.ticker);
          const logo_url = stockData.logo_url || "";
          return {
            symbol: ticker.ticker,
            name: ticker.name,
            price: stockData.price,
            percentChange: stockData.percentChange || 0,
            logo_url: logo_url || "",
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

  async getStockData(symbol: string): Promise<any> {
    if (!this.enabled.getStockData) {
      console.log("getStockData is disabled");
      return {
        name: "Mock Corp",
        price: 100,
        percentChange: 1.23,
        logo_url: "https://placehold.co/40x40",
      };
    }
    const profileUrl = `https://api.polygon.io/v3/reference/tickers/${symbol}?apiKey=${this.yahooFinanceApiKey}`;
    const quoteUrl = `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?apiKey=${this.yahooFinanceApiKey}`;
    try {
      const [profileResponse, quoteResponse] = await Promise.all([
        fetch(profileUrl),
        fetch(quoteUrl),
      ]);
      const profileData = await profileResponse.json();
      const quoteData = await quoteResponse.json();
      if (!profileData.results || !quoteData.results) {
        console.error(`Error fetching data for ${symbol}`);
        return { price: 0, logo_url: "" };
      }
      return {
        name: profileData.results?.name || symbol,
        price: quoteData.results?.c || 0,
        percentChange: quoteData.results?.p || 0,
        logo_url: profileData.results?.branding?.icon_url || "",
      };
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
      return { price: 0, logo_url: "" };
    }
  }

  async fetchGainersAndLosers(): Promise<{ gainers: any[]; losers: any[] }> {
    if (!this.enabled.fetchGainersAndLosers) {
      console.log("fetchGainersAndLosers is disabled");
      return {
        gainers: [
          { symbol: "GAIN", name: "Gainer Co.", price: 150, percentChange: 5 },
        ],
        losers: [
          { symbol: "LOSS", name: "Loser Inc.", price: 50, percentChange: -3 },
        ],
      };
    }
    const url = `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${this.finnhubApiKey}`;
    try {
      const response = await fetch(url);
      const symbols = await response.json();
      const stockDataPromises = symbols.slice(0, 50).map(async (stock: any) => {
        const stockData = await this.getStockData(stock.symbol);
        return {
          symbol: stock.symbol,
          name: stock.description,
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

  async addStockToList(symbol: string, stockList: any[]): Promise<any[]> {
    if (!this.enabled.addStockToList) {
      console.log("addStockToList is disabled");
      return stockList;
    }
    const stockData = await this.getStockData(symbol);
    const stockInfo = {
      symbol,
      name: symbol,
      price: stockData.price,
      percentChange: stockData.percentChange || 0,
    };
    return [...stockList, stockInfo];
  }

  async getStockNews(ticker: string): Promise<any[]> {
    if (!this.enabled.getStockNews) {
      console.log("getStockNews is disabled");
      return [
        {
          symbol: ticker,
          title: "Mock News Title",
          news: "Mock news description...",
          url: "https://example.com",
          imageUrl: "https://placehold.co/600x400",
          company: "Mock News Corp",
          date: new Date().toLocaleString(),
        },
        {
          symbol: ticker,
          title: "Mock News Title",
          news: "Mock news description...",
          url: "https://example.com",
          imageUrl: "https://placehold.co/600x400",
          company: "Mock News Corp",
          date: new Date().toLocaleString(),
        },
        {
          symbol: ticker,
          title: "Mock News Title",
          news: "Mock news description...",
          url: "https://example.com",
          imageUrl: "https://placehold.co/600x400",
          company: "Mock News Corp",
          date: new Date().toLocaleString(),
        },
        {
          symbol: ticker,
          title: "Mock News Title",
          news: "Mock news description...",
          url: "https://example.com",
          imageUrl: "https://placehold.co/600x400",
          company: "Mock News Corp",
          date: new Date().toLocaleString(),
        },
      ];
    }
    const baseURL = "https://api.polygon.io/v2/reference/news///";
    const newsURL = `${baseURL}?${
      ticker ? `ticker=${ticker}&` : ""
    }limit=10&apiKey=${this.yahooFinanceApiKey}`;
    try {
      const response = await fetch(newsURL);
      if (!response.ok) {
        console.error(`Error fetching news: ${response.status}`);
        return [];
      }
      const newsData = await response.json();
      if (!newsData.results || !Array.isArray(newsData.results)) {
        return [];
      }
      return newsData.results.map((news: any) => ({
        symbol: news.tickers?.join(", ") || "General News",
        title: news.title || "No Title",
        news: news.description || "No News Available",
        url: news.article_url || "#",
        imageUrl: news.image_url || "",
        company: news.publisher?.name || "Unknown Source",
        date: news.published_utc
          ? new Date(news.published_utc).toLocaleString()
          : "Unknown Date",
      }));
    } catch (error) {
      console.error("Error in getStockNews:", error);
      return [];
    }
  }

  async getEgyptNews(page: number): Promise<News[]> {
    if (!this.enabled.getEgyptNews) {
      console.log("getEgyptNews is disabled");
      return [
        {
          symbol: "EG News",
          title: "Mock Egypt News",
          news: "Sample Egypt news description",
          url: "https://example.com",
          image: "https://placehold.co/600x400",
          company: "Mock Source",
          date: new Date().toLocaleString(),
        },
      ];
    }
    const url = `https://api.marketaux.com/v1/news/all?countries=eg&limit=10&language=en&sort=published_at&sort_order=desc&api_token=${this.marketauxApiKey}&page=${page}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return [];
      }
      const newsData = await response.json();
      return newsData.data.map((news: any) => ({
        symbol: "EG News",
        title: news.title || "No Title",
        news: news.description || "No News Available",
        url: news.url || "#",
        image: news.image_url || "https://placehold.co/600x400",
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
