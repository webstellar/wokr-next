import { processes } from "../../data/data";
import ProcessCard from "./ProcessCard";

const Process = () => {
  return (
    <div className="-mt-30 mx-auto flex flex-col gap-10 max-w-screen-2xl items-center justify-between lg:px-20 bg-white p-8 lg:p-20 lg:rounded-3xl border shadow-md">
      <h3 className="font-pangram-medium text-4xl text-center">
        How does it work
      </h3>
      <p className="max-w-6xl font-pangram-light text-base text-center">
        where we transform your current content into diverse formats and tailor
        it for multiple platforms. Reach a wider audience, enhance content
        value, and elevate your brand's impact.
      </p>

      <div className="mt-5 flex flex-col lg:flex-row max-w-7xl gap-x-10">
        {processes.map((process) => (
          <ProcessCard key={process.id} data={process} />
        ))}
      </div>
    </div>
  );
};

export default Process;
