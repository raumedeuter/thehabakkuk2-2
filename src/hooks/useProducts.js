import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select(
            `
            *,
            variants (*)
          `,
          )
          .order("created_at", { ascending: true });

        if (productsError) throw productsError;

        // Transform to match existing product structure
        const transformed = productsData.map((p) => ({
          id: p.id,
          numericId: p.numeric_id, // from database — stable and reliable
          name: p.name,
          collection: p.collection_name,
          collectionSlug: p.collection_slug,
          description: p.description,
          price: `₦${(p.price / 100).toLocaleString()}`,
          size: p.size,
          pages: p.pages,
          defaultVariant: p.default_variant_slug,
          variants: (p.variants || []).map((v) => ({
            color: v.color,
            slug: v.slug,
            image: v.image_url,
            inStock: v.in_stock,
          })),
        }));

        setProducts(transformed);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}
