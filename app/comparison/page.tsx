import BudgetForm from "../components/BudgetForm";
import ComparisonChart from "../components/ComparisonChart";

const ComparisonPage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Budget vs Actual Comparison</h1>

      {/* Budget Form */}
      <BudgetForm />

      {/* Budget vs Actual Comparison Chart */}
      <ComparisonChart />
    </div>
  );
};

export default ComparisonPage;