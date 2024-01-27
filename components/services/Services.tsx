import { offerings } from "../../data/data";

const Services = () => {
  return (
    <section className="bg-transparent">
      <div className="-mt-40 mx-auto flex max-w-screen-2xl items-center justify-between lg:px-20 bg-white p-8 lg:p-20 lg:rounded-3xl border lg:shadow-md shadow-none">
        <div className="flex flex-wrap lg:flex-nowrap gap-4 justify-around items-start gap-y-10 py-20">
          <div className="flex mt-4">
            <h3 className="font-pangram-medium text-4xl text-left">
              Explore the possibilities of automation.
            </h3>
          </div>

          <div className="grid md:grid-cols-2 items-end justify-around gap-y-6 gap-x-6">
            {offerings.map((offer) => (
              <div
                key={offer.id}
                className="flex h-[25vh] flex-col justify-end items-stretch  border border-gray-600 rounded-xl hover:bg-wokr-red-200 hover:text-gray-50 px-10 py-10 gap-y-3"
              >
                <h4 className="text-xl font-pangram-normal">{offer.title}</h4>
                <p className="text-sm font-pangram-light">
                  {offer.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
