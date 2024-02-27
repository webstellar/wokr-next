import { userData } from "@/types/types";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const JobProfileCard = ({ user }: any) => {
  return (
    <div className="bg-gray-100 rounded-2xl flex flex-col md:flex-row justify-between items-center w-full p-8 gap-x-10 gap-y-5">
      <div className="flex flex-col items-center justify-center gap-y-2">
        <Image
          src={user?.profileImage}
          alt={user?.username}
          width={100}
          height={100}
          className="rounded-full w-20 h-20 md:w-30 md:h-30"
        />
        <div className="-mt-8 ml-12">
          <svg
            width={25}
            height={25}
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1233_2416)">
              <path
                d="M32.854 14.429l-1.56-1.563a2.625 2.625 0 01-.765-1.84V8.812a4.347 4.347 0 00-4.34-4.34h-2.214a2.625 2.625 0 01-1.841-.766L20.57 2.146a4.347 4.347 0 00-6.142 0l-1.563 1.56c-.49.488-1.15.762-1.841.765H8.813a4.347 4.347 0 00-4.34 4.342v2.212a2.625 2.625 0 01-.767 1.841l-1.56 1.563a4.347 4.347 0 000 6.142l1.56 1.563c.488.49.762 1.15.765 1.841v2.212a4.347 4.347 0 004.342 4.342h2.212c.69.003 1.352.278 1.84.765l1.564 1.56a4.347 4.347 0 006.142 0l1.563-1.56a2.625 2.625 0 011.84-.765h2.213a4.347 4.347 0 004.342-4.34v-2.214c.003-.69.277-1.352.764-1.84l1.561-1.564a4.347 4.347 0 000-6.142z"
                fill="#D03D5A"
              />
              <path
                d="M14 22.75a1.75 1.75 0 01-1.237-.512l-3.5-3.5a1.751 1.751 0 112.474-2.475l2.485 2.485 9.307-6.204a1.75 1.75 0 111.942 2.912l-10.5 7a1.75 1.75 0 01-.971.294z"
                fill="#fff"
              />
            </g>
            <defs>
              <clipPath id="clip0_1233_2416">
                <path fill="#fff" d="M0 0H35V35H0z" />
              </clipPath>
            </defs>
          </svg>
        </div>

        <span className="capitalize">{user?.username}</span>
        <span className="text-xs font-light tracking-wide">Active Now</span>
      </div>

      <div className="flex flex-col justify-between">
        <div className="font-light text-xs md:text-sm leading-relaxed mb-4 md:text-left text-center">
          {user?.description}
        </div>

        <div className="flex flex-row justify-between items-center pt-2 border-t border-t-gray-300">
          <span className="font-light text-sm">$25/hr</span>

          <button
            type="button"
            className="font-light text-sm cursor-pointer flex flex-row gap-x-1"
          >
            <Link href="">Follow</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobProfileCard;
