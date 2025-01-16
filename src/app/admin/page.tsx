'use client'
import { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import { DollarSign, Users, Activity, Ticket } from "lucide-react";
import Card, { CardContent } from "@/components/Card";
import BarChart from "@/components/BarChart";
import LineCharts from "@/components/ui/LineChart";

export default function Home() {
  interface DashboardData {
    revenue: {
      currentMonth: number;
      isUp: boolean;
      changePercentage: number;
    };
    totalTicketsSold: number;
    totalUsers: number;
    blockedUsers: number;
    sales: number;
    subscriptions: number;
    activeNow: number;

    recentSales: {
      email: string;
      name: string;
      saleAmount: number;
    }[];
    barChartData: { labels: string[]; datasets: { label: string; data: number[] }[] }; // Adjust type as needed
  }

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  // const [chartData, setChartData] = useState([]);
  const [data, setData] = useState([]);
const [loadingChart, setLoadingChart] = useState(true);
  const [loading, setLoading] = useState(true);


  const fetchChartData = async () => {
    try {
      const response = await fetch("/api/dashboard/weekly");
      const data = await response.json();
      // setChartData(data);
      console.log(data);
      setLoadingChart(false);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };
  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/dashboard");
      const data = await response.json();
      console.log(data);
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };
  const fetchRevenueData = async () => {
    const response = await fetch('/api/dashboard/revenue-per-event'); // API endpoint
    const result = await response.json();
    console.log("aaa", result);
    setLoading(false);
    setData(result);
  };
  useEffect(() => {
    fetchDashboardData();
    fetchChartData();
    fetchRevenueData();
    setLoading(false); // Once data is fetched, set loading state to false
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>; // Show a loading state while data is being fetched
  }

  const {
    revenue,
    totalUsers,
    blockedUsers,
    totalTicketsSold,
  } = dashboardData;

  const cardData = [
    {
      label: "Total Revenue",
      amount: `$${revenue.currentMonth.toString()}`,
      discription: `${revenue.isUp ? "+" : "-"}${revenue.changePercentage?.toFixed(
        2
      )}% from last month`,
      icon: DollarSign,
    },
    {
      label: "Total Users",
      amount: `${totalUsers}`,
      // amount: `+${subscriptions}`,
      discription: `${blockedUsers} blocked user(s)`, // Replace with actual data when available
      icon: Users,
    },
    {
      label: "Total Tickets Sold",
      amount: `+${totalTicketsSold}`,
      discription: "", // Replace with actual data when available
      icon: Ticket,
    },
    {
      label: "Events Registered",
      amount: `+${2}`,
      discription: "+201 since last hour", // Replace with actual data when available
      icon: Activity,
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
        {cardData.map((d, i) => (
          <Card
            key={i}
            amount={d.amount}
            discription={d.discription}
            icon={d.icon}
            label={d.label}
          />
        ))}
      </section>
      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2 min-h-96">
        <CardContent>
          <p className="px-3 font-semibold">Tickets booked over the week</p>
          {
            loadingChart ? (<div>Loading...</div> ): (
              <LineCharts 
              // chartData={chartData} 
              />
            )
          }
        </CardContent>

        <CardContent>
          <p className="px-4 font-semibold">Overview</p>
          {
            loading ? (<div>Loading...</div>) : (
              <BarChart data={data} />
            )
          }
        </CardContent>

      </section>
    </div>
  );
}
