"use client";
import { fetchProducts } from "@/redux/slice/productsSlice";
import { fetchApi } from "@/utils/FetchApi";
import { motion, AnimatePresence } from "framer-motion";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "@/redux/slice/cartSlice";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BrandName from "../global/BrandName";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "1200px",
  padding: "20px",
  bgcolor: "background.paper",
  boxShadow: 24,
  margin: "0 auto",
  borderRadius: "10px",
};

export default function CompareProduct({ open, setOpen, currentProduct }) {
  const handleClose = () => setOpen(false);

  const [isInCart, setIsInCart] = useState(false);
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setIsInCart(!!cart.find((item) => item._id === currentProduct?._id));
  }, [cart, currentProduct?._id]);

  const allProducts = products?.products?.products || [];

  function compareSimilarProducts(currentProduct, allProducts) {
    const {
      productBrand,
      categoryId: currentCategoryIds,
      general: { salePrice },
      _id,
    } = currentProduct;

    const minPrice = salePrice - 5000;
    const maxPrice = salePrice + 5000;

    const similarProducts = allProducts?.filter((product) => {
      const matchingCategories = product?.categoryId.filter((catId) =>
        currentCategoryIds.includes(catId)
      ).length;

      const isAtLeastTwoCategoriesMatched = matchingCategories >= 2;
      const isWithinPriceRange =
        product?.general?.salePrice >= minPrice &&
        product?.general.salePrice <= maxPrice;
      const isNotCurrentProduct = product._id !== _id;

      return (
        isAtLeastTwoCategoriesMatched &&
        isWithinPriceRange &&
        isNotCurrentProduct
      );
    });

    return similarProducts.slice(0, 2);
  }

  const similarProducts = compareSimilarProducts(currentProduct, allProducts);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="mx-5 sm:mx-auto" sx={style}>
          <div className="overflow-auto max-h-[570px]">
            <table className="table-auto w-full">
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
                  <td className="border px-5 py-2 text-nowrap md:text-balance">
                    {currentProduct?.productName}
                  </td>
                  {similarProducts.map((product, index) => (
                    <td key={index} className="border px-5 py-2 text-nowrap md:text-balance">
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
                  <td className="border px-5 py-3 align-top"> Key Features</td>

                  <td
                    className="border px-5 py-3 align-top [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-5"
                    dangerouslySetInnerHTML={{
                      __html:
                        currentProduct?.productShortDescription ||
                        "No description available",
                    }}
                  ></td>

                  {similarProducts.map((product, index) => (
                    <td
                      key={index}
                      className="border px-5 py-3 align-top [&_ul]:list-disc [&_ol]:list-decimal [&_li]:ml-5"
                      dangerouslySetInnerHTML={{
                        __html:
                          product?.productShortDescription ||
                          "No description available",
                      }}
                    ></td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-5 py-2">Price</td>
                  <td className="border px-5 py-2 font-semibold">
                    ৳ {currentProduct.general.salePrice}
                  </td>
                  {similarProducts.map((product, index) => (
                    <td key={index} className="border px-5 py-2 font-semibold">
                      ৳ {product.general.salePrice}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-5 py-2">Brand</td>
                  <td className="border px-5 py-2">
                    <BrandName brandId={currentProduct?.productBrand} />
                  </td>
                  {similarProducts.map((product, index) => (
                    <td key={index} className="border px-5 py-2">
                      <BrandName brandId={product?.productBrand} />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border px-5 text-nowrap">Add to Cart</td>
                  <td className="border px-5">
                    <div className="mt-5 w-full text-md">
                      <AnimatePresence mode="wait">
                        {isInCart ? (
                          <motion.div
                            key="inCart"
                            className="bg-[#FFCD00] rounded-full w-full flex justify-between items-center font-semibold"
                            initial={{ width: "60%" }}
                            animate={{ width: "100%" }}
                            exit={{ width: "60%" }}
                            transition={{ duration: 0.7 }}
                          >
                            <button
                              onClick={() => {
                                const currentQuantity = cart.find(
                                  (item) => item._id === currentProduct?._id
                                )?.quantity;

                                if (currentQuantity > 1) {
                                  dispatch(
                                    updateQuantity({
                                      id: currentProduct?._id,
                                      quantity: -1,
                                    })
                                  );
                                } else {
                                  setIsInCart(false);
                                  dispatch(
                                    updateQuantity({
                                      id: currentProduct?._id,
                                      quantity: -1,
                                    })
                                  );
                                }
                              }}
                              className="px-3 py-2"
                            >
                              -
                            </button>
                            <button className="w-full py-2">
                              {
                                cart.find(
                                  (item) => item._id === currentProduct?._id
                                )?.quantity
                              }
                            </button>
                            <button
                              onClick={() => {
                                dispatch(
                                  updateQuantity({
                                    id: currentProduct?._id,
                                    quantity: 1,
                                  })
                                );
                              }}
                              className=""
                            >
                              <span className="bg-[#dbb51f] rounded-full w-2 h-2 px-3 py-2 mr-1 shadow-inner">
                                +
                              </span>
                            </button>
                          </motion.div>
                        ) : (
                          <motion.button
                            key="addToCart"
                            onClick={() => {
                              dispatch(addToCart(currentProduct));
                              setIsInCart(true);
                            }}
                            className="bg-[#FFCD00] px-3 py-2 rounded-full w-full md:w-2/4 transition-all duration-500"
                            initial={{ width: "60%" }}
                            animate={{ width: "60%" }}
                            exit={{ width: "60%" }}
                            transition={{ duration: 0.7 }}
                          >
                            <motion.span
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.9, delay: 0.1 }}
                            >
                              Add to Cart
                            </motion.span>
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  </td>
                  {similarProducts.map((product, index) => (
                    <td key={index} className="border px-5">
                      <div className="mt-5 w-full text-md">
                        <AnimatePresence mode="wait">
                          {cart.find((item) => item._id === product?._id) ? (
                            <motion.div
                              key="inCart"
                              className="bg-[#FFCD00] rounded-full w-full flex justify-between items-center font-semibold"
                              initial={{ width: "50%" }}
                              animate={{ width: "100%" }}
                              exit={{ width: "50%" }}
                              transition={{ duration: 0.7 }}
                            >
                              <button
                                onClick={() => {
                                  const currentQuantity = cart.find(
                                    (item) => item._id === product?._id
                                  )?.quantity;

                                  if (currentQuantity > 1) {
                                    dispatch(
                                      updateQuantity({
                                        id: product?._id,
                                        quantity: -1,
                                      })
                                    );
                                  } else {
                                    dispatch(removeFromCart(product?._id));
                                  }
                                }}
                                className="px-3 py-2"
                              >
                                -
                              </button>
                              <button className="w-full py-2">
                                {
                                  cart.find((item) => item._id === product?._id)
                                    ?.quantity
                                }
                              </button>
                              <button
                                onClick={() => {
                                  dispatch(
                                    updateQuantity({
                                      id: product?._id,
                                      quantity: 1,
                                    })
                                  );
                                }}
                                className=""
                              >
                                <span className="bg-[#dbb51f] rounded-full w-2 h-2 px-3 py-2 mr-1 shadow-inner">
                                  +
                                </span>
                              </button>
                            </motion.div>
                          ) : (
                            <motion.button
                              key="addToCart"
                              onClick={() => {
                                dispatch(addToCart(product));
                              }}
                              className="bg-[#FFCD00] px-3 py-2 rounded-full w-full md:w-2/4 transition-all duration-500"
                              initial={{ width: "50%" }}
                              animate={{ width: "50%" }}
                              exit={{ width: "50%" }}
                              transition={{ duration: 0.7 }}
                            >
                              <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.1 }}
                              >
                                Add to Cart
                              </motion.span>
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
