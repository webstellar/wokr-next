"use client";

import Link from "next/link";
import lineLogo from "../../public/images/Wokr_line.png";
import Socials from "../landingpage/socials/Socials";

import { HiArrowNarrowRight } from "react-icons/hi";
import Image from "next/image";

const myStyle = {
  backgroundImage: `url(${lineLogo})`,
  backgroundSize: "90%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "50% 200%",
};

const Footer = () => {
  const d = new Date();
  const year = d.getFullYear();

  return (
    <footer className="bg-white my-12">
      <section
        className="mx-auto flex flex-grow flex-wrap max-w-screen-2xl items-center justify-between p-6 lg:px-8 lg:gap-0 gap-y-8 md:gap-y-20"
        style={myStyle}
        aria-label="Global"
      >
        {/* Column 1*/}
        <div className="flex flex-col basis-full lg:basis-1/4">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Wokr Marketplace</span>
            <Image
              className="h-14 w-auto"
              src="/images/wokri_logo.png"
              alt="wokr marketplace logo"
              width={300}
              height={300}
              priority
            />
          </Link>

          <p className="text-base">&#169; Wokr International Ltd, {year}</p>
          <p className="mt-10 text-sm md:text-base">Follow Us:</p>
          <Socials />
        </div>

        <div className="hidden lg:flex items-center justify-start md:justify-center lg:basis-1/2">
          <Image
            className="w-auto"
            src="/images/wokr_glass_logo.png"
            alt="wokr marketplace logo"
            width={300}
            height={300}
          />
        </div>

        <div className="flex flex-col gap-y-2 md:gap-y-5 basis-full lg:basis-1/4">
          <h3 className="md:text-3xl lg:text-4xl">
            Stay updated On The Latest Wokr News
          </h3>
          <p className="font-pangram-light text-sm md:text-base">
            Add Your Email Below To Keep Up With the Latest Announcements
          </p>

          <div className="text-sm md:text-base pt-2 relative mx-auto text-gray-600 w-full">
            <input
              className="font-pangram-light border-0 border-b-2 rounded-none w-full ring-transparent"
              type="email"
              name="email"
              placeholder="Email Address"
            />
            <button
              title="submit"
              type="submit"
              className="absolute right-0 top-0 mt-3 mr-4"
            >
              <HiArrowNarrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
