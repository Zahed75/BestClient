import { fetchApi } from "@/utils/FetchApi";
import ChildrenCat from "./ChildrenCat";

export async function generateMetadata({ params, searchParams }) {
  const { child } = params;
  const res = await fetchApi(`/category/categories/${child}`, "GET");
  const category = await res?.category;
  return {
    title: category?.categoryName,
    description: category?.categoryDescription,
    openGraph: {
      title: category?.categoryName,
      description: category?.categoryDescription,
      type: "website",
      locale: "en_BD",
      url: `${process.env.SITE_URL}/shop/${child}`,
      metadataBase: `${process.env.SITE_URL}`,
      siteName: "Best Electronic",
      // images: [
      //   {
      //     url: category?.fetaureImage[0],
      //   },
      // ],
    },
  };
}

export default async function Page({ params }) {
  const { brand } = params;
  const res = await fetchApi(`/category/categories/${brand}`, "GET");
  const category = await res?.category;

  return (
    <>
      <ChildrenCat category={category} path={brand} />
    </>
  );
}
