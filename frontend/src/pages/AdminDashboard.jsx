export default function AdminDashboard() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold mb-10">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="/admin/add-stock" className="p-6 bg-white shadow rounded text-xl font-bold">
          Add Stock
        </a>

        <a href="/admin/view-stock" className="p-6 bg-white shadow rounded text-xl font-bold">
          View Stock
        </a>

        <a href="/admin/history" className="p-6 bg-white shadow rounded text-xl font-bold">
          Stock History
        </a>

        <a href="/admin/reports" className="p-6 bg-white shadow rounded text-xl font-bold">
          Reports
        </a>
      </div>
    </div>
  );
}
