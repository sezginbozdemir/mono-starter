import { getServerSupabase } from "@/lib/supabase/server";
import Image from "next/image";

export default async function Home() {
  const supabase = await getServerSupabase();
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .limit(50);

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-semibold">Error loading products</h2>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <h2 className="text-gray-600 text-xl font-medium">
            No products found
          </h2>
          <p className="text-gray-500 mt-2">Add some products to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mt-6 mb-8 text-gray-800">Products</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className="relative w-full h-48 bg-gray-100">
              <Image
                src={product.image_url || "/placeholder.png"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {product.name}
                </h3>

                <span
                  className={`px-2 py-0.5 text-xs rounded-full ${
                    product.availability === "in_stock"
                      ? "bg-green-100 text-green-700"
                      : product.availability === "out_of_stock"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {product.availability}
                </span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {product.description || "No description available"}
              </p>

              <div className="text-xs text-gray-500 mb-3">
                Code: {product.product_code}
              </div>

              <div className="mb-4">
                {product.discount_price ? (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-red-600">
                      {product.discount_price} {product.currency}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {product.price} {product.currency}
                    </span>
                  </div>
                ) : (
                  <span className="text-lg font-bold text-gray-900">
                    {product.price} {product.currency}
                  </span>
                )}
              </div>

              <div className="flex justify-between text-xs text-gray-500 mb-3">
                <span>Brand: {product.brand}</span>
                <span>By: {product.advertiser}</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {product.category && (
                  <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs">
                    {product.category}
                  </span>
                )}
                {product.subcategory && (
                  <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs">
                    {product.subcategory}
                  </span>
                )}
              </div>

              <a
                href={product.affiliate_link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
              >
                View Product
              </a>

              {product.created_at && (
                <div className="mt-2 text-xs text-gray-400">
                  Added: {product.created_at.split("T")[0]}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h2 className="text-lg font-semibold mb-3">Summary</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>Total Products: {products.length}</div>
          <div>
            With Discounts: {products.filter((p) => p.discount_price).length}
          </div>
          <div>Brands: {new Set(products.map((p) => p.brand)).size}</div>
          <div>
            Categories:
            {
              new Set(products.filter((p) => p.category).map((p) => p.category))
                .size
            }
          </div>
        </div>
      </div>
    </div>
  );
}
