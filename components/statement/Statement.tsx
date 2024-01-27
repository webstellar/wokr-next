import Link from "next/link";

import Logo from "../../public/images/wokri_logo.png";
import statementImage from "../../public/images/wokrPro.png";
import Image from "next/image";

const Statement = () => {
  return (
    <div className="mx-auto flex flex-col lg:flex-row max-w-screen-2xl items-center justify-between lg:px-20 p-8 py-20 lg:p-20 gap-y-10">
      <div className="h-full w-full">
        <Image src={statementImage} alt="woman standing" />
      </div>
      <div className="flex flex-col items-start gap-10">
        <Image src={Logo} alt="wokr official logo" />
        <h3 className="font-pangram-medium text-3xl md:text-4xl text-left">
          Advance solutions and professional talent for businesses
        </h3>

        <div className="flex flex-row justify-start items-start gap-x-2">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M37.5482 16.4902L35.7642 14.7042C35.2075 14.1451 34.8935 13.3892 34.8902 12.6002V10.0722C34.8881 8.75737 34.3648 7.497 33.4351 6.56728C32.5054 5.63755 31.245 5.11431 29.9302 5.11219H27.4002C26.6109 5.10833 25.855 4.79359 25.2962 4.23619L23.5102 2.45219C22.5787 1.52229 21.3164 1 20.0002 1C18.684 1 17.4216 1.52229 16.4902 2.45219L14.7042 4.23619C14.1451 4.79286 13.3892 5.10686 12.6002 5.11019H10.0722C8.75702 5.11231 7.49635 5.63583 6.56657 6.56598C5.63679 7.49614 5.11378 8.75702 5.11219 10.0722V12.6002C5.10833 13.3895 4.79359 14.1454 4.23619 14.7042L2.45219 16.4902C1.52229 17.4216 1 18.684 1 20.0002C1 21.3164 1.52229 22.5787 2.45219 23.5102L4.23619 25.2962C4.79286 25.8553 5.10686 26.6112 5.11019 27.4002V29.9282C5.11178 31.2437 5.63507 32.5049 6.56528 33.4351C7.49549 34.3653 8.75667 34.8886 10.0722 34.8902H12.6002C13.3892 34.8935 14.1451 35.2075 14.7042 35.7642L16.4902 37.5482C17.4216 38.4781 18.684 39.0004 20.0002 39.0004C21.3164 39.0004 22.5787 38.4781 23.5102 37.5482L25.2962 35.7642C25.8553 35.2075 26.6112 34.8935 27.4002 34.8902H29.9282C31.2434 34.8886 32.5042 34.3656 33.4344 33.4358C34.3645 32.506 34.8881 31.2454 34.8902 29.9302V27.4002C34.8935 26.6112 35.2075 25.8553 35.7642 25.2962L37.5482 23.5102C38.4781 22.5787 39.0004 21.3164 39.0004 20.0002C39.0004 18.684 38.4781 17.4216 37.5482 16.4902Z"
              fill="#D03D5A"
            />
            <path
              d="M16.0002 25.9998C15.4698 25.9997 14.9611 25.7889 14.5862 25.4138L10.5862 21.4138C10.3951 21.2293 10.2428 21.0086 10.138 20.7646C10.0331 20.5206 9.97797 20.2581 9.97566 19.9926C9.97335 19.727 10.024 19.4637 10.1245 19.2179C10.2251 18.9721 10.3736 18.7488 10.5614 18.561C10.7492 18.3732 10.9725 18.2247 11.2183 18.1241C11.464 18.0236 11.7274 17.973 11.993 17.9753C12.2585 17.9776 12.521 18.0327 12.765 18.1376C13.009 18.2424 13.2297 18.3947 13.4142 18.5858L16.2542 21.4258L26.8902 14.3358C27.3315 14.0414 27.8717 13.9344 28.3919 14.0383C28.9121 14.1421 29.3698 14.4484 29.6642 14.8898C29.9586 15.3311 30.0656 15.8713 29.9617 16.3915C29.8578 16.9117 29.5515 17.3694 29.1102 17.6638L17.1102 25.6638C16.7815 25.8829 16.3952 25.9999 16.0002 25.9998Z"
              fill="white"
            />
          </svg>
          <div className="flex flex-col items-start w-2/4 justify-stretch gap-y-4">
            <h4 className="text-2xl">Wokr Pro</h4>
            <p className="text-base font-pangram-light text-left text-gray-400">
              Access top freelancers and professional business tools for any
              project
            </p>
          </div>
        </div>

        <button
          title="button"
          type="button"
          className="rounded-lg border border-wokr-red-100 bg-transparent hover:bg-wokr-red-100 md:px-10 md:py-4 py-2 px-6 text-gray-950 hover:text-gray-50"
        >
          <Link
            href="/listing"
            className="text-lg md:text-2xl font-pangram-medium"
          >
            Learn more
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Statement;
