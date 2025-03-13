
export const treemap = document.createElement("option");
treemap.value = "treemap";
treemap.label = "Tree Map";
treemap.selected = "";
treemap.classList.add("candyDoc__inspectorChartTypeOption");

export const  treemapOptions = {
    labels: [],
    colors:["#83C5BE","#FFDDD2"],
    stroke: {
      show: false,
    },
    series: [
      {
        name: "treemap",
        data: [
          { x: "A", y: 10 },
          { x: "B", y: 20 },
          { x: "C", y: 15 },
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

      type: "treemap",
      width: "100%",
      height: "100%",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: true,
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