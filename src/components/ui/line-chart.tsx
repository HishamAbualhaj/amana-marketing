"use client"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface LineChartProps {
  data: {
    week: string;
    value: number;
  }[];
  title: string;
  color: string;
}
const LineChart = ({ data, title, color }: LineChartProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Week Start Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  const chartData = {
    labels: data.map((d) => d.week),
    datasets: [
      {
        label: title,
        data: data.map((d) => d.value),
        borderColor: color,
        backgroundColor: color,
      },
    ],
  };

  return <Line options={options} data={chartData} />;
};
export default LineChart;
