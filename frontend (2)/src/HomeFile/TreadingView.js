import { useEffect, useRef } from "react";

const TradingViewForexCrossRates = () => {
  const widgetRef = useRef(null);

  useEffect(() => {
    if (widgetRef.current) {
      widgetRef.current.innerHTML = ""; // Clear previous widget before appending new script
    }
    
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: 400,
      currencies: [
        "EUR",
        "USD",
        "JPY",
        "GBP",
        "CHF",
        "AUD",
        "CAD",
        "NZD"
      ],
      isTransparent: false,
      colorTheme: "light",
      locale: "en",
      backgroundColor: "#ffffff"
    });

    widgetRef.current.appendChild(script);
  }, []);

  return (
    <div className="p-4 mx-auto mt-5 tradingview-widget-container max-w-7xl sm:mt-10">
      <div className="pb-3 text-3xl font-semibold text-center text-green-600">
        <span className="text-yellow-400">Real-Time Market Chart
        </span>
        </div>
      <div ref={widgetRef} className="p-4 rounded-lg shadow-md tradingview-widget-container__widget shadow-green-400"></div>
      <div className="mt-4 font-semibold text-center text-white tradingview-widget-copyright">
      </div>
    </div>
  );
};

export default TradingViewForexCrossRates;