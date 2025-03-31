import { restClient } from '@polygon.io/client-js';

export class NetworkManagerTrial {
  private logoCache: { [key: string]: string } = {};
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
  public async fetchStockData(symbol: string): Promise<{ price: number; change: number }> {
    try {
      const response = await restClient(this.polygonApiKey).stocks.previousClose(symbol, { adjusted: true });
      if (!response || !response.results || response.results.length === 0) {
        console.warn(`No price data available for ${symbol}`);
        return { price: 0, change: 0 };
      }
      const { c: price, d: change } = response.results[0];
      return { price: price || 0, change: change || 0 };
    } catch (error) {
      console.error(`Error fetching stock data for ${symbol}:`, error);
      return { price: 0, change: 0 };
    }
  }


  public async fetchLogo(symbol: string): Promise<string | undefined> {
    console.log(`Fetching logo for symbol: ${symbol}`); // Log symbol being processed
  
    // Check if logo is cached
    if (this.logoCache[symbol]) {
      console.log(`Logo for symbol ${symbol} found in cache: ${this.logoCache[symbol]}`);
      return this.logoCache[symbol]; // Return the cached logo if available
    }
  
    try {
      console.log(`Making API request for symbol: ${symbol}`);
      const response = await restClient(this.polygonApiKey).reference.tickerDetails(symbol);
  
      // Log the entire response to see its structure
      console.log(`Response from API for ${symbol}:`, response);
  
      if (response?.results?.branding?.icon_url) {
        const logoUrl = response.results.branding.icon_url;
        console.log(`Logo URL found: ${logoUrl}`);
        this.logoCache[symbol] = logoUrl; // Cache the logo URL
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
