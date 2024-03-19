import Image from "next/image";
import { newJobData, toolData } from "@/types/types";
import Link from "next/link";
import { HiMiniStar } from "react-icons/hi2";
import { useRouter } from "next/navigation";

interface jobProps {
  data: newJobData;
}

const icons: toolData[] = [
  {
    name: "not-available",
    icon: "/tools/default.svg",
  },
  {
    name: "not-available-2",
    icon: "/tools/default.svg",
  },
  {
    name: "not-available-1",
    icon: "/tools/default.svg",
  },
];

const AutomationStoreCard = ({ data }: jobProps) => {
  const router = useRouter();

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push(`/automations/${data.title}?_id=${data._id}`);
  };

  return (
    <div
      className="flex flex-col gap-y-4 justify-start bg-gray-50 pb-5 rounded-b-md cursor-pointer"
      onClick={handleClick}
    >
      <Image
        src={data?.featuredImage}
        alt={data?.title}
        width={1000}
        height={1000}
        className="rounded-t-md shadow-sm h-60 w-full object-cover object-center"
        priority
      />
      <div className="my-2 mx-4 flex flex-col gap-y-4">
        <h3 className="text-left text-gray-800 font-normal text-lg">
          {data.title}
        </h3>

        <p className="text-left text-sm leading-normal font-light">
          {data.description.substring(0, 85)}
        </p>

        <div className="flex flex-row justify-between items-center md:divide-x">
          <div className="flex flex-col item-center justify-between gap-y-4">
            <div className="relative flex flex-row justify-start items-center">
              <Image
                src={data?.user?.profileImage}
                alt={data?.user?.firstName}
                height="100"
                className="rounded-full w-8 h-8"
                width="100"
              />
              <Image
                src="/images/check-sign.svg"
                alt="verified"
                className="rounded-full w-3 h-3 absolute bottom-2 left-6"
                height="20"
                width="20"
              />

              <div className="text-gray-900 capitalize px-2">
                <Link
                  href={`/in/${data?.user?._id}`}
                  className="cursor-pointer flex flex-col"
                >
                  <span className="text-sm">{data?.user?.firstName}</span>
                  <span className="text-[0.75rem] font-light">
                    @{data?.user?.username}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex gap-x-2 px-1">
            <HiMiniStar className="text-gray-800" />
            <span className="text-xs text-gray-700">5.0</span>
            <span className="text-xs text-gray-300">(100)</span>
          </div>

          <div className="flex gap-x-2 pl-2">
            <span className="text-xs text-gray-700">From $100</span>
          </div>
        </div>

        <div className="flex justify-end items-center relative">
          {data?.toolIcons
            ? data.toolIcons.map((icon: toolData, i: any) => (
                <Image
                  key={i}
                  src={icon?.icon}
                  alt={icon?.name}
                  width={50}
                  height={50}
                  className="rounded-full shadow-md h-10 w-10 p-2"
                />
              ))
            : icons.map((icon: toolData, i: number) => (
                <Image
                  key={i}
                  src={icon?.icon}
                  alt={icon?.name}
                  width={50}
                  height={50}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default AutomationStoreCard;
