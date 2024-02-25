import { userData } from "@/types/types";
import Image from "next/image";
interface userProps {
  data: userData;
}

const userRate = [
  { title: "Inbox response rate", rate: "25%" },
  { title: "Inbox response time", rate: "80%" },
  { title: "Order response time", rate: "70%" },
  { title: "Delivered response time", rate: "100%" },
  { title: "Order completion", rate: "90%" },
];

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DashboardProfileCard: React.FC<userProps> = ({ data }) => {
  const d = new Date();
  let name = month[d.getMonth()];

  return (
    <div className="rounded-3xl flex flex-col gap-y-5 gap-x-10 py-10 px-10 divide-y bg-gray-50">
      <div className="flex flex-row gap-4 justify-start items-center">
        <Image
          src={data && data?.profileImage}
          alt={data && data?.firstName}
          height="100"
          className="rounded-full w-20 h-20 "
          width="100"
        />
        <div className="text-gray-900 capitalize text-lg py-1 px-3">
          {data?.username}
        </div>
      </div>

      <div>
        {userRate.map((item, index) => (
          <div
            key={index}
            className="flex flex-row items-center gap-x-3 whitespace-nowrap pt-4 justify-between"
          >
            <div className="basis-1/2">{item.title}</div>
            <div className="basis-1/4 flex w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="flex flex-col justify-center rounded-full overflow-hidden bg-green-400 text-xs text-white text-center whitespace-nowrap transition duration-500"
                style={{ width: `${item.rate}` }}
              ></div>
            </div>
            <div className="w-10 text-end">
              <span className="text-sm text-gray-800">{item.rate}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-row justify-between items-center gap-x-5 pt-4">
        Earned In {name}
        <span>$1000</span>
      </div>
    </div>
  );
};

export default DashboardProfileCard;
