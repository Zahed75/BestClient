import { fetchApi } from "@/utils/FetchApi";
import ChildrenCat from "./ChildrenCat";

export async function generateMetadata({ params, searchParams }) {
  const { slug } = params;
  const res = await fetchApi(`/category/categories/${slug}`, "GET");
  const category = await res?.category;
  return {
    title: category?.categoryName,
    description: category?.categoryDescription,
    openGraph: {
      title: category?.categoryName,
      description: category?.categoryDescription,
      type: "website",
      locale: "en_BD",
      url: `${process.env.SITE_URL}/categories/${slug}`,
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
  const { slug } = params;
  const res = await fetchApi(`/category/categories/${slug}`, "GET");
  const category = await res?.category;

  return (
    <>
      <ChildrenCat category={category} path={slug} />
    </>
  );
}
