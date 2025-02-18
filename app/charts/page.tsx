'use client';

import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Define colors for categories
const CATEGORY_COLORS: { [key: string]: string } = {
  Food: '#FF6347',
  Entertainment: '#0088FE',
  Transport: '#00C49F',
  Shopping: '#FFBB28',
  Bills: '#FF8042',
  Health: '#C71585'
};

const Charts = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch('/api/transactions'); // Fetch from API
        if (!res.ok) throw new Error('Failed to fetch transactions');
        const data = await res.json();

        console.log("Fetched Transactions:", data); // Debugging API response

        // Merge new data with existing transactions
        setTransactions((prevTransactions) => [...prevTransactions, ...data]);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };

    fetchTransactions();
  }, []);

  // Get category-wise data for Bar Chart
  const getCategoryData = () => {
    if (!transactions.length) return []; // Prevent errors if transactions is empty

    const categoryData: any = {};

    transactions.forEach((transaction) => {
      if (!transaction.category || !transaction.amount) return; // Ignore invalid data

      const category = transaction.category;
      const amount = transaction.amount;
      const date = new Date(transaction.date);
      const formattedDate = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;

      if (!categoryData[category]) {
        categoryData[category] = { category, totalAmount: 0, date: formattedDate };
      }

      categoryData[category].totalAmount += amount;
    });

    const formattedData = Object.values(categoryData);
    console.log("Bar Chart Data:", formattedData); // Debugging transformed data
    return formattedData;
  };

  const barData = getCategoryData(); // Get data before rendering

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Expense Breakdown</h2>

      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl mb-4 text-center">Category-wise Expenses</h3>

        {loading ? (
          <p className="text-center">Loading data...</p> // Show loading while fetching
        ) : barData.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value, name, props) => [`₹${value}`, `Date: ${props.payload.date}`]} />
              <Bar dataKey="totalAmount">
  {barData.map((entry: any, index) => (
    <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry?.category?.toString() || 'Other']} />
  ))}
</Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center">No data available to display the chart</p>
        )}
      </div>
    </div>
  );
};

export default Charts;
