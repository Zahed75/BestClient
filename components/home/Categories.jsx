import Image from "next/image";
import imag1 from "@/public/testImages/1.jpg";
import imag2 from "@/public/testImages/2.jpg";
import imag3 from "@/public/testImages/3.jpg";
import imag4 from "@/public/testImages/4.jpg";
import imag5 from "@/public/testImages/5.jpg";
import imag6 from "@/public/testImages/6.jpg";
import imag7 from "@/public/testImages/7.jpg";
import imag8 from "@/public/testImages/8.jpg";
import imag9 from "@/public/testImages/9.jpg";

export default function Categories() {
  const images = [
    imag1,
    imag2,
    imag3,
    imag4,
    imag5,
    imag6,
    imag7,
    imag8,
    imag9,
  ];

  return (
    <section className="px-5 md:px-44 lg:px-28 my-5 md:my-10 grid grid-cols-1 md:grid-cols-3 gap-3">
      {images.map((image, index) => (
        <div key={index} className="relative overflow-hidden">
          <Image src={image} alt="category" className="hover:scale-105 duration-700" />
        </div>
      ))}
    </section>
  );
}
