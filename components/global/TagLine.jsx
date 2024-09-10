import Image from "next/image";
import arraymood from "@/public/images/arraymood.png";
import Link from "next/link";

export default function TagLine({ tagValues }) {
  return (
    <section className="my-5">
      {tagValues && tagValues.length > 0 ? (
        <div>
          {tagValues?.map((value, index) => (
            <span key={index} className="inline-flex items-center">
              <Link href="/">
                <span className="text-sm text-slate-500">{value?.value}</span>
              </Link>
              {index !== tagValues.length - 1 && (
                <Image
                  src={arraymood}
                  alt="arrow-right"
                  className="inline-block"
                />
              )}
            </span>
          ))}
        </div>
      ) : (
        <p>No tags available</p>
      )}
    </section>
  );
}
