'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Define colors for bars
const CATEGORY_COLORS: Record<string, string> = {
  Food: '#FF8042',
  Transport: '#00C49F',
  Shopping: '#FFBB28',
  Bills: '#0088FE',
  Entertainment: '#C71585',
};

const Comparison = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [budgets, setBudgets] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [newBudgets, setNewBudgets] = useState<Record<string, number>>({});
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const res = await fetch('/api/transactions');
          const data = await res.json();
          setTransactions(data);
      
          const budgetRes = await fetch('/api/budgets');
          const budgetData = await budgetRes.json();
          setBudgets(budgetData);
          setNewBudgets(budgetData);
        } finally {
          setLoading(false);
        }
      };
      

    fetchData();
  }, []);

  const getCategoryData = () => {
    const categoryData: any = {};

    transactions.forEach(({ category, amount }) => {
      if (!category || !amount) return;
      categoryData[category] = (categoryData[category] || 0) + amount;
    });

    return Object.keys(categoryData).map((category) => ({
      category,
      totalSpent: categoryData[category],
      budget: budgets[category] || 0,
    }));
  };

  const handleBudgetChange = (category: string, value: string) => {
    setNewBudgets((prev) => ({ ...prev, [category]: Number(value) }));
  };

  const saveBudgets = async () => {
    try {
      await fetch('/api/budgets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBudgets),
      });
      setBudgets(newBudgets);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000); // Hide after 2 seconds
    } catch (error) {
      console.error('Error saving budgets:', error);
    }
  };

  const barData = getCategoryData();

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Budget vs Actual Comparison</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Budget Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Set Monthly Budgets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.keys(CATEGORY_COLORS).map((category) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-lg">{category}</span>
                    <Input
                      type="number"
                      value={newBudgets[category] || ''}
                      onChange={(e) => handleBudgetChange(category, e.target.value)}
                      className="w-24"
                    />
                  </div>
                ))}
                <Button onClick={saveBudgets} className="w-full mt-2">
                  Save Budgets
                </Button>
                {showSaved && <p className="text-green-500 text-sm mt-2">Budgets saved successfully!</p>}
              </div>
            </CardContent>
          </Card>

          {/* Budget vs Actual Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Budget vs Actual Spending</CardTitle>
            </CardHeader>
            <CardContent>
              {barData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="totalSpent" name="Spent" fill="#FF6347">
                      {barData.map((entry, index) => (
                        <Cell key={index} fill={CATEGORY_COLORS[entry.category] || '#8884d8'} />
                      ))}
                    </Bar>
                    <Bar dataKey="budget" name="Budget" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p>No data available</p>
              )}
            </CardContent>
          </Card>

          {/* Spending Insights */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-center">Spending Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {barData.map(({ category, totalSpent, budget }) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-lg">{category}</span>
                    <span
                      className={`text-lg font-semibold ${
                        totalSpent > budget ? 'text-red-500' : 'text-green-500'
                      }`}
                    >
                      {totalSpent > budget
                        ? `Overspent by ₹${(totalSpent - budget).toFixed(2)}`
                        : `₹${(budget - totalSpent).toFixed(2)} left`}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Comparison;

