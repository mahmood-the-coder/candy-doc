const ApexCharts = require("apexcharts")
import { charts } from "../../chart/index.js";
import { getSelected } from "../../selection/index.js";
import { labelController } from "./chart-series-tools/chart-labels-item/index.js";
import {
  addValueIcon,
  removeSeriesElementIcon,
  seriesElement,
} from "./chart-series-tools/chart-series-element/index.js";
import { fiveValueWrapper } from "./chart-series-tools/chart-series-item/five-values/index.js";
import { fourValueWrapper } from "./chart-series-tools/chart-series-item/four-values/index.js";
import { ValueItem } from "./chart-series-tools/chart-series-item/index.js";
import {
  rangeValueItemFromController,
  rangeValueItemToController,
  rangeValueWrapper,
} from "./chart-series-tools/chart-series-item/range-value/index.js";
import { singleValueController } from "./chart-series-tools/chart-series-item/single-value/index.js";
import {
  addSeriesIcon,
  seriesList,
} from "./chart-series-tools/chart-series-list/index.js";
export function renderChartData() {
  const selected = getSelected();
  if (!selected) return;
  const options = JSON.parse(selected?.dataset?.chartOptions ?? "null");
  if (!options) return;
  seriesList.innerHTML = "";
  seriesList.append(addSeriesIcon);
  const addIcon = seriesList.querySelector(
    ".candyDoc__inspectorChartSeriesListAddIcon"
  );
  if (addIcon) addIcon.style.display = "block";
  if (options.chart.type == "radialBar") {
    const list = seriesElement.cloneNode();
    list.append(addValueIcon);
    options.series.forEach((value, sIndex) => {
      const valueItemClone = ValueItem.cloneNode(true);
      const valueController = singleValueController.cloneNode(true);
      const label = labelController.cloneNode(true);
      label.dataset.index = sIndex.toString();
      label.addEventListener("input", (e) => {
        options.labels[e.target.dataset.index] = e.target.value;
        selected.dataset.chartOptions = JSON.stringify(options);
        renderApexChart(options);
      });
      valueController.dataset.index = sIndex.toString();
      valueController.addEventListener("input", (e) => {
        options.series[e.target.dataset.index] = parseFloat(e.target.value);
        selected.dataset.chartOptions = JSON.stringify(options);
        renderApexChart(options);
      });
      valueController.value = value;
      label.value = options.labels[sIndex];
      valueItemClone.append(label, valueController);
      valueItemClone.dataset.label = label.value;
      valueItemClone.dataset.value = valueController.value;
      valueItemClone.dataset.index = sIndex.toString();
      list.append(valueItemClone);
    });
    seriesList.append(list);
    const addIcon = document.body.querySelector(
      ".candyDoc__inspectorChartSeriesListAddIcon"
    );
    if (addIcon) addIcon.style.display = "none";
  } else if (options.chart.type == "donut") {
    const list = seriesElement.cloneNode();
    list.append(addValueIcon);
    options.series.forEach((value, index) => {
      const valueItemClone = ValueItem.cloneNode(true);
      const valueController = singleValueController.cloneNode(true);
      const label = labelController.cloneNode(true);
      label.dataset.index = index.toString();
      label.addEventListener("input", (e) => {
        options.labels[e.target.dataset.index] = e.target.value;
        selected.dataset.chartOptions = JSON.stringify(options);

        renderApexChart(options);
      });
      valueController.dataset.index = index.toString();
      valueController.addEventListener("input", (e) => {
        options.series[e.target.dataset.index] = parseFloat(e.target.value);
        selected.dataset.chartOptions = JSON.stringify(options);
        renderApexChart(options);
      });
      valueController.value = value;
      label.value = options.labels[index];
      valueItemClone.append(label, valueController);
      valueItemClone.dataset.label = label.value;
      valueItemClone.dataset.value = valueController.value;
      valueItemClone.dataset.index = index.toString();
      list.append(valueItemClone);
    });
    seriesList.append(list);
    const addIcon = document.body.querySelector(
      ".candyDoc__inspectorChartSeriesListAddIcon"
    );
    if (addIcon) addIcon.style.display = "none";
  } else if (options.chart.type == "candlestick") {
    options.series.forEach((s, sIndex) => {
      const list = seriesElement.cloneNode(true);
      list.dataset.index = sIndex;
      s.data.forEach((d, dIndex) => {
        const valueItemClone = ValueItem.cloneNode(true);
        valueItemClone.dataset.index = dIndex.toString();

        const label = labelController.cloneNode(true);
        label.value = d.x;
        label.addEventListener("input", (e) => {
          d.x = e.target.value;
          renderApexChart(options);
        });
        const valueController = fourValueWrapper.cloneNode(true);
        valueController.value = d.y;
        valueController.querySelectorAll("input").forEach((i, index) => {
          i.addEventListener("input", (e) => {
            options.series[
              e.target.parentElement.parentElement.parentElement.parentElement.dataset.index
            ].data[
              e.target.parentElement.parentElement.parentElement.dataset.index
            ].y[index] = e.target.value;
            selected.dataset.chartOptions = JSON.stringify(options);
            renderApexChart(options);
          });
          i.value = options.series[sIndex].data[dIndex].y[index];
        });
        valueItemClone.append(label, valueController);
        list.append(
          removeSeriesElementIcon.cloneNode(),
          addValueIcon.cloneNode(true),
          valueItemClone
        );
      });
      seriesList.append(list);
    });
  } else if (options.chart.type == "boxPlot") {
    options.series.forEach((s, sIndex) => {
      const list = seriesElement.cloneNode(true);
      list.dataset.index = sIndex;
      s.data.forEach((d, dIndex) => {
        const valueItemClone = ValueItem.cloneNode(true);
        valueItemClone.dataset.index = dIndex.toString();

        const label = labelController.cloneNode(true);
        label.value = d.x;
        label.addEventListener("input", (e) => {
          d.x = e.target.value;
          renderApexChart(options);
        });
        const valueController = fiveValueWrapper.cloneNode(true);
        valueController.value = d.y;
        valueController.querySelectorAll("input").forEach((i, index) => {
          i.addEventListener("input", (e) => {
            options.series[
              e.target.parentElement.parentElement.parentElement.parentElement.dataset.index
            ].data[
              e.target.parentElement.parentElement.parentElement.dataset.index
            ].y[index] = e.target.value;
            selected.dataset.chartOptions = JSON.stringify(options);
            renderApexChart(options);
          });
          i.value = options.series[sIndex].data[dIndex].y[index];
        });
        valueItemClone.append(label, valueController);
        list.append(
          removeSeriesElementIcon.cloneNode(),
          addValueIcon.cloneNode(true),
          valueItemClone
        );
      });
      seriesList.append(list);
    });
  } else if (options.chart.type.includes("range")) {
    options.dataLabels.enabled = false;
    options.series.forEach((s, sIndex) => {
      const list = seriesElement.cloneNode(true);
      list.dataset.index = sIndex;
      s.data.forEach((d, dIndex) => {
        const valueItemClone = ValueItem.cloneNode(true);
        valueItemClone.dataset.index = dIndex.toString();

        const label = labelController.cloneNode(true);
        label.value = d.x;
        label.addEventListener("input", (e) => {
          data[e.target.parentElement.dataset.index].x = e.target.value;
          selected.dataset.chartOptions = JSON.stringify(options);
          renderApexChart(options);
        });
        const fromValue = rangeValueItemFromController.cloneNode(true);
        fromValue.addEventListener("input", (e) => {
          d.y[0] = e.target.value;

          selected.dataset.chartOptions = JSON.stringify(options);
          renderApexChart(options);
        });
        fromValue.value = d.y[0];
        const toValue = rangeValueItemToController.cloneNode(true);
        toValue.addEventListener("input", (e) => {
          d.y[1] = e.target.value;

          selected.dataset.chartOptions = JSON.stringify(options);

          renderApexChart(options);
        });
        toValue.value = d.y[1];
        const rangeWrapper = rangeValueWrapper.cloneNode(true);
        rangeWrapper.append(fromValue, toValue);
        valueItemClone.append(label, rangeWrapper);
        list.append(

          removeSeriesElementIcon.cloneNode(),
          addValueIcon.cloneNode(true),
          valueItemClone
        );
      });
      seriesList.append(list);
      selected.dataset.chartOptions = JSON.stringify(options);
    });
  }
  else if (options.chart.type.includes("radar")) {
    options.series.forEach((s, sIndex) => {
      const list = seriesElement.cloneNode(true);
      list.dataset.index = sIndex.toString();
      s.data.forEach((d, dIndex) => {
        const valueItemClone = ValueItem.cloneNode(true);
        valueItemClone.dataset.index = dIndex.toString();
        const valueController = singleValueController.cloneNode(true);
        const label = labelController.cloneNode(true);
        label.value = options.labels[dIndex]
        valueController.value = d
        valueItemClone.append(label, valueController);
        list.append(valueItemClone);
        label.addEventListener("input", (e) => {
          options.labels[e.target.parentElement.dataset.index] = e.target.value;

          selected.dataset.chartOptions = JSON.stringify(options);

          renderApexChart(options);
        });
        valueController.addEventListener("input", (e) => {
          options.series[
            e.target.parentElement.parentElement.dataset.index
          ].data[e.target.parentElement.dataset.index] = e.target.value;

          selected.dataset.chartOptions = JSON.stringify(options);

          renderApexChart(options);
        });
      });
      seriesList.append(list);
    });
    selected.dataset.chartOptions = JSON.stringify(options);
  }

  else {
    options.series.forEach((s, sIndex) => {
      const list = seriesElement.cloneNode(true);
      list.dataset.index = sIndex.toString();
      s.data.forEach((d, dIndex) => {
        const valueItemClone = ValueItem.cloneNode(true);
        valueItemClone.dataset.index = dIndex.toString();
        const valueController = singleValueController.cloneNode(true);
        const label = labelController.cloneNode(true);
        label.value = d.x
        valueController.value = d.y
        valueItemClone.append(label, valueController);
        list.append(valueItemClone);
        label.addEventListener("input", (e) => {
          options.series[e.target.parentElement.parentElement.dataset.index].data[e.target.parentElement.dataset.index].x = e.target.value;

          selected.dataset.chartOptions = JSON.stringify(options);

          renderApexChart(options);
        });
        valueController.addEventListener("input", (e) => {
          options.series[
            e.target.parentElement.parentElement.dataset.index
          ].data[e.target.parentElement.dataset.index].y = e.target.value;

          selected.dataset.chartOptions = JSON.stringify(options);

          renderApexChart(options);
        });
      });
      seriesList.append(list);
    });
  }
  selected.dataset.chartOptions = JSON.stringify(options);
}

export function updateApexChart(id, newOptions) {
  const index = charts.findIndex((c) => c.id == id);
  if (index <= -1) return;
  charts[index]?.updateOptions(newOptions);

  charts[index]?.updateSeries(newOptions.series);
  const selected = getSelected();
  if (!selected) return;
  selected.dataset.chartOptions = JSON.stringify(newOptions);
}

export function renderApexChart(options) {
  const selected = getSelected();
  if (!selected) return;
  selected.querySelector(".candyDoc__chart").innerHTML = "";
  const apex = new ApexCharts(
    selected.querySelector(".candyDoc__chart"),
    options
  );

  charts.filter(apex => apex.id == selected.id).forEach(apex => apex.destroy())

  apex.render().then(() => {
    apex.id = selected.id;
    selected.dataset.chartOptions = JSON.stringify(options);
    charts.push(apex);
  });
}

