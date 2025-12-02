import React from "react";

import { useEffect, useState } from "react";
interface DashboardHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const DELAY = 500;

export default function DashboardHeader({
  searchQuery,
  setSearchQuery,
}: DashboardHeaderProps) {
  const [value, setValue] = useState(searchQuery);
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, DELAY);

    return () => clearTimeout(handler);
  }, [value]);

  useEffect(() => {
    if (debouncedValue) {
      setSearchQuery(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <div className="border-b border-[#e2e8f0] p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white gap-4">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
        Product Overview
      </h2>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
        <input
          className="flex h-10 w-full sm:w-[300px] rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
          placeholder="Server-side search..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 bg-slate-900 text-slate-50 hover:bg-slate-900/90 h-10 px-4 py-2">
          Export Data
        </button>
      </div>
    </div>
  );
}
