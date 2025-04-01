import { restClient } from '@polygon.io/client-js';

export class NetworkManagerTrial {
  private polygonApiKey: string;

  constructor(polygonApiKey: string) {
    this.polygonApiKey = polygonApiKey;
  }

  // Function to fetch stock symbols for specific companies
  public async fetchStockSymbols() {
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'AMZN']; // Apple, Microsoft, Google, Tesla, Amazon
    const stockSymbols = [];
  
    for (const symbol of symbols) {
      try {
        const response = await restClient(this.polygonApiKey).reference.tickerDetails(symbol);
  
        // Ensure response.results is an array before checking its length
        if (Array.isArray(response?.results) && response.results.length > 0) {
          stockSymbols.push(response.results[0]);
        } else {
          console.warn(`No valid results for symbol: ${symbol}`);
        }
      } catch (e) {
        console.error('An error happened:', e);
      }
    }
  
    return stockSymbols; // Return the results for the specific companies
  }
  
  

  // Function to fetch stock data including price and percent change
  public async fetchStockData(): Promise<{ [key: string]: { price: number; change: number } }> {
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'AMZN'];
    const results: { [key: string]: { price: number; change: number } } = {};

    try {
        for (const symbol of symbols) {
            const data = await restClient(this.polygonApiKey).stocks.dailyOpenClose(
                symbol,
                "2025-03-20",
                { adjusted: "true" }
            );

            if (typeof data.open !== "number" || typeof data.close !== "number") {
                console.warn(`Skipping ${symbol} due to invalid data: open=${data.open}, close=${data.close}`);
                continue;
            }

            results[symbol] = {
                price: data.close,
                change: data.open - data.close
            };
        }
    } catch (e) {
        console.error("An error happened while fetching stock data:", e);
        throw new Error("Failed to fetch stock data");
    }

    return results;
}






  public async fetchLogo(symbol: string): Promise<string | undefined> {
    console.log(`Fetching logo for symbol: ${symbol}`); 
  
    try {
      console.log(`Making API request for symbol: ${symbol}`);
      const response = await restClient(this.polygonApiKey).reference.tickerDetails(symbol);
  
      // Log the entire response to see its structure
      console.log(`Response from API for ${symbol}:`, response);
  
      if (response?.results?.branding?.icon_url) {
        const logoUrl = response.results.branding.icon_url;
        console.log(`Logo URL found: ${logoUrl}`);
        return logoUrl;
      } else {
        console.log(`No logo URL found for symbol: ${symbol}`);
      }
    } catch (error) {
      console.error('Error fetching logo for symbol:', symbol, error);
      return "undefined";
    }
  }
  
}
