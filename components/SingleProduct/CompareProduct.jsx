"use client";
import { fetchProducts } from "@/redux/slice/productsSlice";
import { fetchApi } from "@/utils/FetchApi";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
};

export default function CompareProduct({ open, setOpen, currentProduct }) {
  const handleClose = () => setOpen(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [loading, setLoading] = useState(false);

  const products = useSelector((state) => state.products);

  // Dispatch function to trigger the fetchProducts action
  const dispatch = useDispatch();

  useEffect(() => {
 
      dispatch(fetchProducts()); // Fetch products when component mounts

  }, [dispatch]);

  const allProducts = products?.products?.products || [];


  console.log("allProducts", allProducts);
  

  
  function compareSimilarProducts(currentProduct, allProducts) {
    const {
      productBrand,
      categoryId,
      general: { salePrice },
    } = currentProduct;
  
  
    const minPrice = salePrice - 10000;
    const maxPrice = salePrice + 10000;
  
    // Filter products based on the same category, different brand, and within the price range
    const similarProducts = allProducts?.filter((product) => {
      const isSameCategory = product?.categoryId.some((catId) =>
        categoryId.includes(catId)
      );
      const isDifferentBrand = product.productBrand !== productBrand;
      const isWithinPriceRange =
        product?.general.salePrice >= minPrice && product?.general.salePrice <= maxPrice;
  
      return isSameCategory && isDifferentBrand && isWithinPriceRange;
    });
  
    return similarProducts;
  }
  


  const similarProducts = compareSimilarProducts(currentProduct, allProducts);

  const handleCheckboxChange = (index) => {
    setSelectedCheckbox(index);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="" sx={style}>
          <table className="table-auto">
            <tbody>
              <tr>
                <td className="border px-5 py-2">Picture</td>
                <td className="border px-5 py-2">
                  <Image
                    width={200}
                    height={200}
                    src={currentProduct?.productImage}
                    alt={currentProduct?.productSlug}
                    className="w-20 h-20"
                  />
                </td>
                {similarProducts.map((product, index) => (
                  <td key={index} className="border px-5 py-2">
                    <Image
                      width={200}
                      height={200}
                      src={product?.productImage}
                      alt={product?.productSlug}
                      className="w-20 h-20"
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border px-5 py-2">Product Name</td>
                <td className="border px-5 py-2">
                  {currentProduct?.productName}
                </td>
                {similarProducts.map((product, index) => (
                  <td key={index} className="border px-5 py-2">
                    {product?.productName}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border px-5 py-2">Stock</td>
                <td className="border px-5 py-2">
                  {currentProduct?.inventory?.stockStatus}
                </td>
                {similarProducts.map((product, index) => (
                  <td key={index} className="border px-5 py-2">
                    {product?.inventory?.stockStatus}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border px-5 py-2">Features</td>

                <td
                  className="border px-5 py-2"
                  dangerouslySetInnerHTML={{
                    __html: currentProduct?.productShortDescription,
                  }}
                ></td>
                {similarProducts.map((product, index) => (
                  <td
                    key={index}
                    className="border px-5 py-2"
                    dangerouslySetInnerHTML={{
                      __html: product?.productShortDescription,
                    }}
                  ></td>
                ))}
              </tr>
              <tr>
                <td className="border px-5 py-2">Price</td>
                <td className="border px-5 py-2 font-semibold">
                  {currentProduct.general.salePrice}
                </td>
                {similarProducts.map((product, index) => (
                  <td key={index} className="border px-5 py-2 font-semibold">
                    {product.general.salePrice}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border px-5 py-2">Brand</td>
                <td className="border px-5 py-2">
                  {currentProduct.productBrand}
                </td>
                {similarProducts.map((product, index) => (
                  <td key={index} className="border px-5 py-2">
                    {product.productBrand}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border px-5 py-2 text-nowrap">Add to Cart</td>
                <td className="border px-5 py-2">
                  <div className="flex justify-center items-center">
                    <input
                      type="checkbox"
                      checked={selectedCheckbox === 1}
                      onChange={() => handleCheckboxChange(1)}
                      className="mr-2 scale-150"
                    />
                  </div>
                </td>
                {similarProducts.map((product, index) => (
                  <td key={index} className="border px-5 py-2">
                    <div className="flex justify-center items-center">
                      <input
                        type="checkbox"
                        checked={selectedCheckbox === index + 2}
                        onChange={() => handleCheckboxChange(index + 2)}
                        className="mr-2 scale-150"
                      />
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Box>
      </Modal>
    </div>
  );
}
