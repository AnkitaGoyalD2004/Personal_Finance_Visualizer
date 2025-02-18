'use client';

import React, { useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6347', '#C71585', '#FFD700'];

interface DashboardProps {
  transactions: any[]; 
  budgets: any[]; 
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, budgets }) => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch('/api/transactions');
        const data = await res.json();
        setRecentTransactions(data);

        // Calculate total expenses
        const total = data.reduce((acc: number, transaction: any) => acc + transaction.amount, 0);
        setTotalExpenses(total);

        // Group by category and get the category breakdown
        const categoryMap: { [key: string]: number } = {};
        data.forEach((transaction: any) => {
          const category = transaction.category;
          const amount = transaction.amount;
          if (!categoryMap[category]) {
            categoryMap[category] = 0;
          }
          categoryMap[category] += amount;
        });

        const categories = Object.keys(categoryMap).map((category) => ({
          name: category,
          value: categoryMap[category],
        }));
        setCategoryData(categories);

        // Get the most recent 5 transactions
        const recent = data.slice(0, 5);
        setRecentTransactions(recent);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Total Expenses Card */}
      <div className="p-6 bg-white rounded-md shadow-md">
        <h3 className="text-lg font-bold">Total Expenses</h3>
        <p className="text-xl">${totalExpenses.toFixed(2)}</p>
      </div>

      {/* Category Breakdown Card */}
      <div className="p-6 bg-white rounded-md shadow-md">
        <h3 className="text-lg font-bold">Category Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Most Recent Transactions Card */}
      <div className="p-6 bg-white rounded-md shadow-md">
        <h3 className="text-lg font-bold">Most Recent Transactions</h3>
        <ul>
          {recentTransactions.map((transaction) => (
            <li key={transaction._id} className="border-b py-2">
              <p><strong>{transaction.description}</strong></p>
              <p>Amount: ${transaction.amount}</p>
              <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
              <p>Category: {transaction.category}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
