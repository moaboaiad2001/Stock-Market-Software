class Investment {
    private initialAmount: number;
    private dailyAmount: number;
    private weeklyAmount: number;
    private monthlyAmount: number;
    private threeMonthAmount: number;
    private yearlyAmount: number;
    private currentAmount: number;
  
    constructor(
      initialAmount: number,
      dailyAmount: number,
      weeklyAmount: number,
      monthlyAmount: number,
      threeMonthAmount: number,
      yearlyAmount: number,
      currentAmount: number
    ) {
      this.initialAmount = initialAmount;
      this.dailyAmount = dailyAmount;
      this.weeklyAmount = weeklyAmount;
      this.monthlyAmount = monthlyAmount;
      this.threeMonthAmount = threeMonthAmount;
      this.yearlyAmount = yearlyAmount;
      this.currentAmount = currentAmount;
    }
  
    // 🔹 Get Increase Amounts
    getIncrease(period: "1D" | "1W" | "1M" | "3M" | "1Y" | "YTD"): number {
      switch (period) {
        case "1D":
          return this.currentAmount - this.dailyAmount;
        case "1W":
          return this.currentAmount - this.weeklyAmount;
        case "1M":
          return this.currentAmount - this.monthlyAmount;
        case "3M":
          return this.currentAmount - this.threeMonthAmount;
        case "1Y":
          return this.currentAmount - this.yearlyAmount;
        case "YTD":
          return this.currentAmount - this.initialAmount;
        default:
          return 0;
      }
    }
  
    // 🔹 Get Percentage Increase
    getPercentIncrease(period: "1D" | "1W" | "1M" | "3M" | "1Y" | "YTD"): number {
      let baseAmount;
      switch (period) {
        case "1D":
          baseAmount = this.dailyAmount;
          break;
        case "1W":
          baseAmount = this.weeklyAmount;
          break;
        case "1M":
          baseAmount = this.monthlyAmount;
          break;
        case "3M":
          baseAmount = this.threeMonthAmount;
          break;
        case "1Y":
          baseAmount = this.yearlyAmount;
          break;
        case "YTD":
          baseAmount = this.initialAmount;
          break;
        default:
          return 0;
      }
      return baseAmount ? ((this.currentAmount - baseAmount) / baseAmount) * 100 : 0;
    }
  
    // 🔹 Get Class Name Based on Increase (for UI)
    getClassName(period: "1D" | "1W" | "1M" | "3M" | "1Y" | "YTD"): string {
      return this.getIncrease(period) >= 0 ? "performance-positive" : "performance-negative";
    }
  
    // 🔹 Get Symbol Based on Increase
    getSymbol(period: "1D" | "1W" | "1M" | "3M" | "1Y" | "YTD"): string {
      return this.getIncrease(period) >= 0 ? "▲" : "▼";
    }

    public getCurrentAmount(): number {
        return this.currentAmount;
      }
  }
  
  export default Investment;
  