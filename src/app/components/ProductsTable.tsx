import React from "react";
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}
export default function ProductsTable({
  products,
  loading,
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}: ProductTableProps) {
  return (
    <div className="rounded-xl border bg-white text-slate-950 shadow">
      <div className="p-6 relative">
        {/* Overlay for loading */}
        {loading && (
          <div className="absolute inset-0 z-20 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-xl">
            <div className="animate-spin h-8 w-8 border-4 border-slate-300 border-t-slate-900 rounded-full"></div>
          </div>
        )}

        {/* Table for md+ screens */}
        <div className="w-full overflow-x-auto hidden md:block">
          <table className="min-w-[600px] w-full caption-bottom text-xs sm:text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500">
                  ID
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500">
                  Product
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500">
                  Category
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500">
                  Price
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-slate-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {!loading && products.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center">
                    No products on this page.
                  </td>
                </tr>
              )}
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100"
                >
                  <td className="p-4 align-middle font-medium">
                    #{product.id}
                  </td>
                  <td className="p-4 align-middle">
                    <span className="text-[16px] font-bold text-[#334155]">
                      {product.name}
                    </span>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold text-slate-950">
                      {product.category}
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="p-4 align-middle">
                    {product.stock < 20 ? (
                      <span className="text-red-600">Low Stock</span>
                    ) : (
                      <span className="text-emerald-600 font-medium">
                        In Stock
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards for small screens */}
        <div className="block md:hidden">
          {!loading && products.length === 0 && (
            <div className="p-4 text-center">No products on this page.</div>
          )}
          {!loading && products.length > 0 && (
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 shadow-sm flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 font-medium">
                      ID
                    </span>
                    <span className="font-bold text-[#334155]">
                      #{product.id}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">
                      Product
                    </span>
                    <span className="text-base font-bold text-[#334155]">
                      {product.name}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">
                      Category
                    </span>
                    <span className="inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold text-slate-950">
                      {product.category}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">
                      Price
                    </span>
                    <span className="font-medium">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">
                      Status
                    </span>
                    {product.stock < 20 ? (
                      <span className="text-red-600">Low Stock</span>
                    ) : (
                      <span className="text-emerald-600 font-medium">
                        In Stock
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <button
              className="mr-2 inline-flex items-center rounded-md bg-slate-100 px-3 py-1 text-sm"
              onClick={onPrevPage}
            >
              Previous
            </button>
            <button
              className="inline-flex items-center rounded-md bg-slate-100 px-3 py-1 text-sm"
              onClick={onNextPage}
            >
              Next
            </button>
          </div>
          <div className="text-sm text-slate-500">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      </div>
    </div>
  );
}
