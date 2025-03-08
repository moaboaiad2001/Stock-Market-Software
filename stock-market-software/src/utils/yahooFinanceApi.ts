// Define the shape of the Yahoo Finance API object
interface YahooFinanceApi {
    _env: {};
    _fetch: (urlBase: string, params?: Record<string, string>, moduleOpts?: any, func?: string, needsCrumb?: boolean) => Promise<any>;
    quoteCombine: any;
    quoteSummary: any;
    // Add more methods or properties as needed
    [key: string]: any;  // Index signature to allow dynamic keys
  }
  
  // Yahoo Finance API object with methods
  const yahooFinanceApi: YahooFinanceApi = {
    _env: {},
    _fetch: async (urlBase: string, params?: Record<string, string>, moduleOpts?: any, func?: string, needsCrumb?: boolean) => {
      // Implementation of the _fetch method (stub for this example)
      try {
        const response = await fetch(urlBase, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add any necessary headers here
          },
          // Pass additional params, etc. in the request
          body: JSON.stringify(params),
        });
  
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    },
    quoteCombine: {},
    quoteSummary: {},
    // Add other API methods here as needed
  };
  
  // Example usage
  const key: keyof YahooFinanceApi = 'quoteCombine'; // Specific key
  const value = yahooFinanceApi[key];  // This will work correctly now
  
  const dynamicKey: string = 'quoteSummary';  // Example of dynamic key
  const dynamicValue = yahooFinanceApi[dynamicKey];  // This works due to the index signature
  
  console.log(value, dynamicValue);
  
  export default yahooFinanceApi;
  