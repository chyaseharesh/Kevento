'use client';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataItem {
  name: string;
  [key: string]: number | string;
}

interface RevenueBarChartProps {
  data: DataItem[];
}

const RevenueBarChart: React.FC<RevenueBarChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {data.length > 0 &&
    Object.keys(data[0])
      .filter((key) => key !== "name")
      .map((key) => (
        <Bar key={key} dataKey={key} stackId="a" fill={getRandomColor()} />
      ))}
    </BarChart>
  </ResponsiveContainer>
  );
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default RevenueBarChart;
