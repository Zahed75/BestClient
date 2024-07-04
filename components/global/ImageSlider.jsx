"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ImageSlider = () => {
  const imageUrls = [
    "https://www.bestelectronics.com.bd/wp-content/uploads/2023/03/365-exchange1920x600.jpg",
    "https://www.bestelectronics.com.bd/wp-content/uploads/2023/05/Facebook-1.jpg",
    "https://www.bestelectronics.com.bd/wp-content/uploads/2023/09/600-1.jpeg",
  ];

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          height: "50px",
          width: "50px",
          borderRadius: "50%",
          background: "white",
          hover: "pointer",
          color: "#F16521",
          padding: "10px",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          position: "absolute",
          top: "50%",
          right: "20px",
          zIndex: 1,
        }}
        onClick={onClick}
      >
        <svg
          className="absolute top-3 ml-1"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clipRule="evenodd"
            d="M8.71142 3.48814C8.3913 3.17127 7.87292 3.17127 7.55198 3.48814C7.23267 3.80502 7.23267 4.32502 7.55198 4.64189L16.7194 12.9944L7.55198 21.355C7.23267 21.6719 7.23267 22.1838 7.55198 22.5088C7.87292 22.8256 8.3913 22.8256 8.71142 22.5088L18.4671 13.62C18.6377 13.4494 18.7109 13.2219 18.6979 12.9944C18.7092 12.775 18.6361 12.5475 18.4655 12.3769L8.7098 3.48814H8.71142Z"
            fill="#F16521"
          />
        </svg>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          height: "50px",
          width: "50px",
          borderRadius: "50%",
          background: "white",
          hover: "pointer",
          color: "#F16521",
          padding: "10px",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          position: "absolute",
          top: "50%",
          left: "20px",
          zIndex: 1,
        }}
        onClick={onClick}
      >
        <svg
          className="absolute top-3 rotate-180"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clipRule="evenodd"
            d="M8.71142 3.48814C8.3913 3.17127 7.87292 3.17127 7.55198 3.48814C7.23267 3.80502 7.23267 4.32502 7.55198 4.64189L16.7194 12.9944L7.55198 21.355C7.23267 21.6719 7.23267 22.1838 7.55198 22.5088C7.87292 22.8256 8.3913 22.8256 8.71142 22.5088L18.4671 13.62C18.6377 13.4494 18.7109 13.2219 18.6979 12.9944C18.7092 12.775 18.6361 12.5475 18.4655 12.3769L8.7098 3.48814H8.71142Z"
            fill="#F16521"
          />
        </svg>
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    fade: true,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <section className="mt-5 h-auto w-full">
      <Slider {...settings}>
        {imageUrls.map((imageUrl, index) => (
          <div
            key={index}
            className="w-full h-full relative object-cover"
          >
            <img
              src={imageUrl}
              alt={`Slide ${index + 1}`}
              className="w-full h-full"
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ImageSlider;
