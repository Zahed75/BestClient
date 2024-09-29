"use client";
import arrayBottom from "@/public/images/arrayBottom.svg";
import arrayBottomBlack from "@/public/images/arrayBottomBlack.svg";
import treeDot from "@/public/images/treeDot.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchApi } from "@/utils/FetchApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/slice/productsSlice";
import { fetchBrands } from "@/redux/slice/brandSlice";

export default function NavigationBar() {
  const [isBrowseProducts, setIsBrowseProducts] = useState(false);
  const [isElectronicsSubMenuOpen, setIsElectronicsSubMenuOpen] =
    useState(false);
  const [isSmartSubMenuOpen, setIsSmartSubMenuOpen] = useState(false);
  const [isOrderMenuOpen, setIsOrderMenuOpen] = useState(false);
  const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false);
  const [isAllProductCategoriesOpen, setIsAllProductCategoriesOpen] =
    useState(false);
  const [category, setCategory] = useState([]);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [hoveredSubCategoryId, setHoveredSubCategoryId] = useState(null);
  const [hoveredAlProductCategoryId, setHoveredAlProductCategoryId] =
    useState(null);
  const [hoveredSubProductCategoryId, setHoveredSubProductCategoryId] =
    useState(null);
  const [isBrandsMenuOpen, setIsBrandsMenuOpen] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const productsLength = products?.products?.length;
  const brandsState = useSelector((state) => state.brand);
  const brands = brandsState?.brands || [];

  const pathName = usePathname();

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleBrowseProducts = () => {
    setIsBrowseProducts(!isBrowseProducts);
  };
  const handleGotoCategories = () => {
    router.push("/shop");
  };

  const allowedSlugs = [
    "tv-entertainment",
    "fan",
    "home-appliances",
    "kitchen-appliances",
    "small-appliances",
    "electrical-power",
  ];

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await fetchApi(`/category/getAllCat`, "GET");
        const filteredCategories = data?.categories?.filter((category) =>
          allowedSlugs.includes(category?.slug)
        );
        setCategory(filteredCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategory();
  }, []);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const CategoryItem = ({
    category,
    setHoveredCategoryId,
    hoveredCategoryId,
    setHoveredSubCategoryId,
  }) => {
    const hasSubCategories =
      category.subCategories && category.subCategories.length > 0;

    return (
      <li
        key={category._id}
        className="relative"
        onMouseEnter={() => setHoveredCategoryId(category._id)}
        onMouseLeave={() => setHoveredCategoryId(null)}
      >
        <Link
          href={category.slug}
          className="flex items-center justify-between py-2 px-3 hover:text-[#F16521] cursor-pointer"
        >
          <span>{category.categoryName}</span>

          {hasSubCategories && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 transition-transform duration-300 transform ${
                hoveredCategoryId === category._id ? "rotate-90" : "-rotate-90"
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.293 7.707a1 1 0 0 1 1.414 0L10 10.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
              />
            </svg>
          )}
        </Link>

        {hoveredCategoryId === category._id && hasSubCategories && (
          <ul className="absolute left-full top-0 mt-0 py-5 w-auto min-w-52 bg-white rounded-lg border border-gray-200 shadow-xl">
            {category.subCategories.map((subCategory) => (
              <CategoryItem
                key={subCategory._id}
                category={subCategory}
                setHoveredCategoryId={setHoveredCategoryId}
                hoveredCategoryId={hoveredCategoryId}
                setHoveredSubCategoryId={setHoveredSubCategoryId}
              />
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav className="container">
      <div className="hidden sm:hidden md:hidden lg:flex justify-stretch items-center">
        <div className="relative z-20">
          <button
            onMouseEnter={() => setIsAllCategoriesOpen(true)}
            onMouseLeave={() => setIsAllCategoriesOpen(false)}
            className="group bg-[#F16521] text-sm px-5 py-4 uppercase text-white rounded-full flex justify-start items-center relative"
          >
            <Image src={treeDot} className="w-4 h-4 " alt="Tree Dot" />
            <span className="font-dosis mx-3 text-[13px]">All Categories</span>
            <Image src={arrayBottom} className="w-4 h-4 " alt="Array Bottom" />
            <span className="font-dosis bg-gray-100 text-[#71778E] text-[10px] text-nowrap px-1 border border-white rounded-xl absolute -bottom-[10px] left-[22%] mx-auto z-20">
              TOTAL {productsLength} PRODUCTS
            </span>
          </button>
          <div
            onMouseEnter={() => setIsAllCategoriesOpen(true)}
            onMouseLeave={() => setIsAllCategoriesOpen(false)}
            className={`${
              isAllCategoriesOpen ? "block" : "hidden"
            } group-hover:block absolute left-0 w-60 bg-white rounded-lg border border-gray-200 shadow-xl z-10`}
          >
            <ul className="text-sm py-5 text-[#3E445A]">
              {category
                .filter((categories) => !categories.subCategories?.categoryName)
                .map((categories) => (
                  <li
                    key={categories?._id}
                    className="py-2 px-3 relative"
                    onMouseEnter={() => setHoveredCategoryId(categories?._id)}
                    onMouseLeave={() => setHoveredCategoryId(null)}
                  >
                    <Link
                      href={`/${categories?.slug}`}
                      className="flex items-center justify-between w-full hover:text-[#F16521] cursor-pointer"
                    >
                      <span>{categories?.categoryName}</span>

                      {categories?.subCategories &&
                        categories?.subCategories.length > 0 && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 transition-transform duration-300 transform ${
                              hoveredCategoryId === categories._id
                                ? "rotate-[90]"
                                : "-rotate-90"
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.293 7.707a1 1 0 0 1 1.414 0L10 10.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                            />
                          </svg>
                        )}
                    </Link>

                    {hoveredCategoryId === categories._id &&
                      categories?.subCategories &&
                      categories?.subCategories.length > 0 && (
                        <ul className="absolute left-full top-0 mt-0 py-5 w-auto min-w-52 bg-white rounded-lg border border-gray-200 shadow-xl">
                          {categories.subCategories.map((category) => (
                            <li
                              onMouseEnter={() =>
                                setHoveredSubCategoryId(category._id)
                              }
                              onMouseLeave={() => setHoveredSubCategoryId(null)}
                              className="py-2 px-3 cursor-pointer relative"
                              key={category?._id}
                            >
                              <div className="flex items-center justify-between w-full hover:text-[#F16521] cursor-pointer">
                                <Link
                                  href={`/${categories?.slug}/${category?.slug}`}
                                  className="flex items-center justify-between w-full hover:text-[#F16521] cursor-pointer"
                                >
                                  <span>{category?.categoryName}</span>

                                  {category?.subCategories &&
                                    category?.subCategories.length > 0 && (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-4 w-4 transition-transform duration-300 transform ${
                                          hoveredSubCategoryId === category._id
                                            ? "rotate-[90]"
                                            : "-rotate-90"
                                        }`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M6.293 7.707a1 1 0 0 1 1.414 0L10 10.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                                        />
                                      </svg>
                                    )}
                                </Link>
                              </div>

                              {hoveredSubCategoryId === category._id &&
                                category.subCategories &&
                                category.subCategories.length > 0 && (
                                  <ul
                                    onMouseEnter={() =>
                                      setHoveredSubCategoryId(category._id)
                                    }
                                    onMouseLeave={() =>
                                      setHoveredSubCategoryId(null)
                                    }
                                    className="absolute left-full top-0 px-3 py-5 w-auto min-w-52 bg-white rounded-lg border border-gray-200 shadow-xl"
                                  >
                                    {category.subCategories.map(
                                      (subCategory) => (
                                        <li
                                          key={subCategory?._id}
                                          className="py-2 hover:text-[#F16521] cursor-pointer"
                                        >
                                          <Link
                                            href={`/${categories?.slug}/${category?.slug}/${subCategory?.slug}`}
                                            className="flex items-center justify-between w-full hover:text-[#F16521] cursor-pointer"
                                          >
                                            {subCategory?.categoryName}
                                          </Link>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                )}
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}

              <li className="py-2 px-3 hover:text-[#F16521] border-t cursor-pointer">
                Offers
              </li>
              <li className="py-2 px-3 hover:text-[#F16521] cursor-pointer">
                New Arrivals
              </li>
              <li
                className="py-2 px-3 hover:text-[#F16521] border-t cursor-pointer relative"
                onMouseEnter={() => setIsBrandsMenuOpen(true)}
                onMouseLeave={() => setIsBrandsMenuOpen(false)}
              >
                <div className="flex items-center justify-between w-full">
                  <span>Brands</span>
                  {brands.length > 0 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transition-transform duration-300 transform ${
                        isBrandsMenuOpen ? "rotate-[90]" : "-rotate-90"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.293 7.707a1 1 0 0 1 1.414 0L10 10.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                      />
                    </svg>
                  )}
                </div>

                {isBrandsMenuOpen && brands.length > 0 && (
                  <ul className="absolute left-full top-[-310px] mt-0 py-5 w-auto min-w-52 bg-white text-black rounded-lg border border-gray-200 shadow-xl">
                    {brands.map((brand) => (
                      <li
                        key={brand._id}
                        className="py-2 px-3 hover:text-[#F16521] cursor-pointer"
                      >
                        <Link href={`/brand/${brand?.name?.toLowerCase()}`}>
                          {brand?.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>

            {/* <ul className="text-sm py-5">
              {category.map((category) => (
                 <CategoryItem
                 key={category._id}
                 category={category}
                 setHoveredCategoryId={setHoveredCategoryId}
                 hoveredCategoryId={hoveredCategoryId}
                 setHoveredSubCategoryId={setHoveredSubCategoryId}
               />
              ))}

              <li className="py-2 px-3 hover:text-[#F16521] border-t cursor-pointer">
                Offers
              </li>
              <li className="py-2 px-3 hover:text-[#F16521] cursor-pointer">
                New Arrivals
              </li>
              <li className="py-2 px-3 hover:text-[#F16521] border-t cursor-pointer">
                Orders
              </li>
            </ul> */}
          </div>
        </div>

        <div className="flex ml-auto">
          <div className="flex justify-end items-center uppercase text-sm gap-x-1">
            <span
              className={`font-dosis px-3 py-2 text-[#3E445A] hover:bg-[#F0FAFF] hover:text-[#F16521] rounded-full cursor-pointer ${
                pathName === "/" ? "bg-[#F0FAFF] text-[#F16521]" : ""
              } duration-700`}
            >
              <Link href="/">Home</Link>
            </span>
            <div
              className="group relative  
            z-20"
            >
              <button
                onClick={handleGotoCategories}
                onMouseEnter={handleBrowseProducts}
                onMouseLeave={handleBrowseProducts}
                className="flex justify-start items-center font-dosis text-[#3E445A] group-hover:bg-[#F0FAFF] group-hover:text-[#F16521] px-3 py-2 rounded-full cursor-pointer duration-700 uppercase"
              >
                Browse Products
                <Image
                  src={arrayBottomBlack}
                  className="w-4 h-4 ml-2 -rotate-90 group-hover:rotate-1 duration-700"
                  alt="Array Bottom"
                />
              </button>

              <div
                onMouseEnter={() => setIsAllProductCategoriesOpen(true)}
                onMouseLeave={() => setIsAllProductCategoriesOpen(false)}
                className={`${
                  isAllProductCategoriesOpen ? "block" : "hidden"
                } group-hover:block absolute left-0 w-60 bg-white rounded-lg border border-gray-200 shadow-xl z-10 capitalize`}
              >
                <ul className="text-sm py-5 text-[#3E445A]">
                  {category
                    .filter(
                      (categories) => !categories.subCategories?.categoryName
                    )
                    .map((categories) => (
                      <li
                        key={categories?._id}
                        className="py-2 px-3 relative"
                        onMouseEnter={() =>
                          setHoveredAlProductCategoryId(categories?._id)
                        }
                        onMouseLeave={() => setHoveredAlProductCategoryId(null)}
                      >
                        <Link
                          href={`/${categories?.slug}`}
                          className="flex items-center justify-between w-full hover:text-[#F16521] cursor-pointer"
                        >
                          <span>{categories?.categoryName}</span>

                          {categories?.subCategories &&
                            categories?.subCategories.length > 0 && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 transition-transform duration-300 transform ${
                                  hoveredAlProductCategoryId === categories._id
                                    ? "rotate-[90]"
                                    : "-rotate-90"
                                }`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6.293 7.707a1 1 0 0 1 1.414 0L10 10.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                                />
                              </svg>
                            )}
                        </Link>

                        {hoveredAlProductCategoryId === categories._id &&
                          categories?.subCategories &&
                          categories?.subCategories.length > 0 && (
                            <ul className="absolute left-full top-0 mt-0 py-5 w-auto min-w-52 bg-white rounded-lg border border-gray-200 shadow-xl">
                              {categories.subCategories.map((category) => (
                                <li
                                  onMouseEnter={() =>
                                    setHoveredSubProductCategoryId(
                                      category?._id
                                    )
                                  }
                                  onMouseLeave={() =>
                                    setHoveredSubProductCategoryId(null)
                                  }
                                  className="py-2 px-3 cursor-pointer relative"
                                  key={category?._id}
                                >
                                  <div className="flex items-center justify-between w-full hover:text-[#F16521] cursor-pointer">
                                    <Link
                                      href={`/${categories?.slug}/${category?.slug}`}
                                      className="flex items-center justify-between w-full hover:text-[#F16521] cursor-pointer"
                                    >
                                      <span>{category?.categoryName}</span>

                                      {category?.subCategories &&
                                        category?.subCategories.length > 0 && (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-4 w-4 transition-transform duration-300 transform ${
                                              hoveredSubProductCategoryId ===
                                              category._id
                                                ? "rotate-[90]"
                                                : "-rotate-90"
                                            }`}
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M6.293 7.707a1 1 0 0 1 1.414 0L10 10.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                                            />
                                          </svg>
                                        )}
                                    </Link>
                                  </div>

                                  {hoveredSubProductCategoryId ===
                                    category._id &&
                                    category.subCategories &&
                                    category.subCategories.length > 0 && (
                                      <ul
                                        onMouseEnter={() =>
                                          setHoveredSubProductCategoryId(
                                            category._id
                                          )
                                        }
                                        onMouseLeave={() =>
                                          setHoveredSubProductCategoryId(null)
                                        }
                                        className="absolute left-full top-0 px-3 py-5 w-auto min-w-52 bg-white rounded-lg border border-gray-200 shadow-xl"
                                      >
                                        {category.subCategories.map(
                                          (subCategory) => (
                                            <li
                                              key={subCategory?._id}
                                              className="py-2 hover:text-[#F16521] cursor-pointer"
                                            >
                                              <Link
                                                href={`/${categories?.slug}/${category?.slug}/${subCategory?.slug}`}
                                                className="flex items-center justify-between w-full hover:text-[#F16521] cursor-pointer"
                                              >
                                                {subCategory?.categoryName}
                                              </Link>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    )}
                                </li>
                              ))}
                            </ul>
                          )}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <span
              className={`font-dosis text-[#3E445A] hover:bg-[#F0FAFF] hover:text-[#F16521] px-3 py-2 rounded-full cursor-pointer ${
                pathName === "/shop" ? "bg-[#F0FAFF] text-[#F16521]" : ""
              } duration-700`}
            >
              <Link href="/shop">All Products</Link>
            </span>
            <span className="font-dosis text-[#3E445A] hover:bg-[#F0FAFF] hover:text-[#F16521] px-3 py-2 rounded-full cursor-pointer duration-700">
              <Link href="https://www.bestelectronics.com.bd/emi-facility">
                Quick emi
              </Link>
            </span>
            <span className="font-dosis text-[#3E445A] hover:bg-[#F0FAFF] hover:text-[#F16521] px-3 py-2 rounded-full cursor-pointer duration-700">
              <Link href="https://www.bestelectronics.com.bd/super-kisti">
                super kisti
              </Link>
            </span>
            <div className="group relative">
              <button
                onMouseEnter={() => setIsOrderMenuOpen(true)}
                onMouseLeave={() => setIsOrderMenuOpen(false)}
                className={`flex justify-start items-center font-dosis text-[#3E445A] group-hover:bg-[#F0FAFF] group-hover:text-[#F16521] px-3 py-2 rounded-full cursor-pointer ${
                  pathName === "/my-account" ||
                  pathName === "/my-account/orders" ||
                  pathName === "/my-account/wishlist"
                    ? "bg-[#F0FAFF] text-[#F16521]"
                    : ""
                } duration-700 uppercase`}
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
                className={`${
                  isOrderMenuOpen ? "block" : "hidden"
                } group-hover:block absolute left-0 w-64 bg-white rounded-lg border border-gray-200 shadow-xl z-10`}
              >
                <ul className="text-sm capitalize text-[#3E445A]">
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
            <span className="font-dosis text-[#3E445A] hover:bg-[#F0FAFF] hover:text-[#F16521] px-3 py-2 rounded-full cursor-pointer duration-700">
              <Link href="https://www.bestelectronics.com.bd/contact-us">
                contact us
              </Link>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
