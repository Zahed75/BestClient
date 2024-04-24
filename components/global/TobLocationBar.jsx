import Link from "next/link";

export default function TopLocationBar() {
  const linkData = [
    { name: "My Account", url: "/" },
    { name: "Wishlist", url: "/" },
    { name: "Order Tracking", url: "/" },
    { name: "Cart", url: "/" },
  ];
  return (
    <section className="text-[#3E445A] text-md container px-5 md:px-20 py-3 hidden md:grid grid-cols-2 justify-between items-center border shadow-sm">
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
      <div className="flex justify-end items-center gap-5 divide-x-2">
        <div>
          <div>
            To Locate Store:{" "}
            <Link className="text-[#F16521]" href="/">
              <strong>Click Here</strong>
            </Link>
          </div>
        </div>

        <div className=" pl-5">
          <div>
            Need Help? Call <strong>Drooto Helpline:</strong>{" "}
            <span className="text-[#F16521]">09606 111 777</span>
          </div>
        </div>
      </div>
    </section>
  );
}
