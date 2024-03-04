import HomeHero from "@/components/landingpage/hero/HomeHero";
import Services from "@/components/landingpage/services/Services";
import Integrations from "@/components/landingpage/integration/Integrations";
import Process from "@/components/landingpage/process/Process";
import Statement from "@/components/landingpage/statement/Statement";
import GetStarted from "@/components/landingpage/getstarted/GetStarted";

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
