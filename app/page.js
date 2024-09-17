import ImageSlider from "@/components/global/ImageSlider";
import Categories from "@/components/home/Categories";
import RecentAdded from "@/components/home/RecentAdded";
import EventProduct from "@/components/productCard/EventProduct";
import { fetchApi } from "@/utils/FetchApi";

export default async function Home() {
  let events = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/grid/allProductGrids`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await response.json();
    events = data.grids  || []; 
  } catch (error) {
    console.error("Error fetching events:", error);
  }

  
  const sortedEvents = events.sort((a, b) => a.ordersBy - b.ordersBy);

  const eventCategories = sortedEvents.reduce(
    (acc, event) => {
      if (event.ordersBy === 0 || event.ordersBy === 1) {
        acc.before.push(event);
      } else {
        acc.after.push(event);
      }
      return acc;
    },
    { before: [], after: [] }
  );

  const categories = await fetchApi("/category/getAllCat", "GET");

  const productsByCategory = categories?.categories?.map((category) => {
    return {
      ...category,
      products: category.products,
    };
  });

  const publishedProductsArray = productsByCategory?.map((category) => {
    return category.products?.filter(
      (product) => product?.productStatus === "Published"
    );
  });

  const products = publishedProductsArray?.flat();

  return (
    <main>
      <ImageSlider />
      <div className="container">
        <div className="">
          {/* Render events with eventCatId 0 and 1 */}
          {eventCategories.before.map((event, index) => (
            <EventProduct key={index} event={event} />
          ))}

          <Categories />
          <RecentAdded />

          {/* Render the remaining events */}
          {eventCategories.after.map((event, index) => (
            <EventProduct key={index} event={event} />
          ))}
        </div>
      </div>
    </main>
  );
}
