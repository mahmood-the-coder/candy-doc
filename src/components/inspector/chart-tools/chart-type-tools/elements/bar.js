export const bar = document.createElement("option");
bar.value = "bar";
bar.label = "Bar";
bar.selected = "";
bar.classList.add("candyDoc__inspectorChartTypeOption");

export const barOptions = {
  labels: [],
  plotOptions: {
    bar: {
      colors: {
        backgroundBarColors: ["#83C5BE", "#FFDDD2"],
        backgroundBarOpacity: 0.2,
        backgroundBarRadius: 0,
      },
    },
  },
  colors: ["#83C5BE", "#FFDDD2"],
  stroke: {
    show: false,
  },
  series: [
    {
      name: "Bar",
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

    type: "bar",
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
