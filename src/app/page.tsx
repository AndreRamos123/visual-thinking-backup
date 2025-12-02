"use client";

import React, { useState, useEffect } from "react";
import ProductsGraph from "./components/ProductsGraph";
import ProductsTable from "./components/ProductsTable";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import DashboardHeader from "./components/DashboardHeader";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/products?q=${searchQuery}&page=${currentPage}`
        );
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    fetchData();
  }, [searchQuery, currentPage]);

  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const paginatedProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />
      <main className="w-screen overflow-y-auto bg-slate-50">
        <DashboardHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <div className="p-8 space-y-8">
          <div className="w-[1200px] space-y-6">
            <ProductsGraph products={products} />

            <ProductsTable
              products={paginatedProducts}
              loading={loading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevPage={() => setCurrentPage((p) => Math.max(1, p - 1))}
              onNextPage={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
            />
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
