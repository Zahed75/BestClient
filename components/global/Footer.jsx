import Image from "next/image";
import Link from "next/link";
import callIcon from "@/public/images/callIcon.svg";
import facebookLink from "@/public/images/facebookLInk.svg";
import linkedinLink from "@/public/images/linkedinLink.svg";
import instagramLink from "@/public/images/instagramLink.svg";

export default function Footer() {
  const footerData = [
    {
      title: "Our Brands",
      links: [
        { name: "Whirlpool", url: "/" },
        { name: "Conion", url: "/" },
        { name: "Sony", url: "/" },
        { name: "Hisense", url: "/" },
        { name: "Hitachi", url: "/" },
        { name: "Sharp", url: "/" },
        { name: "Panasonic", url: "/" },
        { name: "Philips", url: "/" },
        { name: "Midea", url: "/" },
        { name: "Kent", url: "/" },
        { name: "Toshiba", url: "/" },
      ],
    },
    {
      title: "Shopping with Us",
      links: [
        { name: "Quick EMIs", url: "/" },
        { name: "Super Kisti", url: "/" },
        { name: "Refund and Return Policy", url: "/" },
        { name: "Terms & Conditions of Warranty", url: "/" },
        { name: "Privacy Policy", url: "/" },
        { name: "Customer Complaint", url: "/" },
      ],
    },
    {
      title: "About Us",
      links: [
        { name: "Why Best Electronics?", url: "/" },
        { name: "Our Journey", url: "/" },
        { name: "Corporate Sales", url: "/" },
        { name: "Zaman Group", url: "/" },
        { name: "Contact Us", url: "/" },
      ],
    },
    {
      title: "Quick Navigation",
      links: [
        { name: "Shop", url: "/" },
        { name: "Checkout", url: "/" },
        { name: "Store Locator", url: "/" },
        { name: "Order Tracking", url: "/" },
      ],
    },
    {
      title: "find our store",
      links: [
        {
          name: "About 100 showrooms and dedicated distribution network all over Bangladesh, Best Electronics is your one-stop shop to get all kinds of electronic and electrical products at the most affordable price with reliable after-sales service. Click Here to find your nearest Best Electronics showroom.",
          url: "/",
        },
      ],
    },
  ];

  return (
    <footer className="bg-[#F16521] px-5 md:px-44 lg:px-28 ">
      <section className="grid grid-cols-1 md:grid-cols-5 justify-between items-start pt-20 text-white">
        {footerData.map((data, index) => (
          <div
            key={index}
            className="flex flex-col justify-between items-start gap-5 mb-10 w-full"
          >
            <h2 className="text-md font-semibold uppercase">{data.title}</h2>

            <ul>
              {data.links.map((link, index) => (
                <li key={index} className="mt-2">
                  <Link
                    href={link.url}
                    className="text-sm hover:text-[#b7b4b1] duration-700"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section>
        <div className="pb-10 flex flex-col md:flex-row justify-between md:items-center">
          <div className="flex justify-start items-center gap-2">
            <Image
              src={callIcon}
              className="w-12 h-12"
              alt="Best Electronics"
            />
            <div>
              <span className="text-nowrap text-white text-xl font-semibold">09606 111 777</span> <br />
              <span className="text-nowrap text-gray-200">
                Drooto Helpline (9:00AM - 9:00PM)
              </span>
            </div>
          </div>
          <div className="flex justify-start items-center gap-5 ml-auto mt-10 md:mt-0">
            <div>
              <span className="font-semibold text-white">Find us on: </span>{" "}
              <br />
            </div>
            <div className="flex justify-between items-center gap-3">
              <a href="https://www.facebook.com/bestelectronicsltd">
                <Image
                  src={facebookLink}
                  className="w-9 h-9"
                  alt="Best Electronics"
                />
              </a>
              <a href="https://www.linkedin.com/company/best-electronics-limited/mycompany/">
                <Image
                  src={linkedinLink}
                  className="w-9 h-9"
                  alt="Best Electronics"
                />
              </a>
              <a href="https://www.instagram.com/best_electronics_ltd/">
                <Image
                  src={instagramLink}
                  className="w-9 h-9"
                  alt="Best Electronics"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
