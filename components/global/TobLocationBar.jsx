import Image from "next/image";
import Link from "next/link";
import locationIcon from "@/public/images/locationIcon.svg";

export default function TopLocationBar() {
  const linkData = [
    { name: "My Account", url: "/" },
    { name: "Wishlist", url: "/" },
    { name: "Order Tracking", url: "/" },
    { name: "Cart", url: "/" },
  ];
  return (
    <section className="text-[#3E445A] text-sm px-5 md:px-44 py-3 hidden md:grid grid-cols-2 justify-stretch items-center border shadow-sm">
      <div>
        <ul className="flex justify-start items-center gap-5">
          {linkData.map((link, index) => (
            <li key={index}>
              <Link
                className="hover:text-[#F16521] duration-700"
                href={link.url}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end items-center gap-2 divide-x-2">
        <div className="flex justify-start items-center">
          <div className="flex justify-start items-center">
            <Image
              src={locationIcon}
              width={20}
              height={20}
              alt="location Icon"
              className="mr-2"
            />
            To Locate Store:{" "}
            <Link className="text-[#F16521]" href="/">
              <strong className="ml-1"> Click Here</strong>
            </Link>
          </div>
        </div>

        <div className=" pl-5">
          <div className="">
            Need Help? Call <strong>Drooto Helpline:</strong>{" "}
            <span className="text-[#F16521]">09606 111 777</span>
          </div>
        </div>
      </div>
    </section>
  );
}
