"use client";
import arrayBottom from "@/public/images/arrayBottom.svg";
import arrayBottomBlack from "@/public/images/arrayBottomBlack.svg";
import treeDot from "@/public/images/treeDot.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchApi } from "@/utils/FetchApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/slice/productsSlice";

export default function NavigationBar() {
  const [isBrowseProducts, setIsBrowseProducts] = useState(false);
  const [isElectronicsSubMenuOpen, setIsElectronicsSubMenuOpen] =
    useState(false);
  const [isSmartSubMenuOpen, setIsSmartSubMenuOpen] = useState(false);
  const [isOrderMenuOpen, setIsOrderMenuOpen] = useState(false);
  const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false);
  const [category, setCategory] = useState([]);

  const router = useRouter();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const productsLength = products?.products?.length;

  const handleBrowseProducts = () => {
    setIsBrowseProducts(!isBrowseProducts);
  };
  const handleGotoCategories = () => {
    router.push("/shop");
  };

  const browseMenusItems = [
    {
      title: "Electronics",
      link: "/",
      subMenu: [
        {
          title: "Laptops",
          link: "/",
        },
        {
          title: "Smartphones",
          link: "/",
          subMenu: [
            {
              title: "Samsung",
              link: "/",
            },
            {
              title: "Apple",
              link: "/",
            },
            {
              title: "Xiaomi",
              link: "/",
            },
          ],
        },
        {
          title: "Cameras",
          link: "/",
        },
      ],
    },
  ];

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        // const data = await fetchApi(`/category/categories-name`, "GET");
        const data = await fetchApi(`/category/getAllCat`, "GET");
        setCategory(data?.categories); // Adjust according to API response structure
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategory();
  }, []);
  useEffect(() => {

      dispatch(fetchProducts());

  }, [dispatch]);



  

  return (
    <nav className="container">
      <div className="hidden sm:hidden md:hidden lg:flex justify-stretch items-center font-dosis">
        <div className="relative">
          <button
            onMouseEnter={() => setIsAllCategoriesOpen(true)}
            onMouseLeave={() => setIsAllCategoriesOpen(false)}
            className="group bg-[#F16521] text-sm px-5 py-4 uppercase text-white rounded-full flex justify-start items-center relative"
          >
            <Image src={treeDot} className="w-4 h-4 " alt="Tree Dot" />
            <span className="mx-3 text-[13px]">All Categories</span>
            <Image src={arrayBottom} className="w-4 h-4 " alt="Array Bottom" />
            <span className="bg-gray-100 text-[#71778E] text-[10px] text-nowrap px-1 border border-white rounded-xl absolute -bottom-[10px] left-[22%] mx-auto z-20">
              TOTAL {productsLength} PRODUCTS
            </span>
          </button>
          <div
            onMouseEnter={() => setIsAllCategoriesOpen(true)}
            onMouseLeave={() => setIsAllCategoriesOpen(false)}
            className={`${isAllCategoriesOpen ? "block" : "hidden"
              } group-hover:block absolute left-0 w-60 bg-white rounded-lg border border-gray-200 shadow-xl z-10`}
          >
            <ul className="text-sm">
              {category
                // .filter((categories) => categories?.parentCategory === "").map((categories) => (
                .filter((categories) => !categories.subCategories?.categoryName).map((categories) => (
                  <li key={categories.id} className="py-2 px-3 relative"
                    onMouseEnter={() => setIsElectronicsSubMenuOpen(true)}
                    onMouseLeave={() => setIsElectronicsSubMenuOpen(false)}>
                    <div className="flex items-center justify-between w-full hover:text-[#F16521] cursor-pointer">
                      <span>{/* Home Appliance & Furniture */}
                        {categories.categoryName}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transition-transform duration-300 transform ${isElectronicsSubMenuOpen ? "-rotate-90" : "-rotate-90"
                          }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 7.707a1 1 0 0 1 1.414 0L10 10.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                        />
                      </svg>
                    </div>


                  </li>
                ))}
              <li
                className="py-2 px-3 hover:text-[#F16521] border-t cursor-pointer"

              > Offers
                {/* {isElectronicsSubMenuOpen && (
                  <ul className="absolute left-full top-0 mt-0 w-auto min-w-48 bg-white rounded-lg border border-gray-200 shadow-xl">
                    <li className="py-2 px-3 hover:text-[#F16521] cursor-pointer">
                      Laptops
                    </li>
                    <li
                      onMouseEnter={() => setIsSmartSubMenuOpen(true)}
                      onMouseLeave={() => setIsSmartSubMenuOpen(false)}
                      className="py-2 px-3 cursor-pointer relative"
                    >
                      <div className="flex items-center justify-between w-full hover:text-[#F16521] cursor-pointer">
                        <span>Smartphone</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 transition-transform duration-300 transform ${isSmartSubMenuOpen ? "-rotate-90" : "rotate-0"
                            }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.293 7.707a1 1 0 0 1 1.414 0L10 10.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                          />
                        </svg>
                      </div>

                      {isSmartSubMenuOpen && (
                        <ul
                          onMouseEnter={() => setIsSmartSubMenuOpen(true)}
                          onMouseLeave={() => setIsSmartSubMenuOpen(false)}
                          className="absolute left-full top-0 p-3 w-auto min-w-48 bg-white rounded-lg border border-gray-200 shadow-xl"
                        >
                          <li className="py-2 hover:text-[#F16521] cursor-pointer">
                            I Phone
                          </li>
                          <li className="py-2 hover:text-[#F16521] cursor-pointer">
                            Samsung
                          </li>
                          <li className="py-2 hover:text-[#F16521] cursor-pointer">
                            Xiaomi
                          </li>
                        </ul>
                      )}
                    </li>
                    <li className="py-2 px-3 hover:text-[#F16521] cursor-pointer">
                      Cameras
                    </li>
                  </ul>
                )} */}
              </li>
              <li className="py-2 px-3 hover:text-[#F16521] cursor-pointer">
                New Arrivals
              </li>
              <li className="py-2 px-3 hover:text-[#F16521] border-t cursor-pointer">
                Orders
              </li>

            </ul>
          </div>
        </div>

        <div className="flex ml-auto">
          <div className="flex justify-end items-center uppercase text-sm gap-x-1">
            <span className="bg-[#F0FAFF] text-[#F16521] px-3 py-2 rounded-full cursor-pointer">
              <Link href="/">Home</Link>
            </span>
            <div className="group relative">
              <button
                onClick={handleGotoCategories}
                onMouseEnter={handleBrowseProducts}
                onMouseLeave={handleBrowseProducts}
                className="flex justify-start items-center group-hover:bg-[#F0FAFF] group-hover:text-[#F16521] px-3 py-2 rounded-full cursor-pointer duration-700 uppercase"
              >
                Browse Products
                <Image
                  src={arrayBottomBlack}
                  className="w-4 h-4 ml-2 -rotate-90 group-hover:rotate-1 duration-700"
                  alt="Array Bottom"
                />
              </button>
              <div
                onMouseEnter={() => setIsBrowseProducts(true)}
                onMouseLeave={() => setIsBrowseProducts(false)}
                className={`${isBrowseProducts ? "block" : "hidden"
                  } group-hover:block absolute left-0 w-64 bg-white rounded-lg border border-gray-200 shadow-xl z-10`}
              >
                <ul className="text-sm">
                  <li className="py-2 px-3 hover:text-[#F16521] cursor-pointer">
                    Home Appliance & Furniture
                  </li>
                  <li
                    className="py-2 px-3 relative"
                    onMouseEnter={() => setIsElectronicsSubMenuOpen(true)}
                    onMouseLeave={() => setIsElectronicsSubMenuOpen(false)}
                  >
                    <div className="flex items-center justify-between w-full hover:text-[#F16521] cursor-pointer">
                      <span>Electronics</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transition-transform duration-300 transform ${isElectronicsSubMenuOpen ? "-rotate-90" : "rotate-0"
                          }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 7.707a1 1 0 0 1 1.414 0L10 10.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                        />
                      </svg>
                    </div>

                    {isElectronicsSubMenuOpen && (
                      <ul className="absolute left-full top-0 mt-0 w-auto min-w-48 bg-white rounded-lg border border-gray-200 shadow-xl">
                        <li className="py-2 px-3 hover:text-[#F16521] cursor-pointer">
                          Laptops
                        </li>
                        <li
                          onMouseEnter={() => setIsSmartSubMenuOpen(true)}
                          onMouseLeave={() => setIsSmartSubMenuOpen(false)}
                          className="py-2 px-3 cursor-pointer relative"
                        >
                          <div className="flex items-center justify-between w-full hover:text-[#F16521] cursor-pointer">
                            <span>Smartphone</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-4 w-4 transition-transform duration-300 transform ${isSmartSubMenuOpen ? "-rotate-90" : "rotate-0"
                                }`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6.293 7.707a1 1 0 0 1 1.414 0L10 10.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                              />
                            </svg>
                          </div>

                          {isSmartSubMenuOpen && (
                            <ul
                              onMouseEnter={() => setIsSmartSubMenuOpen(true)}
                              onMouseLeave={() => setIsSmartSubMenuOpen(false)}
                              className="absolute left-full top-0 p-3 w-auto min-w-48 bg-white rounded-lg border border-gray-200 shadow-xl"
                            >
                              <li className="py-2 hover:text-[#F16521] cursor-pointer">
                                I Phone
                              </li>
                              <li className="py-2 hover:text-[#F16521] cursor-pointer">
                                Samsung
                              </li>
                              <li className="py-2 hover:text-[#F16521] cursor-pointer">
                                Xiaomi
                              </li>
                            </ul>
                          )}
                        </li>
                        <li className="py-2 px-3 hover:text-[#F16521] cursor-pointer">
                          Cameras
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className="py-2 px-3 hover:text-[#F16521] cursor-pointer">
                    Mobile & Accessories
                  </li>
                </ul>
              </div>
            </div>
            <span className="hover:bg-[#F0FAFF] hover:text-[#F16521] px-3 py-2 rounded-full cursor-pointer duration-700">
              <Link href="/shop">All Products</Link>
            </span>
            <span className="hover:bg-[#F0FAFF] hover:text-[#F16521] px-3 py-2 rounded-full cursor-pointer duration-700">
              <Link href="https://www.bestelectronics.com.bd/emi-facility">Quick emi</Link>
            </span>
            <span className="hover:bg-[#F0FAFF] hover:text-[#F16521] px-3 py-2 rounded-full cursor-pointer duration-700">
              <Link href="https://www.bestelectronics.com.bd/super-kisti">super kisti</Link>
            </span>
            <div className="group relative">
              <button
                onMouseEnter={() => setIsOrderMenuOpen(true)}
                onMouseLeave={() => setIsOrderMenuOpen(false)}
                className="flex justify-start items-center group-hover:bg-[#F0FAFF] group-hover:text-[#F16521] px-3 py-2 rounded-full cursor-pointer duration-700 uppercase"
              >
                Your Order
                <Image
                  src={arrayBottomBlack}
                  className="w-4 h-4 ml-2 -rotate-90 group-hover:rotate-1 duration-700"
                  alt="Array Bottom"
                />
              </button>
              <div
                onMouseLeave={() => setIsOrderMenuOpen(false)}
                className={`${isOrderMenuOpen ? "block" : "hidden"
                  } group-hover:block absolute left-0 w-64 bg-white rounded-lg border border-gray-200 shadow-xl z-10`}
              >
                <ul className="text-sm capitalize">
                  <li className="py-2 px-3 hover:text-[#F16521] cursor-pointer">
                    <Link href={"/cart"}>Cart</Link>
                  </li>
                  <li className="py-2 px-3 hover:text-[#F16521] cursor-pointer">
                    <Link href={"/checkout"}>Checkout</Link>
                  </li>
                  <li className="py-2 px-3 hover:text-[#F16521] cursor-pointer">
                    <Link href={"/my-account/orders"}>My Orders</Link>
                  </li>
                  <li className="py-2 px-3 hover:text-[#F16521] cursor-pointer">
                    <Link href={"/my-account"}>My Account</Link>
                  </li>
                  <li className="py-2 px-3 hover:text-[#F16521] cursor-pointer">
                    <Link href={"/my-account/wishlist"}>Wishlist</Link>
                  </li>
                </ul>
              </div>
            </div>
            <span className="hover:bg-[#F0FAFF] hover:text-[#F16521] px-3 py-2 rounded-full cursor-pointer duration-700">
              <Link href="https://www.bestelectronics.com.bd/contact-us">contact us</Link>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
