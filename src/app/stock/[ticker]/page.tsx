"use client";
import React, { useEffect, useRef, memo, useState } from "react";
// import SquareWidget from "@/app/components/widgets/SquareWidget";
import AnalysisWidget from "../../components/widgets/AnalysisWidget";

const StockWidget = ({ params }: { params: { ticker: string } }) => {
  const container = useRef<HTMLDivElement | null>(null);
  const { ticker } = params;
  const [widgetWidth, setWidgetWidth] = useState<number>(
    window.innerWidth - 100
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.async = true;
    script.innerHTML = `
      {
        "symbols": [["${ticker}"]],
        "chartOnly": false,
        "width": ${widgetWidth},
        "locale": "en",
        "colorTheme": "dark",
        "autosize": true,
        "showVolume": false,
        "showMA": false,
        "hideDateRanges": false,
        "hideMarketStatus": false,
        "hideSymbolLogo": false,
        "scalePosition": "right",
        "scaleMode": "Normal",
        "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
        "fontSize": "10",
        "noTimeScale": false,
        "valuesTracking": "1",
        "changeMode": "price-and-percent",
        "chartType": "area",
        "maLineColor": "#2962FF",
        "maLineWidth": 1,
        "maLength": 9,
        "lineWidth": 2,
        "lineType": 0,
        "dateRanges": [
          "1d|1",
          "1m|30",
          "3m|60",
          "12m|1D",
          "60m|1W",
          "all|1M"
        ]
      }`;

    if (container.current) container.current.innerHTML = "";

    const scriptContainer = document.createElement("div");
    scriptContainer.className = "tradingview-widget-container__widget";
    if (container.current) container.current.appendChild(scriptContainer);
    scriptContainer.appendChild(script);

    const handleResize = () => {
      setWidgetWidth(window.innerWidth - 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ticker, widgetWidth]);

  return (
    <div>
      <div className="mx-auto">
        <div className="flex justify-center items-center">
          <div className="tradingview-widget-container" ref={container}></div>
        </div>
      </div>
      <AnalysisWidget ticker={ticker} />
    </div>
  );
};

export default memo(StockWidget);
