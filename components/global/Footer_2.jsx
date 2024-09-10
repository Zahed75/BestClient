import React from 'react'
import Image from "next/image";
import Link from "next/link";
import callIcon from "@/public/images/callIcon.svg";
import linkedinLink from "@/public/images/linkedinLink.svg";
import instagramLink from "@/public/images/instagramLink.svg";
import pso from "@/public/images/pso 1.png";
import logo from "@/public/images/logo 1.png";

export default function Footer_2() {
    const footerData = [
        {
            title: "Need help?",
            links: [
                { name: "Help & FAQs", url: "/" },
                { name: "Contact us", url: "/" },
                { name: "Store finder", url: "/" },
                { name: "Account", url: "/" },
                { name: "Advice & inspiration", url: "/" },
            ],
        },
        {
            title: "Delivery & returns",
            links: [
                { name: "Delivery & collection", url: "/" },
                { name: "Returns & refunds", url: "/" },
                { name: "Track your order", url: "/" },
            ],
        },
        {
            title: "Payment & services",
            links: [
                { name: "Payment types", url: "/" },
                { name: "Gift cards", url: "/" },
                { name: "Voucher codes", url: "/" },
                { name: "eGift Card Rewards", url: "/" },
                { name: "Best Electronics Card", url: "/" },
                { name: "Nectar at Best Electronics", url: "/" },
                { name: "Pet Insurance", url: "/" },
                { name: "Furniture Recycling", url: "/" },
            ],
        },
        {
            title: "About Best Electronics",
            links: [
                { name: "About us", url: "/" },
                { name: "Best Electronics for Business", url: "/" },
                { name: "Careers", url: "/" },
                { name: "Press enquiries", url: "/" },
                { name: "Modern Slavery Statement", url: "/" },
            ],
        },
    ];

    return (
        <footer className="bg-[#f1f1f1] border">
            {/* <div className="container "> */}
            <section className="container grid grid-cols-1 md:grid-cols-4 justify-between items-start text-#3E445A font-dosis">
                {/* {footerData.map((data, index) => (
                            <div
                                key={index}
                                className="flex flex-col justify-between items-start gap-5 mb-10 w-full"
                            >
                                <h2 className="text-md font-semibold ">
                                    {data.title}
                                </h2>

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

                        ))} */}
                <div className="flex flex-col justify-between items-start gap-5 mb-10 w-full">
                    <h2 className="text-md font-semibold ">
                        Need help?
                    </h2>
                    <ul>
                        <li className="mt-2">
                            <Link
                                href=" "
                                className="text-sm hover:text-[#b7b4b1] duration-700"
                            >
                                Help & FAQs
                            </Link>
                        </li>
                        <li className="mt-2">
                            <Link
                                href=" "
                                className="text-sm hover:text-[#b7b4b1] duration-700"
                            >   Store finder
                            </Link>
                        </li>
                        <li className="mt-2">
                            <Link
                                href=" "
                                className="text-sm hover:text-[#b7b4b1] duration-700"
                            >   Contact us
                            </Link>
                        </li>
                        <li className="mt-2">
                            <Link
                                href=" "
                                className="text-sm hover:text-[#b7b4b1] duration-700"
                            >   Account
                            </Link>
                        </li>
                        <li className="mt-2">
                            <Link
                                href=" "
                                className="text-sm hover:text-[#b7b4b1] duration-700"
                            >   Advice & inspiration
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='flex flex-col'>
                    <div className="flex flex-col justify-between items-start gap-4 mb-5 w-full">
                        <h2 className="text-md font-semibold ">
                            Delivery & returns
                        </h2>
                        <ul>
                            <li className="mt-2">
                                <Link
                                    href=" "
                                    className="text-sm hover:text-[#b7b4b1] duration-700"
                                >
                                    Delivery & collection
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link
                                    href=" "
                                    className="text-sm hover:text-[#b7b4b1] duration-700"
                                >   Returns & refunds
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link
                                    href=" "
                                    className="text-sm hover:text-[#b7b4b1] duration-700"
                                >   Track your order
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col justify-between items-start gap-4 mb-10 w-full">
                        <h2 className="text-md font-semibold ">
                            Product care
                        </h2>
                        <ul>
                            <li className="mt-2">
                                <Link
                                    href=" "
                                    className="text-sm hover:text-[#b7b4b1] duration-700"
                                >
                                    Best Electronics Care
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link
                                    href=" "
                                    className="text-sm hover:text-[#b7b4b1] duration-700"
                                >   Product Support
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link
                                    href=" "
                                    className="text-sm hover:text-[#b7b4b1] duration-700"
                                >   Product recall
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link
                                    href=" "
                                    className="text-sm hover:text-[#b7b4b1] duration-700"
                                >   Best Electronics Spares
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col justify-between items-start gap-5 mb-10 w-full">
                    <h2 className="text-md font-semibold ">
                        Payment & services
                    </h2>
                    <ul>
                        <li className="mt-2">
                            <Link
                                href=" "
                                className="text-sm hover:text-[#b7b4b1] duration-700"
                            >
                                Payment types
                            </Link>
                        </li>
                        <li className="mt-2">
                            <Link
                                href=" "
                                className="text-sm hover:text-[#b7b4b1] duration-700"
                            >   Gift cards
                            </Link>
                        </li>
                        <li className="mt-2">
                            <Link
                                href=" "
                                className="text-sm hover:text-[#b7b4b1] duration-700"
                            >   eGift Card Rewards
                            </Link>
                        </li>
                        <li className="mt-2">
                            <Link
                                href=" "
                                className="text-sm hover:text-[#b7b4b1] duration-700"
                            >
                                Best Electronics Card
                            </Link>
                        </li>
                        <li className="mt-2">
                            <Link
                                href=" "
                                className="text-sm hover:text-[#b7b4b1] duration-700"
                            >   Nectar at Best Electronics
                            </Link>
                        </li>
                        <li className="mt-2">
                            <Link
                                href=" "
                                className="text-sm hover:text-[#b7b4b1] duration-700"
                            >   Pet Insurance
                            </Link>
                        </li>
                        <li className="mt-2">
                            <Link
                                href=" "
                                className="text-sm hover:text-[#b7b4b1] duration-700"
                            >   Furniture Recycling
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col justify-between items-start gap-5 mb-10 w-full">
                    <h2 className="text-md font-semibold ">
                        About Best Electronics
                    </h2>
                    <ul>
                        <li className="mt-2">
                            <Link
                                href=" "
                                className="text-sm hover:text-[#b7b4b1] duration-700"
                            >
                                About us
                            </Link>
                        </li>
                        <li className="mt-2">
                            <Link
                                href=" "
                                className="text-sm hover:text-[#b7b4b1] duration-700"
                            >   Best Electronics for Business
                            </Link>
                        </li>
                        <li className="mt-2">
                            <Link
                                href=" "
                                className="text-sm hover:text-[#b7b4b1] duration-700"
                            >   Careers
                            </Link>
                        </li>
                        <li className="mt-2">
                            <Link
                                href=" "
                                className="text-sm hover:text-[#b7b4b1] duration-700"
                            >   Press enquiries
                            </Link>
                        </li>
                        <li className="mt-2">
                            <Link
                                href=" "
                                className="text-sm hover:text-[#b7b4b1] duration-700"
                            >   Modern Slavery Statement
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
            <section className="container grid grid-cols-1 md:grid-rows-2 justify-center items-center text-#3E445A font-dosis border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-10 w-full">
                    <div><h2 className="text-md text-center font-semibold ">
                        Returning an Item
                    </h2>
                        <h2 className="text-md text-center ">
                            for returns, product support and repairs.
                        </h2>
                        <a href="" className=" flex underline text-orange-500 justify-center items-center ">Learn More Here</a>
                    </div>
                    <div>

                        <div className=''><h2 className="text-md text-center font-semibold ">
                            Payment Partners
                        </h2>
                            <div className="flex flex-col lg:flex-row justify-center items-center gap-x-5">
                                <Image src={logo} className="w-fit" alt="SSL Commerz" />
                                <Image src={pso} className="w-fit" alt="SSL Commerz" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-10 w-full">

                    <div className="flex flex-col justify-center items-center gap-5 w-full">
                        <h2 className="text-md text-center font-semibold ">
                            Follow Us
                        </h2>
                        <div className="flex justify-between items-center gap-3">
                            <a href="https://x.com/bestelecBD/">
                                <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.4771 0.25H24.4636L15.7542 10.2044L26.0002 23.75H17.9764L11.6929 15.5346L4.50311 23.75H0.514133L9.82977 13.1027L0.00195312 0.25H8.22695L13.9067 7.75915L20.4771 0.25ZM19.0779 21.3638H21.2869L7.02785 2.51082H4.65736L19.0779 21.3638Z" fill="#4B5563" />
                                </svg>
                            </a>
                            <a href="https://www.facebook.com/bestelectronicsltd">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.1406 12.0703C23.1406 5.68023 17.9603 0.5 11.5703 0.5C5.18023 0.5 0 5.68014 0 12.0703C0 17.8453 4.23111 22.632 9.76242 23.5V15.4148H6.82466V12.0703H9.76242V9.5212C9.76242 6.6214 11.4898 5.01964 14.1326 5.01964C15.3986 5.01964 16.7227 5.24562 16.7227 5.24562V8.093H15.2637C13.8263 8.093 13.3781 8.9849 13.3781 9.89995V12.0703H16.5871L16.0741 15.4148H13.3781V23.5C18.9095 22.632 23.1406 17.8454 23.1406 12.0703Z" fill="#4B5563" />
                                </svg>

                            </a>
                            <a href="https://www.linkedin.com/company/best-electronics-limited/mycompany/">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.5851 0.5C21.2628 0.5 21.9129 0.769245 22.3921 1.2485C22.8714 1.72776 23.1406 2.37778 23.1406 3.05556V20.9444C23.1406 21.6222 22.8714 22.2722 22.3921 22.7515C21.9129 23.2308 21.2628 23.5 20.5851 23.5H2.69618C2.01841 23.5 1.36839 23.2308 0.88913 22.7515C0.40987 22.2722 0.140625 21.6222 0.140625 20.9444V3.05556C0.140625 2.37778 0.40987 1.72776 0.88913 1.2485C1.36839 0.769245 2.01841 0.5 2.69618 0.5H20.5851ZM19.9462 20.3056V13.5333C19.9462 12.4286 19.5073 11.369 18.7261 10.5878C17.9449 9.80665 16.8854 9.36778 15.7806 9.36778C14.6945 9.36778 13.4295 10.0322 12.8162 11.0289V9.61056H9.25118V20.3056H12.8162V14.0061C12.8162 13.0222 13.6084 12.2172 14.5923 12.2172C15.0667 12.2172 15.5217 12.4057 15.8572 12.7412C16.1927 13.0767 16.3812 13.5317 16.3812 14.0061V20.3056H19.9462ZM5.0984 7.60444C5.66773 7.60444 6.21375 7.37828 6.61633 6.9757C7.0189 6.57312 7.24507 6.02711 7.24507 5.45778C7.24507 4.26944 6.28674 3.29833 5.0984 3.29833C4.52568 3.29833 3.97642 3.52585 3.57144 3.93082C3.16647 4.33579 2.93896 4.88506 2.93896 5.45778C2.93896 6.64611 3.91007 7.60444 5.0984 7.60444ZM6.87451 20.3056V9.61056H3.33507V20.3056H6.87451Z" fill="#4B5563" />
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/best_electronics_ltd/">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.81063 0.5H16.4706C20.1506 0.5 23.1406 3.49 23.1406 7.17V16.83C23.1406 18.599 22.4379 20.2955 21.187 21.5464C19.9362 22.7973 18.2396 23.5 16.4706 23.5H6.81063C3.13063 23.5 0.140625 20.51 0.140625 16.83V7.17C0.140625 5.40101 0.843355 3.70447 2.09422 2.4536C3.34509 1.20273 5.04163 0.5 6.81063 0.5ZM6.58062 2.8C5.48263 2.8 4.4296 3.23618 3.6532 4.01258C2.8768 4.78898 2.44062 5.842 2.44062 6.94V17.06C2.44062 19.3485 4.29212 21.2 6.58062 21.2H16.7006C17.7986 21.2 18.8516 20.7638 19.628 19.9874C20.4044 19.211 20.8406 18.158 20.8406 17.06V6.94C20.8406 4.6515 18.9891 2.8 16.7006 2.8H6.58062ZM17.6781 4.525C18.0594 4.525 18.425 4.67645 18.6946 4.94603C18.9642 5.21562 19.1156 5.58125 19.1156 5.9625C19.1156 6.34375 18.9642 6.70938 18.6946 6.97897C18.425 7.24855 18.0594 7.4 17.6781 7.4C17.2969 7.4 16.9312 7.24855 16.6617 6.97897C16.3921 6.70938 16.2406 6.34375 16.2406 5.9625C16.2406 5.58125 16.3921 5.21562 16.6617 4.94603C16.9312 4.67645 17.2969 4.525 17.6781 4.525ZM11.6406 6.25C13.1656 6.25 14.6282 6.8558 15.7065 7.93414C16.7848 9.01247 17.3906 10.475 17.3906 12C17.3906 13.525 16.7848 14.9875 15.7065 16.0659C14.6282 17.1442 13.1656 17.75 11.6406 17.75C10.1156 17.75 8.6531 17.1442 7.57476 16.0659C6.49643 14.9875 5.89062 13.525 5.89062 12C5.89062 10.475 6.49643 9.01247 7.57476 7.93414C8.6531 6.8558 10.1156 6.25 11.6406 6.25ZM11.6406 8.55C10.7256 8.55 9.84811 8.91348 9.20111 9.56048C8.55411 10.2075 8.19063 11.085 8.19063 12C8.19063 12.915 8.55411 13.7925 9.20111 14.4395C9.84811 15.0865 10.7256 15.45 11.6406 15.45C12.5556 15.45 13.4331 15.0865 14.0801 14.4395C14.7271 13.7925 15.0906 12.915 15.0906 12C15.0906 11.085 14.7271 10.2075 14.0801 9.56048C13.4331 8.91348 12.5556 8.55 11.6406 8.55Z" fill="#4B5563" />
                                </svg>
                            </a>
                            <a href="https://www.youtube.com/@bestelectronics.bangladesh/">
                                <svg width="33" height="24" viewBox="0 0 33 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.2835 16.9286L21.8099 12L13.2835 7.07143V16.9286ZM32.2749 4.065C32.4885 4.83714 32.6363 5.87214 32.7349 7.18643C32.8499 8.50071 32.8992 9.63429 32.8992 10.62L32.9978 12C32.9978 15.5979 32.7349 18.2429 32.2749 19.935C31.8642 21.4136 30.9113 22.3664 29.4328 22.7771C28.6606 22.9907 27.2478 23.1386 25.0792 23.2371C22.9435 23.3521 20.9885 23.4014 19.1813 23.4014L16.5692 23.5C9.68562 23.5 5.39777 23.2371 3.70562 22.7771C2.22705 22.3664 1.2742 21.4136 0.863482 19.935C0.649911 19.1629 0.502054 18.1279 0.403482 16.8136C0.288482 15.4993 0.239196 14.3657 0.239196 13.38L0.140625 12C0.140625 8.40214 0.403482 5.75714 0.863482 4.065C1.2742 2.58643 2.22705 1.63357 3.70562 1.22286C4.47777 1.00929 5.89062 0.861428 8.0592 0.762857C10.1949 0.647857 12.1499 0.598571 13.9571 0.598571L16.5692 0.5C23.4528 0.5 27.7406 0.762857 29.4328 1.22286C30.9113 1.63357 31.8642 2.58643 32.2749 4.065Z" fill="#4B5563" />
                                </svg>

                            </a>
                            <a href="https://www.pinterest.co.uk/bestelecbd/">
                                <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.09405 22.971C9.19805 23.3045 10.3135 23.5 11.498 23.5C14.548 23.5 17.4731 22.2884 19.6298 20.1317C21.7864 17.9751 22.998 15.05 22.998 12C22.998 10.4898 22.7006 8.99438 22.1227 7.59914C21.5447 6.2039 20.6976 4.93615 19.6298 3.86827C18.5619 2.8004 17.2942 1.95331 15.8989 1.37539C14.5037 0.797456 13.0082 0.5 11.498 0.5C9.98785 0.5 8.49243 0.797456 7.09719 1.37539C5.70194 1.95331 4.43419 2.8004 3.36632 3.86827C1.20965 6.02494 -0.00195312 8.95001 -0.00195312 12C-0.00195312 16.8875 3.06855 21.085 7.40405 22.741C7.30055 21.844 7.19705 20.3605 7.40405 19.337L8.72655 13.656C8.72655 13.656 8.39305 12.989 8.39305 11.931C8.39305 10.344 9.38205 9.1595 10.509 9.1595C11.498 9.1595 11.958 9.884 11.958 10.8155C11.958 11.8045 11.3025 13.219 10.969 14.576C10.7735 15.703 11.567 16.692 12.717 16.692C14.764 16.692 16.351 14.507 16.351 11.425C16.351 8.665 14.373 6.779 11.5325 6.779C8.28955 6.779 6.38055 9.194 6.38055 11.7355C6.38055 12.7245 6.70255 13.725 7.23155 14.3805C7.33505 14.4495 7.33505 14.5415 7.30055 14.714L6.96705 15.9675C6.96705 16.163 6.84055 16.232 6.64505 16.094C5.17305 15.45 4.32205 13.357 4.32205 11.6665C4.32205 8.0325 6.89805 4.732 11.866 4.732C15.822 4.732 18.904 7.5725 18.904 11.3445C18.904 15.3005 16.4545 18.4745 12.947 18.4745C11.8315 18.4745 10.739 17.8765 10.348 17.175L9.57755 19.9005C9.31305 20.8895 8.58855 22.212 8.09405 23.0055V22.971Z" fill="#4B5563" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-5 w-full">

                        <div className="flex justify-start items-center gap-2">
                            <h2 className="text-md text-center font-semibold ">
                                Drooto Helpline
                            </h2>
                            <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="1" y="1" width="41" height="41" rx="20.5" stroke="#F26522" />
                                <g clip-path="url(#clip0_2301_10106)">
                                    <path d="M26.7338 24.142C26.3738 23.758 25.9508 23.566 25.4648 23.566C24.9788 23.566 24.5438 23.758 24.1598 24.142L22.9538 25.348L22.5578 25.132C22.4258 25.072 22.3358 25.024 22.2878 24.988C21.1598 24.256 20.1158 23.308 19.1558 22.144C18.6878 21.532 18.3458 20.992 18.1298 20.524C18.4178 20.272 18.7118 19.984 19.0118 19.66L19.3358 19.336C19.7318 18.928 19.9298 18.487 19.9298 18.013C19.9298 17.539 19.7318 17.104 19.3358 16.708L18.2918 15.664C18.1358 15.508 18.0218 15.388 17.9498 15.304L17.7698 15.124C17.5418 14.884 17.3618 14.71 17.2298 14.602C16.8578 14.23 16.4378 14.044 15.9698 14.044C15.5018 14.044 15.0698 14.23 14.6738 14.602H14.6558L13.3598 15.916C12.8798 16.396 12.6098 16.984 12.5498 17.68C12.4658 18.484 12.6278 19.42 13.0358 20.488C13.3358 21.316 13.7228 22.126 14.1968 22.918C14.6708 23.71 15.2498 24.52 15.9338 25.348C17.6138 27.34 19.5998 28.894 21.8918 30.01C23.1278 30.598 24.2438 30.928 25.2398 31H25.4738C26.3618 31 27.0938 30.688 27.6698 30.064V30.046C27.7778 29.914 27.9518 29.728 28.1918 29.488L28.3358 29.344C28.4918 29.212 28.6598 29.05 28.8398 28.858C29.2238 28.45 29.4158 28.006 29.4158 27.526C29.4158 27.046 29.2178 26.62 28.8218 26.248L26.7338 24.142ZM28.1018 28.156C28.0418 28.228 27.9398 28.33 27.7958 28.462L27.6338 28.624C27.3578 28.876 27.1118 29.128 26.8958 29.38C26.5358 29.776 26.0618 29.974 25.4738 29.974H25.2938C24.4178 29.914 23.4338 29.62 22.3418 29.092C20.1698 28.036 18.2978 26.572 16.7258 24.7C16.0778 23.92 15.5318 23.161 15.0878 22.423C14.6438 21.685 14.2778 20.926 13.9898 20.146C13.8098 19.654 13.6868 19.219 13.6208 18.841C13.5548 18.463 13.5398 18.1 13.5758 17.752C13.6118 17.296 13.7858 16.924 14.0978 16.636L15.3938 15.34C15.5738 15.16 15.7628 15.07 15.9608 15.07C16.1588 15.07 16.3478 15.16 16.5278 15.34C16.6358 15.436 16.7858 15.586 16.9778 15.79L17.3378 16.15C17.4458 16.246 17.5238 16.324 17.5718 16.384L18.6158 17.428C19.0118 17.812 19.0118 18.202 18.6158 18.598C18.5438 18.682 18.4358 18.796 18.2918 18.94C17.8718 19.36 17.5538 19.666 17.3378 19.858L17.3198 19.876C17.0798 20.116 17.0138 20.404 17.1218 20.74V20.776C17.3858 21.4 17.7998 22.066 18.3638 22.774C19.4078 24.07 20.5298 25.096 21.7298 25.852L22.3058 26.158C22.4378 26.218 22.5278 26.266 22.5758 26.302L22.6298 26.338C22.7738 26.398 22.8938 26.428 22.9898 26.428C23.2058 26.428 23.4038 26.338 23.5838 26.158L24.8798 24.862C25.0718 24.67 25.2578 24.574 25.4378 24.574C25.6178 24.574 25.8038 24.67 25.9958 24.862L28.1018 26.968C28.4858 27.34 28.4858 27.736 28.1018 28.156ZM22.2338 17.284C23.2538 17.452 24.1268 17.899 24.8528 18.625C25.5788 19.351 26.0378 20.23 26.2298 21.262C26.2418 21.382 26.2958 21.484 26.3918 21.568C26.4878 21.652 26.6018 21.694 26.7338 21.694L26.8238 21.676C26.9558 21.652 27.0638 21.583 27.1478 21.469C27.2318 21.355 27.2618 21.226 27.2378 21.082C27.1418 20.482 26.9528 19.912 26.6708 19.372C26.3888 18.832 26.0318 18.346 25.5998 17.914C25.1678 17.482 24.6788 17.125 24.1328 16.843C23.5868 16.561 23.0138 16.372 22.4138 16.276C22.2818 16.252 22.1558 16.279 22.0358 16.357C21.9158 16.435 21.8438 16.546 21.8198 16.69C21.7958 16.834 21.8228 16.963 21.9008 17.077C21.9788 17.191 22.0898 17.26 22.2338 17.284ZM30.4958 20.938C30.3278 19.942 30.0128 19.003 29.5508 18.121C29.0888 17.239 28.4978 16.438 27.7778 15.718C27.0578 14.998 26.2568 14.407 25.3748 13.945C24.4928 13.483 23.5538 13.168 22.5578 13C22.4258 12.976 22.2998 13.006 22.1798 13.09C22.0598 13.174 21.9878 13.285 21.9638 13.423C21.9398 13.561 21.9698 13.69 22.0538 13.81C22.1378 13.93 22.2518 14.002 22.3958 14.026C23.2718 14.17 24.1088 14.449 24.9068 14.863C25.7048 15.277 26.4248 15.802 27.0668 16.438C27.7088 17.074 28.2338 17.788 28.6418 18.58C29.0498 19.372 29.3318 20.212 29.4878 21.1C29.4998 21.22 29.5538 21.322 29.6498 21.406C29.7458 21.49 29.8598 21.532 29.9918 21.532H30.0818C30.2138 21.508 30.3218 21.436 30.4058 21.316C30.4898 21.196 30.5198 21.07 30.4958 20.938Z" fill="#F16521" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2301_10106">
                                        <rect width="18" height="18" fill="white" transform="matrix(1 0 0 -1 12.5 31)" />
                                    </clipPath>
                                </defs>
                            </svg>

                            <div>
                                <span className="text-nowrap text-3E445A text-xl font-semibold">
                                    09606 111 777
                                </span>{" "}
                                <br />
                                <span className="text-nowrap text-3E445A">
                                    (9:00AM - 9:00PM)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="container grid grid-cols-1 md:grid-cols-2 justify-center items-center pt-20 text-#3E445A font-dosis border">
                <div className="flex flex-col justify-center items-center gap-5 w-full border-r">
                    <h2 className="text-md text-center font-semibold ">
                        Returning an Item
                    </h2>
                    <h2 className="text-md text-center ">
                        for returns, product support and repairs.
                    </h2>
                    <a href="" className=" flex underline text-orange-500 justify-center items-center ">Learn More Here</a>
                </div>
                <div className="flex flex-col justify-center items-center gap-5 w-full">
                    <h2 className="text-md text-center font-semibold ">
                        Payment Partners
                    </h2>
                    <div className="flex flex-col lg:flex-row items-center gap-x-5">
                        <Image src={logo} className="w-fit" alt="SSL Commerz" />
                        <Image src={pso} className="w-fit" alt="SSL Commerz" />
                    </div>
                </div>
            </section>
            <section className="container grid grid-cols-1 md:grid-cols-2 justify-center items-center  text-#3E445A font-dosis border">
                <div className="flex flex-col justify-center items-center gap-5 w-full border-r">
                    <h2 className="text-md text-center font-semibold ">
                        Follow Us
                    </h2>
                    <div className="flex justify-between items-center gap-3">
                        <a href="https://x.com/bestelecBD/">
                            <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.4771 0.25H24.4636L15.7542 10.2044L26.0002 23.75H17.9764L11.6929 15.5346L4.50311 23.75H0.514133L9.82977 13.1027L0.00195312 0.25H8.22695L13.9067 7.75915L20.4771 0.25ZM19.0779 21.3638H21.2869L7.02785 2.51082H4.65736L19.0779 21.3638Z" fill="#4B5563" />
                            </svg>
                        </a>
                        <a href="https://www.facebook.com/bestelectronicsltd">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.1406 12.0703C23.1406 5.68023 17.9603 0.5 11.5703 0.5C5.18023 0.5 0 5.68014 0 12.0703C0 17.8453 4.23111 22.632 9.76242 23.5V15.4148H6.82466V12.0703H9.76242V9.5212C9.76242 6.6214 11.4898 5.01964 14.1326 5.01964C15.3986 5.01964 16.7227 5.24562 16.7227 5.24562V8.093H15.2637C13.8263 8.093 13.3781 8.9849 13.3781 9.89995V12.0703H16.5871L16.0741 15.4148H13.3781V23.5C18.9095 22.632 23.1406 17.8454 23.1406 12.0703Z" fill="#4B5563" />
                            </svg>

                        </a>
                        <a href="https://www.linkedin.com/company/best-electronics-limited/mycompany/">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.5851 0.5C21.2628 0.5 21.9129 0.769245 22.3921 1.2485C22.8714 1.72776 23.1406 2.37778 23.1406 3.05556V20.9444C23.1406 21.6222 22.8714 22.2722 22.3921 22.7515C21.9129 23.2308 21.2628 23.5 20.5851 23.5H2.69618C2.01841 23.5 1.36839 23.2308 0.88913 22.7515C0.40987 22.2722 0.140625 21.6222 0.140625 20.9444V3.05556C0.140625 2.37778 0.40987 1.72776 0.88913 1.2485C1.36839 0.769245 2.01841 0.5 2.69618 0.5H20.5851ZM19.9462 20.3056V13.5333C19.9462 12.4286 19.5073 11.369 18.7261 10.5878C17.9449 9.80665 16.8854 9.36778 15.7806 9.36778C14.6945 9.36778 13.4295 10.0322 12.8162 11.0289V9.61056H9.25118V20.3056H12.8162V14.0061C12.8162 13.0222 13.6084 12.2172 14.5923 12.2172C15.0667 12.2172 15.5217 12.4057 15.8572 12.7412C16.1927 13.0767 16.3812 13.5317 16.3812 14.0061V20.3056H19.9462ZM5.0984 7.60444C5.66773 7.60444 6.21375 7.37828 6.61633 6.9757C7.0189 6.57312 7.24507 6.02711 7.24507 5.45778C7.24507 4.26944 6.28674 3.29833 5.0984 3.29833C4.52568 3.29833 3.97642 3.52585 3.57144 3.93082C3.16647 4.33579 2.93896 4.88506 2.93896 5.45778C2.93896 6.64611 3.91007 7.60444 5.0984 7.60444ZM6.87451 20.3056V9.61056H3.33507V20.3056H6.87451Z" fill="#4B5563" />
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/best_electronics_ltd/">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.81063 0.5H16.4706C20.1506 0.5 23.1406 3.49 23.1406 7.17V16.83C23.1406 18.599 22.4379 20.2955 21.187 21.5464C19.9362 22.7973 18.2396 23.5 16.4706 23.5H6.81063C3.13063 23.5 0.140625 20.51 0.140625 16.83V7.17C0.140625 5.40101 0.843355 3.70447 2.09422 2.4536C3.34509 1.20273 5.04163 0.5 6.81063 0.5ZM6.58062 2.8C5.48263 2.8 4.4296 3.23618 3.6532 4.01258C2.8768 4.78898 2.44062 5.842 2.44062 6.94V17.06C2.44062 19.3485 4.29212 21.2 6.58062 21.2H16.7006C17.7986 21.2 18.8516 20.7638 19.628 19.9874C20.4044 19.211 20.8406 18.158 20.8406 17.06V6.94C20.8406 4.6515 18.9891 2.8 16.7006 2.8H6.58062ZM17.6781 4.525C18.0594 4.525 18.425 4.67645 18.6946 4.94603C18.9642 5.21562 19.1156 5.58125 19.1156 5.9625C19.1156 6.34375 18.9642 6.70938 18.6946 6.97897C18.425 7.24855 18.0594 7.4 17.6781 7.4C17.2969 7.4 16.9312 7.24855 16.6617 6.97897C16.3921 6.70938 16.2406 6.34375 16.2406 5.9625C16.2406 5.58125 16.3921 5.21562 16.6617 4.94603C16.9312 4.67645 17.2969 4.525 17.6781 4.525ZM11.6406 6.25C13.1656 6.25 14.6282 6.8558 15.7065 7.93414C16.7848 9.01247 17.3906 10.475 17.3906 12C17.3906 13.525 16.7848 14.9875 15.7065 16.0659C14.6282 17.1442 13.1656 17.75 11.6406 17.75C10.1156 17.75 8.6531 17.1442 7.57476 16.0659C6.49643 14.9875 5.89062 13.525 5.89062 12C5.89062 10.475 6.49643 9.01247 7.57476 7.93414C8.6531 6.8558 10.1156 6.25 11.6406 6.25ZM11.6406 8.55C10.7256 8.55 9.84811 8.91348 9.20111 9.56048C8.55411 10.2075 8.19063 11.085 8.19063 12C8.19063 12.915 8.55411 13.7925 9.20111 14.4395C9.84811 15.0865 10.7256 15.45 11.6406 15.45C12.5556 15.45 13.4331 15.0865 14.0801 14.4395C14.7271 13.7925 15.0906 12.915 15.0906 12C15.0906 11.085 14.7271 10.2075 14.0801 9.56048C13.4331 8.91348 12.5556 8.55 11.6406 8.55Z" fill="#4B5563" />
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/@bestelectronics.bangladesh/">
                            <svg width="33" height="24" viewBox="0 0 33 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.2835 16.9286L21.8099 12L13.2835 7.07143V16.9286ZM32.2749 4.065C32.4885 4.83714 32.6363 5.87214 32.7349 7.18643C32.8499 8.50071 32.8992 9.63429 32.8992 10.62L32.9978 12C32.9978 15.5979 32.7349 18.2429 32.2749 19.935C31.8642 21.4136 30.9113 22.3664 29.4328 22.7771C28.6606 22.9907 27.2478 23.1386 25.0792 23.2371C22.9435 23.3521 20.9885 23.4014 19.1813 23.4014L16.5692 23.5C9.68562 23.5 5.39777 23.2371 3.70562 22.7771C2.22705 22.3664 1.2742 21.4136 0.863482 19.935C0.649911 19.1629 0.502054 18.1279 0.403482 16.8136C0.288482 15.4993 0.239196 14.3657 0.239196 13.38L0.140625 12C0.140625 8.40214 0.403482 5.75714 0.863482 4.065C1.2742 2.58643 2.22705 1.63357 3.70562 1.22286C4.47777 1.00929 5.89062 0.861428 8.0592 0.762857C10.1949 0.647857 12.1499 0.598571 13.9571 0.598571L16.5692 0.5C23.4528 0.5 27.7406 0.762857 29.4328 1.22286C30.9113 1.63357 31.8642 2.58643 32.2749 4.065Z" fill="#4B5563" />
                            </svg>

                        </a>
                        <a href="https://www.pinterest.co.uk/bestelecbd/">
                            <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.09405 22.971C9.19805 23.3045 10.3135 23.5 11.498 23.5C14.548 23.5 17.4731 22.2884 19.6298 20.1317C21.7864 17.9751 22.998 15.05 22.998 12C22.998 10.4898 22.7006 8.99438 22.1227 7.59914C21.5447 6.2039 20.6976 4.93615 19.6298 3.86827C18.5619 2.8004 17.2942 1.95331 15.8989 1.37539C14.5037 0.797456 13.0082 0.5 11.498 0.5C9.98785 0.5 8.49243 0.797456 7.09719 1.37539C5.70194 1.95331 4.43419 2.8004 3.36632 3.86827C1.20965 6.02494 -0.00195312 8.95001 -0.00195312 12C-0.00195312 16.8875 3.06855 21.085 7.40405 22.741C7.30055 21.844 7.19705 20.3605 7.40405 19.337L8.72655 13.656C8.72655 13.656 8.39305 12.989 8.39305 11.931C8.39305 10.344 9.38205 9.1595 10.509 9.1595C11.498 9.1595 11.958 9.884 11.958 10.8155C11.958 11.8045 11.3025 13.219 10.969 14.576C10.7735 15.703 11.567 16.692 12.717 16.692C14.764 16.692 16.351 14.507 16.351 11.425C16.351 8.665 14.373 6.779 11.5325 6.779C8.28955 6.779 6.38055 9.194 6.38055 11.7355C6.38055 12.7245 6.70255 13.725 7.23155 14.3805C7.33505 14.4495 7.33505 14.5415 7.30055 14.714L6.96705 15.9675C6.96705 16.163 6.84055 16.232 6.64505 16.094C5.17305 15.45 4.32205 13.357 4.32205 11.6665C4.32205 8.0325 6.89805 4.732 11.866 4.732C15.822 4.732 18.904 7.5725 18.904 11.3445C18.904 15.3005 16.4545 18.4745 12.947 18.4745C11.8315 18.4745 10.739 17.8765 10.348 17.175L9.57755 19.9005C9.31305 20.8895 8.58855 22.212 8.09405 23.0055V22.971Z" fill="#4B5563" />
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-5 w-full">
                    <h2 className="text-md text-center font-semibold ">
                        Drooto Helpline
                    </h2>
                    <div className="flex justify-start items-center gap-2">
                        <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1" width="41" height="41" rx="20.5" stroke="#F26522" />
                            <g clip-path="url(#clip0_2301_10106)">
                                <path d="M26.7338 24.142C26.3738 23.758 25.9508 23.566 25.4648 23.566C24.9788 23.566 24.5438 23.758 24.1598 24.142L22.9538 25.348L22.5578 25.132C22.4258 25.072 22.3358 25.024 22.2878 24.988C21.1598 24.256 20.1158 23.308 19.1558 22.144C18.6878 21.532 18.3458 20.992 18.1298 20.524C18.4178 20.272 18.7118 19.984 19.0118 19.66L19.3358 19.336C19.7318 18.928 19.9298 18.487 19.9298 18.013C19.9298 17.539 19.7318 17.104 19.3358 16.708L18.2918 15.664C18.1358 15.508 18.0218 15.388 17.9498 15.304L17.7698 15.124C17.5418 14.884 17.3618 14.71 17.2298 14.602C16.8578 14.23 16.4378 14.044 15.9698 14.044C15.5018 14.044 15.0698 14.23 14.6738 14.602H14.6558L13.3598 15.916C12.8798 16.396 12.6098 16.984 12.5498 17.68C12.4658 18.484 12.6278 19.42 13.0358 20.488C13.3358 21.316 13.7228 22.126 14.1968 22.918C14.6708 23.71 15.2498 24.52 15.9338 25.348C17.6138 27.34 19.5998 28.894 21.8918 30.01C23.1278 30.598 24.2438 30.928 25.2398 31H25.4738C26.3618 31 27.0938 30.688 27.6698 30.064V30.046C27.7778 29.914 27.9518 29.728 28.1918 29.488L28.3358 29.344C28.4918 29.212 28.6598 29.05 28.8398 28.858C29.2238 28.45 29.4158 28.006 29.4158 27.526C29.4158 27.046 29.2178 26.62 28.8218 26.248L26.7338 24.142ZM28.1018 28.156C28.0418 28.228 27.9398 28.33 27.7958 28.462L27.6338 28.624C27.3578 28.876 27.1118 29.128 26.8958 29.38C26.5358 29.776 26.0618 29.974 25.4738 29.974H25.2938C24.4178 29.914 23.4338 29.62 22.3418 29.092C20.1698 28.036 18.2978 26.572 16.7258 24.7C16.0778 23.92 15.5318 23.161 15.0878 22.423C14.6438 21.685 14.2778 20.926 13.9898 20.146C13.8098 19.654 13.6868 19.219 13.6208 18.841C13.5548 18.463 13.5398 18.1 13.5758 17.752C13.6118 17.296 13.7858 16.924 14.0978 16.636L15.3938 15.34C15.5738 15.16 15.7628 15.07 15.9608 15.07C16.1588 15.07 16.3478 15.16 16.5278 15.34C16.6358 15.436 16.7858 15.586 16.9778 15.79L17.3378 16.15C17.4458 16.246 17.5238 16.324 17.5718 16.384L18.6158 17.428C19.0118 17.812 19.0118 18.202 18.6158 18.598C18.5438 18.682 18.4358 18.796 18.2918 18.94C17.8718 19.36 17.5538 19.666 17.3378 19.858L17.3198 19.876C17.0798 20.116 17.0138 20.404 17.1218 20.74V20.776C17.3858 21.4 17.7998 22.066 18.3638 22.774C19.4078 24.07 20.5298 25.096 21.7298 25.852L22.3058 26.158C22.4378 26.218 22.5278 26.266 22.5758 26.302L22.6298 26.338C22.7738 26.398 22.8938 26.428 22.9898 26.428C23.2058 26.428 23.4038 26.338 23.5838 26.158L24.8798 24.862C25.0718 24.67 25.2578 24.574 25.4378 24.574C25.6178 24.574 25.8038 24.67 25.9958 24.862L28.1018 26.968C28.4858 27.34 28.4858 27.736 28.1018 28.156ZM22.2338 17.284C23.2538 17.452 24.1268 17.899 24.8528 18.625C25.5788 19.351 26.0378 20.23 26.2298 21.262C26.2418 21.382 26.2958 21.484 26.3918 21.568C26.4878 21.652 26.6018 21.694 26.7338 21.694L26.8238 21.676C26.9558 21.652 27.0638 21.583 27.1478 21.469C27.2318 21.355 27.2618 21.226 27.2378 21.082C27.1418 20.482 26.9528 19.912 26.6708 19.372C26.3888 18.832 26.0318 18.346 25.5998 17.914C25.1678 17.482 24.6788 17.125 24.1328 16.843C23.5868 16.561 23.0138 16.372 22.4138 16.276C22.2818 16.252 22.1558 16.279 22.0358 16.357C21.9158 16.435 21.8438 16.546 21.8198 16.69C21.7958 16.834 21.8228 16.963 21.9008 17.077C21.9788 17.191 22.0898 17.26 22.2338 17.284ZM30.4958 20.938C30.3278 19.942 30.0128 19.003 29.5508 18.121C29.0888 17.239 28.4978 16.438 27.7778 15.718C27.0578 14.998 26.2568 14.407 25.3748 13.945C24.4928 13.483 23.5538 13.168 22.5578 13C22.4258 12.976 22.2998 13.006 22.1798 13.09C22.0598 13.174 21.9878 13.285 21.9638 13.423C21.9398 13.561 21.9698 13.69 22.0538 13.81C22.1378 13.93 22.2518 14.002 22.3958 14.026C23.2718 14.17 24.1088 14.449 24.9068 14.863C25.7048 15.277 26.4248 15.802 27.0668 16.438C27.7088 17.074 28.2338 17.788 28.6418 18.58C29.0498 19.372 29.3318 20.212 29.4878 21.1C29.4998 21.22 29.5538 21.322 29.6498 21.406C29.7458 21.49 29.8598 21.532 29.9918 21.532H30.0818C30.2138 21.508 30.3218 21.436 30.4058 21.316C30.4898 21.196 30.5198 21.07 30.4958 20.938Z" fill="#F16521" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2301_10106">
                                    <rect width="18" height="18" fill="white" transform="matrix(1 0 0 -1 12.5 31)" />
                                </clipPath>
                            </defs>
                        </svg>

                        <div>
                            <span className="text-nowrap text-3E445A text-xl font-semibold">
                                09606 111 777
                            </span>{" "}
                            <br />
                            <span className="text-nowrap text-3E445A">
                                (9:00AM - 9:00PM)
                            </span>
                        </div>
                    </div>
                </div>
            </section> */}
            {/* <section>
                        <div className="pb-10 flex flex-col md:flex-row justify-between md:items-center">
                            <div className=" ">
                                
                                <div className="flex justify-start items-center gap-5 md:ml-auto mt-10 md:mt-0">
                                    <div>
                                        <span className="font-semibold text-white">Find us on: </span>{" "}
                                        <br />
                                    </div>
                                    
                                </div>
                            </div>
                            <div className=" ">
                                <div className="flex justify-start items-center gap-2">
                                    <Image
                                        src={callIcon}
                                        className="w-12 h-12"
                                        alt="Best Electronics"
                                    />
                                    <div>
                                        <span className="text-nowrap text-white text-xl font-semibold">
                                            09606 111 777
                                        </span>{" "}
                                        <br />
                                        <span className="text-nowrap text-gray-200">
                                            Drooto Helpline (9:00AM - 9:00PM)
                                        </span>
                                    </div>
                                </div>
                                <div className="flex justify-start items-center gap-5 md:ml-auto mt-10 md:mt-0">
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
                        </div>
                    </section> */}

            {/* </div> */}
        </footer>
    );
}
