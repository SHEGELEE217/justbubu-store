// app/admin/page.tsx
"use client";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { UploadCloud, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "", category: "Fashion", price: "", description: "",
    availability: "In Stock", sizes: "", colors: "", quantity: "",
  });

  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages(Array.from(e.target.files).slice(0, 5));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length < 2) return alert("Please upload at least 2 images.");
    setIsLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      images.forEach((image) => data.append('images', image));

      const response = await fetch('/api/admin/add-product', { method: 'POST', body: data });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to add product");

      alert("Product added successfully to the database!");
      router.push("/"); 
    } catch (error: any) {
      alert(error.message || "Something went wrong while saving.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Add New Product</h2>
        <p className="text-gray-500">Fill in the details below to add a new item to the JustBubu store.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
        
        {/* ... Keep all your form inputs exactly as they are ... */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Product Images (2 to 5)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors relative">
            <input type="file" multiple accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <UploadCloud className="mx-auto text-gray-400 mb-3" size={40} />
            <p className="text-sm text-gray-600 font-medium">Click or drag images here to upload</p>
          </div>
          {images.length > 0 && <p className="text-sm text-green-600 mt-2 font-medium">{images.length} image(s) selected.</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
            <input type="text" required placeholder="e.g. Royal Purple Silk Gown" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-justbubu-purple" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-justbubu-purple bg-white" onChange={(e) => setFormData({...formData, category: e.target.value})}>
              <option value="Fashion">Fashion (Ready-to-Wear)</option>
              <option value="Groceries">Groceries</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₦)</label>
            <input type="number" required placeholder="e.g. 45000" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-justbubu-purple" onChange={(e) => setFormData({...formData, price: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity Available</label>
            <input type="number" required placeholder="e.g. 10" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-justbubu-purple" onChange={(e) => setFormData({...formData, quantity: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Availability Status</label>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-justbubu-purple bg-white" onChange={(e) => setFormData({...formData, availability: e.target.value})}>
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Pre-order">Pre-order</option>
            </select>
          </div>
        </div>

        {formData.category === "Fashion" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
            <div>
              <label className="block text-sm font-semibold text-justbubu-purple mb-2">Available Sizes</label>
              <input type="text" placeholder="e.g. S, M, L, XL (comma separated)" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-justbubu-purple" onChange={(e) => setFormData({...formData, sizes: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-justbubu-purple mb-2">Available Colors</label>
              <input type="text" placeholder="e.g. Purple, Gold, Black" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-justbubu-purple" onChange={(e) => setFormData({...formData, colors: e.target.value})} />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea required rows={4} placeholder="Write a detailed description of the product..." className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-justbubu-purple" onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
        </div>

        <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 bg-justbubu-purple text-white font-bold py-4 rounded-lg hover:bg-purple-900 transition-colors disabled:opacity-50">
          {isLoading ? <Loader2 className="animate-spin" /> : null}
          {isLoading ? "Saving to Database..." : "Save Product to Store"}
        </button>
      </form>
    </div>
  );
}