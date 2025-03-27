
const convertToArabicNumerals = (num: number): string => {
    const englishToArabic: Record<number, string> = {
      0: '٠',
      1: '١',
      2: '٢',
      3: '٣',
      4: '٤',
      5: '٥',
      6: '٦',
      7: '٧',
      8: '٨',
      9: '٩',
    };
  
    // Format the number to two decimal places
    const formattedNumber = num.toFixed(2);
  
    // Convert the formatted number to Arabic numerals
    const arabicFormatted = formattedNumber
      .split('')
      .map((digit) => englishToArabic[parseInt(digit)] || digit)
      .join('');
  
    // Return the formatted number with "ج.م" symbol
    return arabicFormatted + " ج.م"; // Add ج.م to the number
  };
  
  export default convertToArabicNumerals;
  