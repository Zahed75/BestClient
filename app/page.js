import ImageSlider from "@/components/global/ImageSlider";
import Categories from "@/components/home/Categories";
import RecentAdded from "@/components/home/RecentAdded";
import EventProduct from "@/components/productCard/EventProduct";

export default function Home() {
  return (
    <main>
      <ImageSlider />
      <EventProduct event={"TOP SELLING AIRCONDITIONAR"} />
      <EventProduct event={"Our best sells in this month"} />
      <Categories />
      <RecentAdded />
      <EventProduct event={"TOP SELLING WASHERS"} />
    </main>
  );
}
