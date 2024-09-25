
import Link from 'next/link';
import Image from 'next/image';
import arraymood from "@/public/images/arraymood.png";

// Component for displaying tag lines
export default function TagLine({ tagValues }) {
  return (
    <section className="font-dosis my-5 uppercase">
      {tagValues && tagValues.length > 0 ? (
        <div>
          {tagValues.map((value, index) => {
            // Ensure `value.link` is a string
            const linkHref = typeof value?.link === 'string' ? value?.link : '/';

            return (
              <span key={index} className="inline-flex items-center">
                <Link href={linkHref}>
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
            );
          })}
        </div>
      ) : (
        <p>No tags available</p>
      )}
    </section>
  );
}
