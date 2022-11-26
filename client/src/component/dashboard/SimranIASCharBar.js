import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// import faker from 'faker';
// import { setRandomFallback } from 'bcryptjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Simran IAS",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const data1 = [0, 100, 250, 40, 340, 700];
const data2 = [243, 211, 234, 756, 346, 124];
export const data = {
  labels,
  datasets: [
    {
      label: "Facebook",
      data: labels.map(() => data1),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Google",
      data: labels.map(() => data2),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const SimranIASCharBar = () => {
  return <Bar options={options} data={data} />;
};

export default SimranIASCharBar;
