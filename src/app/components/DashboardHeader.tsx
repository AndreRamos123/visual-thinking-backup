import React from "react";

interface DashboardHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function DashboardHeader({
  searchQuery,
  setSearchQuery,
}: DashboardHeaderProps) {
  return (
    <div
      style={{
        borderBottom: "1px solid #e2e8f0",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">
        Product Overview
      </h2>
      <div className="flex items-center gap-4">
        <input
          className="flex h-10 rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Server-side search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            border: "1px solid black",
            width: "400px",
          }}
        />
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-slate-50 hover:bg-slate-900/90 h-10 px-4 py-2">
          Export Data
        </button>
      </div>
    </div>
  );
}
