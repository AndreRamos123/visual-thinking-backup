"use client";

import React, { useState, useEffect } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
	const [products, setProducts] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const pageSize = 5;

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				setProducts([]);
				const res = await fetch(
					`/api/products?q=${searchQuery}&page=${currentPage}`,
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
		currentPage * pageSize,
	);

	return (
		<div className="flex h-screen bg-white overflow-hidden">
			<aside
				style={{
					width: "300px",
					minHeight: "100vh",
					backgroundColor: "#0f172a",
					color: "white",
				}}
				className="flex-shrink-0"
			>
				<div style={{ padding: "24px", borderBottom: "1px solid #1e293b" }}>
					<h1 className="text-2xl font-bold tracking-tight">AdminPanel</h1>
				</div>
				<nav style={{ marginTop: "20px" }}>
					<ul className="space-y-1 px-4">
						<li className="bg-slate-800 text-white rounded-md p-3 cursor-pointer font-medium">
							Dashboard
						</li>
					</ul>
				</nav>
			</aside>

			<main className="w-[100vw] overflow-y-auto bg-slate-50">
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

				<div className="p-8 space-y-8">
					<div style={{ width: "1200px" }} className="space-y-6">
						<div className="rounded-xl border bg-white text-slate-950 shadow">
							<div className="flex flex-col space-y-1.5 p-6">
								<h3 className="font-semibold leading-none tracking-tight">
									Stock Levels
								</h3>
								<p className="text-sm text-slate-500">
									Real-time inventory analysis
								</p>
							</div>
							<div className="p-6 pt-0">
								<div style={{ height: "300px", width: "100%" }}>
									<ResponsiveContainer width="100%" height="100%">
										<BarChart data={products}>
											<CartesianGrid strokeDasharray="3 3" vertical={false} />
											<XAxis
												dataKey="name"
												stroke="#888888"
												fontSize={12}
												tickLine={false}
												axisLine={false}
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
													border: "none",
													boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
												}}
											/>
											<Bar
												dataKey="stock"
												fill="#0f172a"
												radius={[4, 4, 0, 0]}
											/>
										</BarChart>
									</ResponsiveContainer>
								</div>
							</div>
						</div>

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
											) : paginatedProducts.length === 0 ? (
												<tr>
													<td colSpan={5} className="p-4 text-center">
														No products on this page.
													</td>
												</tr>
											) : (
												paginatedProducts.map((product: any) => (
													<tr
														key={product.id}
														className="border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100"
													>
														<td className="p-4 align-middle font-medium">
															#{product.id}
														</td>
														<td className="p-4 align-middle">
															<span
																style={{
																	fontSize: "16px",
																	fontWeight: "bold",
																	color: "#334155",
																}}
															>
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
																<span style={{ color: "red" }}>Low Stock</span>
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
											onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
										>
											Previous
										</button>
										<button
											className="inline-flex items-center rounded-md bg-slate-100 px-3 py-1 text-sm"
											onClick={() =>
												setCurrentPage((p) => Math.min(totalPages, p + 1))
											}
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
					</div>
					<div
						style={{
							marginTop: "40px",
							textAlign: "center",
							color: "#94a3b8",
							width: "1200px",
						}}
					>
						<p className="text-sm">© 2024 BuggyApp Inc. All rights reserved.</p>
					</div>
				</div>
			</main>
		</div>
	);
}
