import useBrandName from "@/utils/useBrandName";
import React from "react";

const BrandName = ({ brandId }) => {
  const { brandName, loading, error } = useBrandName(brandId);

  if (loading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>{error}</span>;
  }

  return <span>{brandName}</span>;
};

export default BrandName;
