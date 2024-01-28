import Image from "next/image";
import { IntegrationsAi } from "../../types/types";

interface integrationProps {
  data: IntegrationsAi;
}

const IntegrationCard: React.FC<integrationProps> = ({ data }) => {
  return (
    <div className="border rounded-xl flex flex-col items-center h-[30vh] md:w-[12vw] justify-around p-10">
      <Image src={data.src} alt={data.title} className="" />
      <h5 className="font-pangram-medium text-lg">{data.title}</h5>
    </div>
  );
};

export default IntegrationCard;