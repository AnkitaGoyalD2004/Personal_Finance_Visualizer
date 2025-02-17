'use client';

import { useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

// Define the colors for the pie slices
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6347', '#C71585', '#FFD700'];

const Charts = () => {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    // Fetch transactions when the component mounts
    const fetchTransactions = async () => {
      try {
        const res = await fetch('/api/transactions');  // Correct API endpoint
        if (!res.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  // Get category-wise data for the Pie Chart
  const getCategoryData = () => {
    const categoryData: { [key: string]: number } = {};
    transactions.forEach((transaction) => {
      const category = transaction.category;
      const amount = transaction.amount;

      if (!categoryData[category]) {
        categoryData[category] = 0;
      }

      categoryData[category] += amount;
    });

    // Create an array of objects to pass to the Pie chart
    return Object.keys(categoryData).map((category) => ({
      name: category,
      value: categoryData[category],
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Charts</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category-wise Pie Chart */}
        <div>
          <h3 className="text-xl mb-4">Category-wise Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={getCategoryData()}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {getCategoryData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
