export const candlestick = document.createElement("option");
candlestick.value = "candlestick";
candlestick.label = "Candle Stick";
candlestick.selected = "";
candlestick.classList.add("candyDoc__inspectorChartTypeOption");



export const candlestickOptions = {
    labels: [],
    colors:["#83C5BE","#FFDDD2"],
    stroke: {
      show: true,
      width: 1,
    },
    series: [
      {
        name: "candlestick",
        data: [
          {
            x: "G",
            y: [6629.81, 6650.5, 6623.04, 6633.33],
          },
          {
            x: "F",
            y: [6632.01, 6643.59, 6620, 6630.11],
          },
          {
            x: "E",
            y: [6630.71, 6648.95, 6623.34, 6635.65],
          },
          {
            x: "D",
            y: [6635.65, 6651, 6629.67, 6638.24],
          },
          {
            x: "C",
            y: [6638.24, 6640, 6620, 6624.47],
          },
          {
            x: "B",
            y: [6624.53, 6636.03, 6621.68, 6624.31],
          },
          {
            x: "A",
            y: [6624.61, 6632.2, 6617, 6626.02],
          },
        ],
      },
    ],
    tooltip: {
      enabled: false,
    },
    chart: {
      animations: {
        enabled: false,
        speed: 800,
        animateGradually: {
          enabled: false,
          delay: 150
        },
        dynamicAnimation: {
          enabled: false,
          speed: 350
        }
      },
      toolbar: {
        show: false,
      },

      type: "candlestick",
      width: "100%",
      height: "100%",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
      colors:["#000000"]
    },

    
    grid: {
      show: true,
      row: {
        colors: ["transparent", "transparent"],
        opacity: 0.5,
      },
      column: {
        colors: ["transparent", "transparent"],
        opacity: 0.5,
      },
    },
    title:{
      align:"center",
      text:"Chart Title",
      style:{
        color:"black",
        fontSize:"16px",
        fontWeight:"500"
      }
    }
  };