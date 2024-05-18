import Image from "next/image";
import arraymood from "@/public/images/arraymood.png";
import Link from "next/link";

export default function TagLine({ tagValues }) {
  console.log(tagValues);
  return (
    <section className="my-5">
      {tagValues && tagValues.length > 0 ? (
        <div>
          {tagValues.map((tag, index) => (
            <Link href="/" key={index} className="text-sm text-slate-500">
              {tag}
              {index !== tagValues.length - 1 && (
                <Image
                  src={arraymood}
                  alt="arrow-right"
                  className="inline-block w-10"
                />
              )}
            </Link>
          ))}
        </div>
      ) : (
        <p>No tags available</p> 
      )}
    </section>
  );
}
