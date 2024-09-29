import { useState, useEffect } from "react";
import { fetchApi } from "./FetchApi";

const useBrandName = (brandId) => {
  const [brandName, setBrandName] = useState("Unknown Brand");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrandName = async () => {
      try {
        setLoading(true);
        const response = await fetchApi(`/brand/getBrandId/${brandId}`, "GET");
        setBrandName(response?.data?.brand?.name || "Unknown Brand");
      } catch (error) {
        console.error("Error fetching brand name:", error);
        setError("Error fetching brand name");
        setBrandName("Unknown Brand");
      } finally {
        setLoading(false);
      }
    };

    if (brandId) {
      fetchBrandName();
    }
  }, [brandId]);

  return { brandName, loading, error };
};

export default useBrandName;
