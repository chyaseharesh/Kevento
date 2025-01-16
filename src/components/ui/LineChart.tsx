import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// interface ChartData {
//   name: string;
//   confirmed: number;
//   pending: number;
// }

import { useEffect, useState } from "react";

// interface LineChartsProps {
//   chartData: ChartData[];
// }

export default function LineCharts() {
  // console.log(chartData);
const [loadingChart, setLoadingChart] = useState(true);
const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchChartData();
    setLoadingChart(false); // Once data is fetched, set loading state to false
  
  }, []);
  const fetchChartData = async () => {
    try {
      const response = await fetch("/api/dashboard/weekly");
      const data = await response.json();
      setChartData(data);
      console.log(data);
      setLoadingChart(false);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  }


  // Conditional rendering to ensure chart only renders when data is available
  // if (chartData.length === 0) {
  //   return <div>Loading...</div>;
  // }


  return (
    <>
    {loadingChart? 
    <div>Loading...</div>:
      <ResponsiveContainer>
     
       <LineChart data={chartData} >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        
        <Line type="monotone" dataKey="confirmed" stroke="#8884d6" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="pending" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer> 
} 
    </>
  );
}
