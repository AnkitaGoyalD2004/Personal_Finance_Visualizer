'use client';

import { useState } from 'react';
import TransactionList from '../components/TransactionList';

export default function Transactions() {
  const [refresh, setRefresh] = useState(false);

  const handleTransactionUpdated = () => {
    setRefresh(!refresh); // Toggle refresh state to trigger re-fetch
  };

  return (
    <div className="container mx-auto p-6">
      {/* Pass handleTransactionUpdated to trigger re-fetch after add or delete */}
      <TransactionList refresh={refresh} onUpdate={handleTransactionUpdated} />
    </div>
  );
}
