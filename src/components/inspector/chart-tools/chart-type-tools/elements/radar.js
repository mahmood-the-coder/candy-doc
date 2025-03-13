
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
    type: "radar",
    width: "100%",
    height: "100%",
    minHeight:250,
    minWidth:250,
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
      opacity: 0,
    },
    column: {
      colors: ["transparent"],
      opacity:0,
    },
  },
  tooltip: {
    enabled: false,
  },
  fill: {
    opacity: 0.2,
  },
  dataLabels:{
    enabled:true,
    colors:["#000000"]
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
