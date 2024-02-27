import { userData } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
interface userProps {
  data: userData;
}

const MiniProfileCard: React.FC<userProps> = ({ data }) => {
  return (
    <div className="rounded-3xl border flex flex-col gap-y-5 gap-x-10 py-10 px-10">
      <div className="flex flex-col gap-0 justify-center items-center">
        <Image
          src={data && data?.profileImage}
          alt={data && data?.firstName}
          height="100"
          className="rounded-full w-48 h-48"
          width="100"
        />
        <div className="bg-green-300 -mt-5 text-gray-500 text-sm uppercase py-1 px-3">
          Available
        </div>
      </div>
      <div className="flex flex-row gap-x-1 items-center justify-center">
        <span className="text-lg capitalize font-medium">{data?.username}</span>
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
      <button
        title="get in touch"
        type="button"
        className="w-auto flex gap-x-4 items-center justify-center text-center mt-4 px-2 py-3 rounded-3xl border text-gray-600 border-gray-600 hover:text-wokr-red-100 text-lg capitalize font-normal hover:border-wokr-red-100"
      >
        <svg
          width={30}
          height={27}
          viewBox="0 0 30 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 7.5h3A1.5 1.5 0 0128.5 9v10.5A1.5 1.5 0 0127 21h-3v4.5L18 21h-6m6-19.5H3A1.5 1.5 0 001.5 3v10.5A1.5 1.5 0 003 15h3v4.5l6-4.5h6a1.5 1.5 0 001.5-1.5V3A1.5 1.5 0 0018 1.5z"
            stroke="#252525"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Get In Touch
      </button>
      <button
        title="get in touch"
        type="button"
        className="w-auto flex gap-x-4 items-center justify-center text-center mt-4 px-2 py-3 rounded-3xl border text-gray-100 bg-gray-900 text-lg font-normal"
      >
        <Link href={`/in/${data?.username}`}></Link>
        View my portfolio
      </button>
    </div>
  );
};

export default MiniProfileCard;
