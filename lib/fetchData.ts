export const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/transactions");
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, response: ${errorText}`);
      }
      const data = await res.json();
      console.log("Fetched Transactions:", data); // Debugging
      return data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return [];
    }
  };
  
  export const fetchBudgets = async () => {
    try {
      const res = await fetch("/api/budget");
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, response: ${errorText}`);
      }
      const data = await res.json();
      console.log("Fetched Budgets:", data); // Debugging
      return data;
    } catch (error) {
      console.error("Error fetching budgets:", error);
      return [];
    }
  };
  