import Link from "next/link";
import { HiOutlineSearch } from "react-icons/hi";
import HeroImage from "/images/heroImage.png";

import { Categories } from "../../../data/data";
import Image from "next/image";

const HomeHero = () => {
  return (
    <section className="bg-wokr-red-50 h-screen lg:h-[120vh] mx-auto flex justify-around items-center">
      <div className="grid md:grid-cols-2 justify-start items-center mx-auto max-w-screen-2xl px-6 lg:px-8">
        <div className="flex flex-col justify-start items-start gap-y-10">
          <h3 className="font-pangram-medium text-4xl md:text-6xl">
            Find your ideal freelance job, powered by AI.
          </h3>

          <form>
            <div className="relative mx-auto w-full">
              <input
                className="border border-gray-900 bg-transparent h-10 w-[80vw] lg:w-[40rem] px-5 pr-16 rounded-lg text-sm focus:outline-none py-8"
                type="search"
                name="search"
                placeholder="Search Job Title or Category"
              />
              <button
                id="email"
                title="email"
                type="submit"
                className="absolute right-0 top-0 mt-[0.34rem] mr-2  bg-wokr-red-100 text-gray-50 rounded-lg flex justify-center items-center gap-x-3 py-4 px-6"
              >
                <span aria-hidden="true">
                  <HiOutlineSearch />
                </span>
                Search
              </button>
            </div>
          </form>

          <div className="flex flex-wrap lg:flex-nowrap justify-start items-center gap-y-4 gap-x-2">
            <span>Popular:</span>
            <div className="grid grid-cols-2 md:grid-cols-4 justify-around items-center gap-2">
              {Categories.map((category) => (
                <Link
                  key={category.id}
                  href={category.url}
                  className="mr-1 border rounded-full border-wokr-red-100 py-2 px-4 text-center text-sm"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:flex justify-end items-center">
          <Image
            src="/images/heroImage.png"
            alt=""
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
