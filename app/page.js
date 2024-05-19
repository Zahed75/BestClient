import ImageSlider from "@/components/global/ImageSlider";
import Categories from "@/components/home/Categories";
import RecentAdded from "@/components/home/RecentAdded";
import EventProduct from "@/components/productCard/EventProduct";

export default function Home() {
  return (
    <main>
      <ImageSlider />
      <div className="container">
        <div className="px-5 md:px-10 lg:px-16">
          <EventProduct event={"TOP SELLING AIRCONDITIONAR"} />
          <EventProduct event={"Our best sells in this month"} />
          <Categories />
          <RecentAdded />
          <EventProduct event={"TOP SELLING WASHERS"} />
        </div>
      </div>
    </main>
  );
}
