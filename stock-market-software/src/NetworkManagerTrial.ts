import { restClient } from '@polygon.io/client-js';

export class NetworkManagerTrial {
  private polygonApiKey: string;

  constructor(polygonApiKey: string) {
    this.polygonApiKey = polygonApiKey;
  }

  // Function to fetch stock symbols for specific companies
  public async fetchStockSymbols(symbols:string) {
    
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
  public async fetchStockData(ticker: string) {
    const rest = restClient(this.polygonApiKey)

    try {
      const data = await rest.reference.tickerDetails(ticker);
      return {
        symbol: data.results?.ticker ?? ticker,
        name: data.results?.name ?? ticker,
        price: data.results?.primary_exchange ?? 0, // Ensure this exists
        percentChange: data.results?.primary_exchange ?? 0, // Ensure this exists
        logo_url: data?.results?.branding?.logo_url ?? "", // Handle missing logo
      };
    } catch (error) {
      console.error(error);
      return null; // Return null on failure
    }
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


