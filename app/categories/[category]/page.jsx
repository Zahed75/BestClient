import { fetchApi } from "@/utils/FetchApi";
import ParentCat from "./Parentcat";

export async function generateMetadata({ params, searchParams }) {
  const { category } = params;
  const res = await fetchApi(`/category/categories/${category}`, "GET");
  const singleCategory = await res?.category;
  return {
    title: singleCategory?.categoryName,
    description: singleCategory?.categoryDescription,
    openGraph: {
      title: singleCategory?.categoryName,
      description: singleCategory?.categoryDescription,
      type: "website",
      locale: "en_BD",
      url: `${process.env.SITE_URL}/categories/${category}`,
      metadataBase: `${process.env.SITE_URL}`,
      siteName: "Best Electronic",
      images: [
        {
          url: category?.fetaureImage[0],
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const { category } = params;
  const res = await fetchApi(`/category/categories/${category}`, "GET");
  const singleCategory = await res?.category;

  return (
    <>
      <ParentCat category={singleCategory} path={category} />
    </>
  );
}
