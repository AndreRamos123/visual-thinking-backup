"use client";

import React, { useState, useEffect } from "react";
import ProductsGraph from "./components/ProductsGraph";
import ProductsTable from "./components/ProductsTable";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import DashboardHeader from "./components/DashboardHeader";
import { useRouter } from "next/navigation";

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
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found, redirecting to login");
        router.push("/login");
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `/api/products?q=${searchQuery}&page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          console.log("API Error:", res.status);
          setProducts([]);
          setLoading(false);
          return;
        }

        const data = await res.json();

        setProducts(data);
        setTotalPages(parseInt(res.headers.get("X-Total-Pages") || "1"));
        setLoading(false);
      } catch (e) {
        console.log("Fetch error:", e);
        setProducts([]);
        setLoading(false);
      }
    };
    fetchData();
  }, [searchQuery, currentPage, router]);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-slate-50">
        <DashboardHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          products={products}
        />
        <div className="p-4 sm:p-6 md:p-8 space-y-8 max-w-full">
          <div className="w-full max-w-5xl mx-auto space-y-6">
            <ProductsGraph products={products} loading={loading} />
            <ProductsTable
              products={products}
              loading={loading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevPage={() => setCurrentPage((p) => Math.max(1, p - 1))}
              onNextPage={() =>
                setCurrentPage((p) => {
                  return Math.min(totalPages, p + 1);
                })
              }
            />
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
