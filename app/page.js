import ImageSlider from "@/components/global/ImageSlider";
import Categories from "@/components/home/Categories";
import RecentAdded from "@/components/home/RecentAdded";
import EventProduct from "@/components/productCard/EventProduct";

export default async function Home() {
  let events = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/event/products`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await response.json();
    events = data.productsAndEvents || []; // Default to an empty array if undefined
  } catch (error) {
    console.error("Error fetching events:", error);
  }

  // Sort events by eventCatId
  const sortedEvents = events.sort((a, b) => a.eventCatId - b.eventCatId);

  const eventCategories = sortedEvents.reduce(
    (acc, event) => {
      if (event.eventCatId === "0" || event.eventCatId === "1") {
        acc.before.push(event);
      } else {
        acc.after.push(event);
      }
      return acc;
    },
    { before: [], after: [] }
  );
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
