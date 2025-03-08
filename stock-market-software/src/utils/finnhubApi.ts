import finnhub from "finnhub";

// Type definitions for the Finnhub API response
export interface FinnhubCandles {
  t: number[]; // Timestamp array
  o: number[]; // Open prices
  h: number[]; // High prices
  l: number[]; // Low prices
  c: number[]; // Close prices
  v: number[]; // Volume
}

export interface FinnhubProfile {
  name: string;
  industry: string;
  logo: string;
}

export interface FinnhubData {
  candles: FinnhubCandles;
  profile: FinnhubProfile;
}

// Finnhub API client setup using your API key
const finnhubApiKey = process.env.REACT_APP_FINNHUB_API_KEY as string;

if (!finnhubApiKey) {
  throw new Error("Finnhub API key is missing.");
}

// Initialize Finnhub API client
const finnhubClient = new finnhub.DefaultApi();
const apiKey = new finnhub.ApiClient().authentications["api_key"];
apiKey.apiKey = finnhubApiKey;

// Fetch candles data for a specific symbol
export const fetchFinnhubCandles = async (symbol: string, resolution: string, from: number, to: number): Promise<FinnhubCandles> => {
  try {
    const candles = await finnhubClient.stockCandles(symbol, resolution, from, to);
    return candles;
  } catch (error) {
    console.error(`Finnhub API Error: ${(error as Error).message}`);
    throw error;
  }
};

// Fetch company profile data for a specific symbol
export const fetchFinnhubProfile = async (symbol: string): Promise<FinnhubProfile> => {
  try {
    const profile = await finnhubClient.companyProfile({ symbol });
    return profile;
  } catch (error) {
    console.error(`Finnhub API Error: ${(error as Error).message}`);
    throw error;
  }
};

// Example usage: Fetch data for Apple Inc. (AAPL)
export const fetchFinnhubData = async (symbol: string, resolution: string, from: number, to: number): Promise<FinnhubData> => {
  try {
    const candles = await fetchFinnhubCandles(symbol, resolution, from, to);
    const profile = await fetchFinnhubProfile(symbol);
    
    return {
      candles,
      profile,
    };
  } catch (error) {
    console.error(`Finnhub API Error: ${(error as Error).message}`);
    throw error;
  }
};
