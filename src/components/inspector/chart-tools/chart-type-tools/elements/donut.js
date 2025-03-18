
export const donut = document.createElement("option");
donut.value = "donut";
donut.label = "Donut";
donut.selected = "";
donut.classList.add("candyDoc__inspectorChartTypeOption");

export const  donutOptions = {
    stroke: {
      show: false,
    },
    series: [10, 100, 50, 60],
    labels: ["apple", "banana", "orange", "coconut"],
    colors:["#83C5BE","#FFDDD2"],
    tooltip: {
      enabled: false,
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

      type: "donut",
      width: "100%",
      height: "100%",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        var total = opts.w.globals.seriesTotals.reduce((a, b) => a + b, 0);
        var percentage = (
          (opts.w.globals.series[opts.seriesIndex] / total) *
          100
        ).toFixed(2);
        return percentage + "%";
      },
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