"use client";
import Image from "next/image";
import bestLogo from "@/public/images/Best-Electronics.png";
import userIcon from "@/public/images/userIcon.svg";
import cartIcon from "@/public/images/cartIcon.svg";
import CloseIcon from "@mui/icons-material/Close";
import EmptyCart from "@/public/images/emptyCart.png";
import Link from "next/link";
import { Box, Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "@/redux/slice/cartSlice";
import { useRouter } from "next/navigation";
import { fetchProducts } from "@/redux/slice/productsSlice";

export default function Search() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const cart = useSelector((state) => state.cart.items) || [];
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const router = useRouter();

  const deliveryCharge = 100;
  const vatPercentage = 5; // 5%

  const totalProductPrice = Array.isArray(cart)
    ? cart.reduce(
      (acc, item) => acc + item.general.salePrice * item.quantity,
      0
    )
    : 0;

  const vat = (totalProductPrice * vatPercentage) / 100;
  const totalPrice = totalProductPrice + deliveryCharge + vat;

  const total = totalProductPrice > 0 ? totalProductPrice : 0;

  const allProducts = products?.products || [];

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleGoToCheckout = () => {
    setOpen(false);
    router.push("/checkout");
  };

  const handleGoToCart = () => {
    setOpen(false);
    router.push("/cart");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = allProducts.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (productSlug) => {
    router.push(`/shop/${productSlug}`);
    setSearchTerm("");
  };

  return (
    <main className="container">
      <div className="grid grid-cols-4 justify-center items-center gap-5 my-5">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="object-cover">
            <Image
              src={bestLogo}
              className="lg:w-11/12"
              alt="Best Electronics Icon"
            />
          </Link>
        </div>

        <div className="w-full mx-auto col-span-2 hidden md:block relative">
          <div className="relative flex items-center w-full h-14 rounded-lg bg-[#F3F4F7] overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-[#F3F4F7]"
              type="text"
              id="search"
              name="search"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {searchTerm && (
            <div className="absolute z-10 bg-white shadow-md rounded-lg w-full max-h-40 overflow-y-auto scrollbar_hidden">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="p-3 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleProductClick(product?.productSlug)}
                  >
                    {product.productName}
                  </div>
                ))
              ) : (
                <div className="p-3 text-center">No products found</div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end items-center gap-5 col-span-2 md:col-span-1">
          <div className="w-[42px] h-[42px] rounded-full border hover:border-[#FFF1EE] p-2 hover:bg-[#FFF1EE] duration-700 hidden md:block">
            <Link href="/userfeed">
              <Image
                src={userIcon}
                alt="User Icon"
                className="flex justify-center mx-auto w-full h-full ml-[2px]"
              />
            </Link>
          </div>
          <div className="text-md font-bold ">৳ {total}</div>
          <div className="w-[42px] h-[42px] rounded-full border border-[#FFF1EE] bg-[#FFF1EE] p-2 relative ">
            <button
              className="flex justify-center mx-auto w-full h-full"
              onClick={toggleDrawer(true)}
            >
              <Image
                src={cartIcon}
                alt="User Icon"
                className="flex justify-center mx-auto w-full h-full"
              />
            </button>
            <div>
              <span className="absolute top-0 -right-2 bg-[#F16521] text-white rounded-full text-xs px-1">
                {cart?.length}
              </span>
            </div>
          </div>
        </div>

        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          <Box role="presentation" className="w-[350px] md:w-[400px]">
            <div className="flex justify-between items-center border-b-2 p-3">
              <h3 className="text-xl">Shopping Cart</h3>
              <button className="inline-block" onClick={toggleDrawer(false)}>
                <CloseIcon />
              </button>
            </div>
            {cart.length > 0 ? (
              cart.map((product, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 justify-between items-center gap-3 p-3 hover:bg-slate-50 duration-700 border-b-2"
                >
                  <div>
                    <Image
                      className="w-20 h-20"
                      src={product?.productImage}
                      alt={product?.productName}
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="col-span-3 flex justify-between items-center">
                    <div>
                      <h3 className="text-md">{product?.productName}</h3>
                      <div>
                        <p className="text-slate-500">
                          ৳ {product?.general?.salePrice}
                        </p>
                        <p className="ml-2 text-slate-500">
                          {" "}
                          X {product?.quantity}
                        </p>
                      </div>
                    </div>
                    <button className="flex justify-center bg-[#F16521] w-5 h-5 rounded-full p-1">
                      <CloseIcon
                        className="text-white pb-1"
                        style={{ fontSize: 17 }}
                        onClick={() => dispatch(removeFromCart(product?._id))}
                      />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col justify-center items-center mt-10">
                <Image className="w-40 h-40" src={EmptyCart} alt="Empty Cart" />
                <p>No products in the cart</p>
              </div>
            )}

            <div className="p-3 my-3">
              {cart?.length > 0 ? (
                <div className="flex justify-between items-center">
                  <h3 className="text-slate-500">
                    Subtotal ({cart.length} items):
                  </h3>
                  <h3 className="text-md font-semibold">
                    ৳
                    {cart
                      .map((item) => item?.general?.salePrice * item?.quantity)
                      .reduce((a, b) => a + b, 0)}
                  </h3>
                </div>
              ) : (
                <div>
                  <p>No Product In Cart</p>
                </div>
              )}

              <div className="flex flex-col justify-between items-center">
                <button
                  onClick={handleGoToCart}
                  className="border py-3 rounded-md w-full my-3"
                >
                  View Cart
                </button>
                <button
                  onClick={handleGoToCheckout}
                  className="text-white bg-[#F16521] py-3 rounded-md w-full"
                >
                  Checkout
                </button>
              </div>
            </div>
          </Box>
        </Drawer>
      </div>
    </main>
  );
}
