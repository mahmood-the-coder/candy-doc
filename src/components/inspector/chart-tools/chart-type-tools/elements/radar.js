
export const radar = document.createElement("option");
radar.value = "radar";
radar.label = "Radar";
radar.selected = "";
radar.classList.add("candyDoc__inspectorChartTypeOption");

export const radarOptions = {
  stroke: {
    width: 2,
  },
  chart: {
    type: "radar",
    toolbar:{
      show:false,
    }
    
  },
  series: [
    {
      name: "Radar",
      data: [45, 52, 38, 24, 33, 10],
    },
  ],
  labels: ["April", "May", "June", "July", "August", "September"],
  colors: ["#83C5BE", "#FFDDD2"],
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
    row: {
      colors: ["transparent"],
      opacity: 0.5,
    },
    column: {
      colors: ["transparent"],
      opacity: 0.5,
    },
  },
  tooltip: {
    enabled: false,
  },
  fill: {
    opacity: 0.2,
  },
  dataLabels:{
    enabled:true
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
