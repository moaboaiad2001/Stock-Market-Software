import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLanguage = localStorage.getItem("language") || "en"; // Retrieve saved language or default to English

i18n
  .use(initReactI18next)
  .init({
    resources: {
        en: {
          translation: {
            account: "Account",
            personalInformation: "Personal Information",
            transfers: "Transfers",
            portfolioOverview: "Portfolio Overview",
            transactionHistory: "Transaction History",
            applyForOptionTrading: "Apply for Option Trading",
            rewards: "Rewards",
            reportsAndStatements: "Reports and Statements",
            securityAndPrivacy: "Security & Privacy",
            settings: "Settings",
            logout: "Logout",
            generalPreferences: "General Preferences",
            changeLanguage: "Change Language",
            english: "English",
            arabic: "Arabic",
            maxIdleTime: "Max idle time",
            minutes: "15 minutes",
            help: "How can we help?",
            helpCentre: "Help Centre",
            liveChat: "Live Chat",
            home: "Home",
            portfolio: "Portfolio",
            markets: "Markets",
            news: "News",
            searchStocks: "Search Stocks",
            option1: "Option 1", // New translation keys for dropdown options
            option2: "Option 2",
            option3: "Option 3",
            option4: "Option 4",
            noStocksInWatchlist: "No stocks in your watchlist",
            currentAmount: "Current Amount",
            percentChange: "Percent Change",
            timeframe: "Timeframe",
            live: "Live",
            oneDay: "1 Day",
            oneWeek: "1 Week",
            oneMonth: "1 Month",
            threeMonths: "3 Months",
            oneYear: "1 Year",
            ytd: "Year to Date",
            watchlist: "Watchlist",
            funds: "Funds",
            biggestMovers: "Biggest Movers",
            heatMap: "Heat Map"
          },
        },
        ar: {
          translation: {
            account: "الحساب",
            personalInformation: "المعلومات الشخصية",
            transfers: "التحويلات",
            portfolioOverview: "نظرة عامة على المحفظة",
            transactionHistory: "سجل المعاملات",
            applyForOptionTrading: "التقديم لتداول الخيارات",
            rewards: "المكافآت",
            reportsAndStatements: "التقارير والبيانات",
            securityAndPrivacy: "الأمان والخصوصية",
            settings: "الإعدادات",
            logout: "تسجيل الخروج",
            generalPreferences: "التفضيلات العامة",
            changeLanguage: "تغيير اللغة",
            english: "الإنجليزية",
            arabic: "العربية",
            maxIdleTime: "الحد الأقصى للخمول",
            minutes: "15 دقيقة",
            help: "كيف يمكننا المساعدة؟",
            helpCentre: "مركز المساعدة",
            liveChat: "الدردشة المباشرة",
            home: "الرئيسية",
            portfolio: "المحفظة",
            markets: "الأسواق",
            news: "الأخبار",
            searchStocks: "البحث عن الأسهم",
            option1: "الخيار 1", // Translations for dropdown options in Arabic
            option2: "الخيار 2",
            option3: "الخيار 3",
            option4: "الخيار 4",
            noStocksInWatchlist: "لا توجد أسهم في قائمة المراقبة الخاصة بك",
            currentAmount: "المبلغ الحالي",
            percentChange: "نسبة التغيير",
            timeframe: "الفترة الزمنية",
            live: "مباشر",
            oneDay: "يوم واحد",
            oneWeek: "أسبوع واحد",
            oneMonth: "شهر واحد",
            threeMonths: "ثلاثة أشهر",
            oneYear: "سنة واحدة",
            ytd: "السنة حتى الآن",
            watchlist: "قائمة المراقبة",
            funds: "الأموال",
            biggestMovers: "أكبر المتحركات",
            heatMap: "خريطة الحرارة"
          },
        },
      },
    
    lng: savedLanguage, // Set the saved language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
