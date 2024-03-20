const message = [
  {
    client: "Client 1",
    message: "Me: Hello Ma'am/Sir",
    time: "3 hours ago",
    color: "#D03D5A",
  },
  {
    client: "Client 2",
    message: "Me: Hello Ma'am/Sir",
    time: "3 hours ago",
    color: "#55C1AC",
  },
];

const InboxCard = () => {
  return (
    <div className="rounded-3xl bg-gray-50 flex flex-col gap-y-5 gap-x-10 py-10 px-10 divide-y">
      <div className="flex flex-row justify-between items-center">
        <span className="text-2xl font-bold">Inbox</span>
        <span className="text-sm text-wokr-red-100">View All</span>
      </div>

      <div className="flex flex-col justify-between items-center gap-y-5 divide-y">
        {message.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:justify-between md:items-center w-full pt-4 gap-y-4 md:gap-y-0 items-start"
          >
            <div className="flex flex-row justify-start items-center gap-x-3">
              <svg
                width={55}
                height={55}
                viewBox="0 0 55 55"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={27.5} cy={27.5} r={27.5} fill={item.color} />
              </svg>

              <div className="flex flex-col items-start justify-start">
                <span className="font-medium tex-lg">{item.client}</span>
                <span className="text-sm text-gray-500">{item.message}</span>
              </div>
            </div>

            <div className="flex flex-row items-center justify-end gap-x-2">
              <span className="text-sm text-gray-500">{item.time}</span>
              <svg
                width={21}
                height={20}
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1233_2318)">
                  <path
                    d="M11.479 1.712l2.367 4.8a.532.532 0 00.4.292l5.294.77a.534.534 0 01.3.91l-3.83 3.734a.534.534 0 00-.154.473l.9 5.272a.535.535 0 01-.775.563l-4.734-2.49a.536.536 0 00-.5 0l-4.73 2.487a.535.535 0 01-.775-.563l.9-5.272a.534.534 0 00-.154-.473L2.158 8.48a.534.534 0 01.3-.91l5.294-.77a.532.532 0 00.4-.293l2.367-4.8a.534.534 0 01.96.004v.001z"
                    stroke="#D9D9D9"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1233_2318">
                    <path fill="#fff" d="M0 0H21V20H0z" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        ))}

        <span className="text-sm text-gray-500">No messages yet</span>
      </div>
    </div>
  );
};

export default InboxCard;
