import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from "./ProductCard";
import { GetProducts } from "../../api/AllApi";

const PRODUCTS_PER_PAGE = 8;

function ProductGrid({ onPaginationChange }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await GetProducts({
          limit: PRODUCTS_PER_PAGE,
          status: "true",
          category_slug: searchParams.get("category_slug"),
          brand_slug: searchParams.get("brand_slug"),
          page: searchParams.get("page") || 1,
          min_price: searchParams.get("min_price"),
          max_price: searchParams.get("max_price"),
        });

        if (res && res.success) {
          setProducts(res.allProducts);
          onPaginationChange?.({
            pages: res.pages || 1,
            total: res.total || 0,
          });
        } else {
          setProducts([]);
          onPaginationChange?.({ pages: 1, total: 0 });
        }
      } catch (error) {
        console.error(error);
        setProducts([]);
        onPaginationChange?.({ pages: 1, total: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams, onPaginationChange]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
          <div
            key={index}
            className="aspect-[4/5] rounded-2xl bg-neutral-100 animate-pulse border border-neutral-100"
          />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-white border border-neutral-100 rounded-3xl text-center">
        <p className="text-sm font-black text-neutral-800 tracking-tight">
          No products found
        </p>
        <p className="text-xs text-neutral-400 font-medium mt-1">
          Try adjusting your filters to discover more items.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((pd) => (
        <ProductCard key={pd._id} product={pd} />
      ))}
    </div>
  );
}

export default ProductGrid;