import React, { useState } from "react";
import "./MainWindows.css";
import Chart from "chart.js/auto";
import { Bar, Pie, Line, Doughnut, Radar } from "react-chartjs-2";
// import { render } from "@testing-library/react";

function MainWindows() {
  const [inputNumber, setInputNumber] = useState("");
  const [inputLabel, setInputLabel] = useState("");
  const [labelSet, setLabelSet] = useState([]);
  const [dataSet, setDataSet] = useState([]);
  const [redraw, setRedraw] = useState(false);
  const [chartType, setChartType] = useState("Bar");
  const labels = labelSet;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Values",
        data: dataSet,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const option = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    onClick: (event, activeElements) => {
      if (activeElements.length > 0) {
        const { datasetIndex, index } = activeElements[0];
        removeData(datasetIndex, index);
      }
    },
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "index",
      intersect: false,
    },
  };

  function addData() {
    if (inputNumber !== "" && inputLabel !== "") {
      setLabelSet((oldArray) => [...oldArray, inputLabel]);
      setDataSet((oldArray) => [...oldArray, inputNumber]);
      setInputLabel("");
      setInputNumber("");
    }
  }
  function updateChartType() {
    const type = document.getElementById("chartType");
    setChartType(type.value);
  }

  function LabelHandleChange(event) {
    const labelValue = event.target.value;
    setInputLabel(labelValue);
  }

  function NumberHandleChange(event) {
    const numberValue = event.target.value;
    setInputNumber(numberValue);
  }

  function removeData(datasetIndex, index) {
    if (labelSet.length > index) {
      setRedraw(true);
      const newLabelSet = [...labelSet];
      newLabelSet.splice(index, 1);
      const newDataSet = [...dataSet];
      newDataSet.splice(index, 1);
      setLabelSet(newLabelSet);
      setDataSet(newDataSet);
      setRedraw(false);
    }
  }
  // console.log(chartType);

  return (
    <div className="container">
      <div className="chart-container">
        <div id="canvas-container">
          {
            {
              Bar: <Bar redraw={redraw} data={data} options={option} />,
              Line: <Line redraw={redraw} data={data} options={option} />,
              Pie: <Pie redraw={redraw} data={data} options={option} />,
              Doughnut: (
                <Doughnut redraw={redraw} data={data} options={option} />
              ),
              Radar: <Radar redraw={redraw} data={data} options={option} />,
            }[chartType]
          }
        </div>
      </div>
      <div className="controls">
        <select id="chartType" className="select">
          <option value="Bar">Bar</option>
          <option value="Line">Line</option>
          <option value="Pie">Pie</option>
          <option value="Doughnut">Doughnut</option>
          <option value="Radar">Radar</option>
        </select>
        <input
          type="text"
          onChange={LabelHandleChange}
          id="labelInput"
          className="input"
          placeholder="Label"
          value={inputLabel}
        />
        <input
          type="number"
          onChange={NumberHandleChange}
          id="dataInput"
          className="input"
          placeholder="Data"
          value={inputNumber}
        />
        <button onClick={addData} className="btn">
          Add Data
        </button>
        <button onClick={updateChartType} className="btn">
          Change Chart Type
        </button>
      </div>
    </div>
  );
}

export default MainWindows;
