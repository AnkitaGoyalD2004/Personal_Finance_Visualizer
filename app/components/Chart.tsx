'use client';

import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Define colors for bars
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6347', '#C71585', '#FFD700'];

const Charts = () => {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    // Fetch transactions when component mounts
    const fetchTransactions = async () => {
      try {
        const res = await fetch('/api/transactions');  // Correct API endpoint
        if (!res.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data = await res.json();
        console.log("Fetched transactions:", data); // Debug log
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  // Get category-wise data for Bar Chart
  const getCategoryData = () => {
    const categoryData: any = {};

    transactions.forEach((transaction) => {
      const category = transaction.category;
      const amount = transaction.amount;
      const date = new Date(transaction.date);
      const formattedDate = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;

      if (!category) return; // Ensure category exists

      if (!categoryData[category]) {
        categoryData[category] = { category, totalAmount: 0, date: formattedDate };
      }

      categoryData[category].totalAmount += amount;
    });

    const formattedData = Object.values(categoryData);
    console.log("Bar Chart Data:", formattedData); // Debug log
    return formattedData;
  };

  const barData = getCategoryData(); // Get data before rendering

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Charts</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category-wise Bar Chart */}
        <div>
          <h3 className="text-xl mb-4">Category-wise Expenses</h3>

          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value, name, props) => [`₹${value}`, `Date: ${props.payload.date}`]} />
                <Bar dataKey="totalAmount" fill="#8884d8">
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>No data available to display the chart</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Charts;
