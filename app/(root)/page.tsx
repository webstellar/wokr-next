import HomeHero from "@/components/hero/HomeHero";
import Services from "@/components/services/Services";
import Integrations from "@/components/integration/Integrations";
import Process from "@/components/process/Process";
import Statement from "@/components/statement/Statement";
import GetStarted from "@/components/getstarted/GetStarted";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <Services />
      <Integrations />
      <Process />
      <div className="bg-wokr-red-50">
        <Statement />
        <GetStarted />
      </div>
    </main>
  );
}
