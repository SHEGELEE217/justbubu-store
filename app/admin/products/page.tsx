// app/admin/products/page.tsx
"use client";
import { useState, useEffect } from "react";
import { Trash2, Loader2, Search } from "lucide-react";

export default function AllProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products when the page loads
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle deleting a product
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product? This cannot be undone.")) return;

    try {
      const response = await fetch(`/api/admin/delete-product?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error("Failed to delete");

      // Remove the product from the UI immediately without refreshing the page
      setProducts(products.filter((p) => p.id !== id));
      alert("Product deleted successfully.");
    } catch (error) {
      alert("Error deleting product.");
    }
  };

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">All Products</h2>
          <p className="text-gray-500">Manage your store's inventory.</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-justbubu-purple"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center py-20 text-justbubu-purple">
          <Loader2 className="animate-spin" size={40} />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                  <th className="p-4 font-semibold">Product</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold">Stock</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-8 text-gray-500">No products found.</td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-4 flex items-center gap-4">
                        {/* Show the first image as a thumbnail */}
                        {product.images && product.images[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-xs text-gray-400">No Img</div>
                        )}
                        <span className="font-semibold text-gray-800">{product.name}</span>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.category === 'Fashion' ? 'bg-purple-100 text-justbubu-purple' : 'bg-green-100 text-green-700'}`}>
                          {product.category}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-gray-700">₦{Number(product.price).toLocaleString()}</td>
                      <td className="p-4 text-gray-600">{product.quantity} in stock</td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}