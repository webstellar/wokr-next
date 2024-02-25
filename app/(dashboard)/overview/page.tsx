"use client";

import InboxCard from "@/components/inbox/InboxCard";
import ActiveOrder from "@/components/order/ActiveOrder";
import DashboardProfileCard from "@/components/profileCard/DashboardProfileCard";
import { useUserQuery } from "@/hooks/useUserQuery";

const DashboardHome = () => {
  const { data: user } = useUserQuery();

  return (
    <section className="mx-auto mb-20">
      <div className="mx-auto grid md:grid-cols-3 justify-between items-start gap-10 max-w-screen-2xl px-6 lg:px-8">
        <div className="md:col-span-2 mt-10 flex flex-col gap-y-5">
          <ActiveOrder />
        </div>
        <div className="mt-10 flex flex-col gap-y-5">
          <DashboardProfileCard data={user} />
          <InboxCard />
        </div>
      </div>
    </section>
  );
};

export default DashboardHome;
