import Image from "next/image";
import { jobData } from "@/types/types";

interface jobProps {
  data: jobData;
}

const AutomationStoreCard = ({ data }: jobProps) => {
  return (
    <div className="flex flex-col gap-y-4 items-stretch justify-between">
      <Image
        src={data?.featuredImage}
        alt={data?.title}
        width={400}
        height={400}
        className="rounded-t-md shadow-sm h-40 w-full object-cover object-center"
      />
      <div className="my-2 mx-4 flex flex-col gap-y-4">
        <h3 className="text-left text-gray-800 font-normal text-lg">
          {data.title}
        </h3>

        <p className="text-left text-sm leading-normal font-light">
          {data.description.substring(0, 85)}
        </p>
      </div>

      <div className="flex flex-row justify-center items-center md:divide-x">
        <div className="basis-full md:basis-1/2 flex flex-col item-center justify-center gap-y-4"></div>
      </div>
    </div>
  );
};

export default AutomationStoreCard;
