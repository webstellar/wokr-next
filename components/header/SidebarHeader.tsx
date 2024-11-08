import { Fragment, useContext } from "react";
import { Popover, Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../../context/authContext";
import {
  HiMenuAlt1,
  HiOutlineBell,
  HiOutlineChevronDown,
  HiUser,
} from "react-icons/hi";

//data
import { profileLinks, settinglinks } from "../../data/data";
import Image from "next/image";
import { Suspense } from "react";
import Search from "../search/Search";

type userProfile = {
  [key: string]: string;
};

type Props = {
  onMenuButtonClick(): void;
  user: userProfile;
};

const SidebarHeader = (props: Props) => {
  const { dispatch } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();
  const auth = getAuth();

  const logOut = () => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: "LOGGED_OUT",
          payload: null,
        });
        router.push("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const currentUrl = "/";

  return (
    <header
      className={`${
        pathname == currentUrl ? "absolute" : "'"
      } bg-gray-50 w-full`}
    >
      <nav
        className="mx-auto flex max-w-screen-2xl items-center justify-end md:justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={props.onMenuButtonClick}
          >
            <span className="sr-only">Open main menu</span>
            <HiMenuAlt1 className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Suspense>
          <Search />
        </Suspense>

        <Popover.Group className="hidden lg:flex lg:gap-x-6 justify-center items-center">
          <HiOutlineBell className="text-2xl text-gray-500" />

          {props.user && (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center items-center px-4 py-2 w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                  <Link href="/overview">
                    {props.user?.profileImage ? (
                      <Image
                        src={props?.user?.profileImage}
                        alt={props?.user?.firstName}
                        width={100}
                        height={100}
                        className="rounded-full w-8 h-8 object-cover object-center cursor-pointer"
                      />
                    ) : (
                      <HiUser className="text-2xl text-gray-500" />
                    )}
                  </Link>
                  <HiOutlineChevronDown
                    className="-mr-1 ml-2 h-5 w-5 text-wokr-red-100 hover:text-wokr-red-200"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="px-1 py-1">
                    {profileLinks.map((link, i) => (
                      <Menu.Item key={i}>
                        {({ active }) => (
                          <Link href={link.href} className="flex">
                            <button
                              type="button"
                              className={`${
                                active
                                  ? "bg-wokr-red-100 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {link.label}
                            </button>
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </div>

                  <div className="px-1 py-1">
                    {settinglinks.map((link, i) => (
                      <Menu.Item key={i}>
                        {({ active }) => (
                          <Link href={link.href} className="flex">
                            <button
                              type="button"
                              className={`${
                                active
                                  ? "bg-wokr-red-100 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {link.label}
                            </button>
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </div>

                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={logOut}
                          id="logout"
                          title="logout"
                          className={`${
                            active
                              ? "bg-wokr-red-100 text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </Popover.Group>
      </nav>
    </header>
  );
};
export default SidebarHeader;
