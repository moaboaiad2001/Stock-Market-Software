const CLEARBIT_API_KEY = process.env.REACT_APP_CLEARBIT_API_KEY || "pk_DyPdnVhOSZW3YvDMYolr-w";

interface ClearbitCompanyData {
  name: string;
  logo: string;
  category?: {
    industry: string;
  };
}

/**
 * Fetch company data from Clearbit
 * @param {string} domain - Company domain (e.g., "apple.com")
 * @returns {Promise} - Resolves with API response or rejects with an error
 */
export const fetchClearbitData = async (domain: string): Promise<ClearbitCompanyData> => {
  try {
    const response = await fetch(`https://company.clearbit.com/v2/companies/find?domain=${domain}`, {
      headers: {
        Authorization: `Bearer ${CLEARBIT_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Clearbit API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Clearbit API Error: ${(error as Error).message}`);
    throw error;
  }
};
