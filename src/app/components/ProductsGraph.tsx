import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import GraphLable from "./GraphLable";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}
interface ProductsGraphProps {
  products: Product[];
  loading: boolean;
}

export default function ProductsGraph({
  products,
  loading,
}: ProductsGraphProps) {
  return (
    <div className="rounded-xl border bg-white text-slate-950 shadow">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold leading-none tracking-tight">
          Stock Levels
        </h3>
        <p className="text-sm text-slate-500">Real-time inventory analysis</p>
      </div>

      {/* Chart wrapper */}
      <div className="relative p-6 pt-0 pl-0 pb-8 h-[300px] w-full">
        {/* Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="animate-spin h-8 w-8 border-4 border-slate-300 border-t-slate-900 rounded-full"></div>
          </div>
        )}

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={products} margin={{ bottom: 16 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              interval={0}
              tick={<GraphLable />}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Bar dataKey="stock" fill="#0f172a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
