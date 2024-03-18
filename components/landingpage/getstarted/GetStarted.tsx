import Image from "next/image";

const GetStarted = () => {
  return (
    <div className="h-auto lg:h-[60vh] mt-20">
      <div className="-mt-30 mx-auto flex flex-col lg:flex-row gap-10 max-w-screen-2xl items-center justify-around lg:px-20 p-8 lg:p-20 lg:rounded-3xl bg-wokr-red-200 shadow-md h-auto lg:h-[35vh]">
        <div className="flex flex-col justify-start items-start gap-y-10">
          <h3 className="font-pangram-medium text-2xl md:text-4xl text-left text-gray-50">
            Start building your dream team of top freelancers today.
          </h3>

          <button className="text-lg md:text-2xl rounded-2xl bg-white text-wokr-red-200 md:px-10 md:py-4 py-2 px-6 font-pangram-medium ">
            Get Started
          </button>
        </div>

        <div className="hidden lg:flex">
          <Image
            src="/images/woman_standing.png"
            alt="woman standing"
            className="w-full h-full"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
