"use client";

import { useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import Link from "next/link";
import { HiMenuAlt1, HiOutlinePlusCircle, HiOutlineX } from "react-icons/hi";

import RegisterModal from "../modal/RegisterModal";
import LoginModal from "../modal/LoginModal";
import Image from "next/image";
import logo from "../../public/images/wokri_logo.png";

const homeMenu = [
  {
    id: 1,
    url: "/how-it-works",
    title: "How It Works",
  },
  {
    id: 2,
    url: "/become-a-professional",
    title: "Pro",
  },
  {
    id: 3,
    url: "/hire-a-professional",
    title: "Hire",
  },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [reveal, setReveal] = useState(false);

  return (
    <header className="bg-transparent absolute w-full">
      <nav
        className="mx-auto flex max-w-screen-2xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Wokr Marketplace</span>
            <Image
              className="h-14 w-auto"
              height="100"
              width="100"
              src={logo}
              alt="wokr marketplace logo"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <HiMenuAlt1 className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          {homeMenu.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className="text-base font-normal leading-6 text-gray-900"
            >
              {item.title}
            </Link>
          ))}
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center gap-x-5">
          <button
            onClick={() => setReveal(!reveal)}
            className="text-base font-pangram-normal leading-6 text-gray-900 border border-gray-950 bg-transparent py-2 px-5 flex justify-center items-center gap-x-3 rounded-lg"
          >
            <span aria-hidden="true">
              <HiOutlinePlusCircle className="bg-wokr-green-100 rounded-full" />
            </span>
            Post a Job
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="text-base font-pangram-normal leading-6 text-gray-50 border border-wokr-red-100 rounded-lg bg-wokr-red-100 py-2 px-5"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Create an Account */}

      <RegisterModal setOpen={setOpen} open={open} />
      <LoginModal setOpen={setReveal} open={reveal} />

      {/* MOBILE MENU*/}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Wokr Marketplace</span>
              <Image
                className="h-12 w-auto"
                src={logo}
                alt="wokr marketplace logo"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <HiOutlineX className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {homeMenu.map((item) => (
                  <Link
                    key={item.id}
                    href={item.url}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-normal leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-lg font-pangram-bold leading-7  hover:bg-gray-50 text-wokr-red-100"
                >
                  Post a job
                </Link>
                <Link
                  href="/register"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-lg font-normal leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};
export default Header;
