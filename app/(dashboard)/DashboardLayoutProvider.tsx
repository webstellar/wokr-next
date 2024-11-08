"use client";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/context/authContext";
import classNames from "classnames";
import Sidebar from "@/components/sidebar/Sidebar";
import SidebarHeader from "@/components/header/SidebarHeader";
import Spinner from "@/components/spinner/Spinner";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import { useUserQuery } from "@/hooks/useUserQuery";

const DashboardLayoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [collapsed, setSidebarCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const { state } = useContext(AuthContext);
  const { user, isAuthenticating } = state;

  const { data } = useUserQuery();

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    };
    checkAuthentication();
  }, [user]);

  if (isAuthenticating) {
    return <Spinner />;
  }

  return (
    <>
      {user ? (
        <div
          className={classNames({
            "grid min-h-screen": true,
            "grid-cols-sidebar": !collapsed,
            "grid-cols-sidebar-collapsed": collapsed,
            "transition-[grid-template-columns] duration-300 ease-in-out": true,
            "grid-cols-sidebar-collapsed-mobile": !showSidebar,
            "grid-cols-sidebar-collapsed-mobile md:grid-cols-sidebar":
              !showSidebar && !collapsed,
            "grid-cols-sidebar-collapsed-mobile md:grid-cols-sidebar-collapsed":
              !showSidebar && collapsed,
          })}
        >
          <div
            className={classNames({
              "bg-gray-100 text-gray-800": true,
            })}
          >
            <Sidebar
              collapsed={collapsed}
              setCollapsed={() => setSidebarCollapsed((prev) => !prev)}
              shown={showSidebar}
              user={data ?? {}}
            />
          </div>
          <main>
            <SidebarHeader
              user={data ?? {}}
              onMenuButtonClick={() => setShowSidebar((prev) => !prev)}
            />
            {children}
          </main>
        </div>
      ) : (
        <ProtectedRoute
          error="403"
          title="We are Sorry..."
          description="The page you're trying to access has restricted access."
          url="/login"
          urlText="Login to access page"
        />
      )}
    </>
  );
};

export default DashboardLayoutProvider;
