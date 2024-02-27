import { jobData } from "@/types/types";
import { HiOutlineFlag, HiOutlineStar } from "react-icons/hi";

interface jobProps {
  data: jobData;
}

const AutomationPriceCard: React.FC<jobProps> = ({ data }) => {
  return (
    <div className="rounded-xl border flex flex-col justify-center items-center gap-y-5 py-8 px-10">
      <span className="uppercase text-xs md:text-sm tracking-wider ">
        Starting at
      </span>

      <span className="text-base md:text-2xl font-medium">${data?.price}</span>

      <button
        type="button"
        className="w-full bg-wokr-red-200 capitalize text-white md:text-lg text-base py-2 rounded-md"
      >
        Buy now
      </button>
      <button
        type="button"
        className="w-full bg-gray-100 capitalize text-gray-500 md:text-lg text-base py-2 rounded-md"
      >
        Send message
      </button>

      <button
        type="button"
        className="flex flex-row justify-center items-center w-full bg-transparent text-gray-500 md:text-base text-xs gap-x-2"
      >
        <HiOutlineStar />
        Write a Review
      </button>
      <button
        type="button"
        className="w-full flex flex-row justify-center items-center capitalize text-gray-500 md:text-base text-xs gap-x-2"
      >
        <HiOutlineFlag />
        Reporting listing
      </button>
    </div>
  );
};

export default AutomationPriceCard;
