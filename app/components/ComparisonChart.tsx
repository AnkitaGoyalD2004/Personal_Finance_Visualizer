"use client"

import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Define the Budget type
type Budget = {
  category: string;
  amount: number;
};

// Define the Transaction type if not already defined
type Transaction = {
  category: string;
  amount: number;
};

const ComparisonChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading

        // Fetch transactions
        const transactionsRes = await fetch("/api/transactions");
        if (!transactionsRes.ok) throw new Error("Failed to fetch transactions");
        const transactions = await transactionsRes.json();

        // Fetch budgets
        const budgetsRes = await fetch("/api/budget");
        if (!budgetsRes.ok) throw new Error("Failed to fetch budgets");
        const budgets = await budgetsRes.json();

        // Format the data properly
        const formattedData = budgets.map((budget: Budget) => {
          const actualExpense = transactions
            .filter((t: Transaction) => t.category === budget.category)
            .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

          return {
            category: budget.category,
            budgeted: budget.amount,
            actual: actualExpense,
          };
        });

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false); // Stop loading after data fetch
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>; // Prevent rendering before data is ready

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="budgeted" fill="#8884d8" name="Budgeted Amount" />
        <Bar dataKey="actual" fill="#82ca9d" name="Actual Expense" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ComparisonChart;
