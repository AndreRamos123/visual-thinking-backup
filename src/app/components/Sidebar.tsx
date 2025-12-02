export default function Sidebar() {
  return (
    <aside
      style={{
        width: "300px",
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "white",
      }}
      className="shrink-0"
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
  );
}
