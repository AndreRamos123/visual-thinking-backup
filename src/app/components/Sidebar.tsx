export default function Sidebar() {
  return (
    <aside className="shrink-0 w-[300px] min-h-screen bg-[#0f172a] text-white">
      <div className="p-6 border-b border-[#1e293b]">
        <h1 className="text-2xl font-bold tracking-tight">Admin Panel</h1>
      </div>
      <nav className="mt-5">
        <ul className="space-y-1 px-4">
          <li className="bg-slate-800 text-white rounded-md p-3 cursor-pointer font-medium">
            Dashboard
          </li>
        </ul>
      </nav>
    </aside>
  );
}
