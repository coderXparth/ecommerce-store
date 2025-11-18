export default function Home() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-5xl font-bold text-blue-600">
        Welcome to Smart Warehouse
      </h1>
      <p className="text-lg mt-4 text-gray-600">
        Efficient Inventory and Smart Management.
      </p>

      <div className="mt-10 space-x-4">
        <a href="/products" className="px-6 py-3 bg-blue-600 text-white rounded-lg">
          Shop Now
        </a>
        <a href="/login" className="px-6 py-3 bg-gray-700 text-white rounded-lg">
          Login
        </a>
      </div>
    </div>
  );
}
