import Image from "next/image";
import { ProcessBlurb } from "../../types/types";

interface processProps {
  data: ProcessBlurb;
}

const ProcessCard: React.FC<processProps> = ({ data }) => {
  return (
    <div className="flex flex-col items-center gap-y-4 justify-around p-10">
      <Image alt={data.title} src={data.src} className="h-full" />

      <h4 className="font-pangram-medium text-lg text-center">{data.title}</h4>

      <p className="font-pangram-light text-center">{data.description}</p>
    </div>
  );
};

export default ProcessCard;
