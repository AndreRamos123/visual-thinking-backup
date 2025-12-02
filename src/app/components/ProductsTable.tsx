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
      <div className="p-6">
        <div className="w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
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
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center">
                    Loading data from server...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center">
                    No products on this page.
                  </td>
                </tr>
              ) : (
                products.map((product: any) => (
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
                      <div className="inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 text-slate-950">
                        {product.category}
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="p-4 align-middle">
                      {product.stock < 20 ? (
                        <span className="text-red-600 ">Low Stock</span>
                      ) : (
                        <span className="text-emerald-600 font-medium">
                          In Stock
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
