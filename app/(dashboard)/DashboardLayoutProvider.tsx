"use client";

import { useState, useContext } from "react";
import { AuthContext } from "@/context/authContext";
import classNames from "classnames";
import Sidebar from "@/components/sidebar/Sidebar";
import SidebarHeader from "@/components/header/SidebarHeader";

const DashboardLayoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [collapsed, setSidebarCollapsed] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const { state } = useContext(AuthContext);
  const { user } = state;

  return (
    <div
      className={classNames({
        "grid min-h-screen": true,
        "grid-cols-sidebar": !collapsed,
        "grid-cols-sidebar-collapsed": collapsed,
        "transition-[grid-template-columns] duration-300 ease-in-out": true,
      })}
    >
      <div className="bg-gray-100 text-gray-800">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={() => setSidebarCollapsed((prev) => !prev)}
          shown={showSidebar}
          user={user ?? {}} // Provide a default value for user prop
        />
      </div>
      <main>
        <SidebarHeader
          onMenuButtonClick={() => setShowSidebar((prev) => !prev)}
        />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayoutProvider;
