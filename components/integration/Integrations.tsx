import { allIntegrations } from "../../data/data";
import IntegrationCard from "./IntegrationCard";

const Integrations = () => {
  return (
    <section className="h-auto py-20 lg:h-screen w-full bg-transparent mx-auto flex flex-col gap-y-20 justify-center items-center max-w-screen-2xl">
      <h3 className="font-pangram-medium text-4xl text-center">
        AI Integrations
      </h3>

      <div className="flex flex-col md:flex-row mx-auto max-w-6xl justify-around items-center gap-x-5 gap-y-10">
        {allIntegrations &&
          allIntegrations.map((integration) => (
            <IntegrationCard key={integration.id} data={integration} />
          ))}
      </div>
    </section>
  );
};

export default Integrations;
