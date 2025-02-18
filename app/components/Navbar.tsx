'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-gray-800">Finance Visualizer</h1>
      <div className="space-x-4">
        <Link href="/" className="text-gray-600 hover:text-black">
          Home
        </Link>
        <Link href="/dashboard" className="text-gray-600 hover:text-black">
          Dashboard
        </Link>
        <Link href="/transactions" className="text-gray-600 hover:text-black">
          Transactions
        </Link>
        <Link href="/charts" className="text-gray-600 hover:text-black">
          Charts
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
