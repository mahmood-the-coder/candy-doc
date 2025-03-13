
export const rangeArea = document.createElement("option");
rangeArea.value = "rangeArea";
rangeArea.label = "Range Area";
rangeArea.selected = "";
rangeArea.classList.add("candyDoc__inspectorChartTypeOption");

export const  rangeAreaOptions = {
    labels: [],
    colors:["#83C5BE","#FFDDD2"],
    series: [
      {
        name: "range area",
        data: [
          { x: "A", y: [10, 20] },
          { x: "B", y: [20, 25] },
          { x: "C", y: [15, 16] },
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

      type: "rangeArea",
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
    stroke: {
      show: true,
      curve: "smooth",
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