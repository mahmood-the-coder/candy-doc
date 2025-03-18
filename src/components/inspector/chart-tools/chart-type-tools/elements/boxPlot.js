export const boxPlot = document.createElement("option");
boxPlot.value = "boxPlot";
boxPlot.label = "Box Plot";
boxPlot.selected = "";
boxPlot.classList.add("candyDoc__inspectorChartTypeOption");
export const boxPlotOptions = {
  labels: [],
  colors:["#83C5BE","#FFDDD2"],
  stroke: {
    show: true,
    with:2,
  },
  plotOptions: {
    boxPlot: {
      colors: {
        upper: "#83C5BE",
        lower: "#FFDDD2",
      },
    },
  },
  series: [
    {
      name: "box plot",
      data: [
        {
          x: "Jan 2015",
          y: [54, 66, 69, 75, 88],
        },
        {
          x: "Jan 2016",
          y: [43, 65, 69, 76, 81],
        },
        {
          x: "Jan 2017",
          y: [31, 39, 45, 51, 59],
        },
        {
          x: "Jan 2018",
          y: [39, 46, 55, 65, 71],
        },
        {
          x: "Jan 2019",
          y: [29, 31, 35, 39, 44],
        },
        {
          x: "Jan 2020",
          y: [41, 49, 58, 61, 67],
        },
        {
          x: "Jan 2021",
          y: [54, 59, 66, 71, 88],
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

    type: "boxPlot",
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
