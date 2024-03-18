import Image from "next/image";
import { ProcessBlurb } from "../../../types/types";

interface processProps {
  data: ProcessBlurb;
}

const ProcessCard: React.FC<processProps> = ({ data }) => {
  return (
    <div className="flex flex-col items-center gap-y-4 justify-around p-10">
      {data.icon && (
        <Image
          alt={data.title}
          src={data.icon}
          className="h-full"
          width={100}
          height={100}
        />
      )}
      <h4 className="font-pangram-medium text-lg text-center">{data.title}</h4>

      <p className="font-pangram-light text-center">{data.description}</p>
    </div>
  );
};

export default ProcessCard;
