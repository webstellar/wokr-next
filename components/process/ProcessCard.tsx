import { ProcessBlurb } from "../../types/Types";

interface processProps {
  data: ProcessBlurb;
}

const ProcessCard: React.FC<processProps> = ({ data }) => {
  return (
    <div className="flex flex-col items-center gap-y-4 justify-around p-10">
      <img alt={data.title} src={data.icon} className="h-full" />

      <h4 className="font-pangram-medium text-lg text-center">{data.title}</h4>

      <p className="font-pangram-light text-center">{data.description}</p>
    </div>
  );
};

export default ProcessCard;
