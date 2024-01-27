"use client";

import React from "react";
import Header from "@/components/header/Header";
import LoggedInHeader from "@/components/header/LoggedInHeader";
import LoggedInFooter from "@/components/footer/LoggedInFooter";
import Footer from "@/components/footer/Footer";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "@/context/authContext";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { state } = useContext(AuthContext);
  const { user } = state;

  console.log(user);

  return (
    <AuthProvider>
      {pathname !== "/complete-registration" && user ? (
        <LoggedInHeader />
      ) : (
        <Header />
      )}
      {children}
      {pathname !== "/complete-registration" && user ? (
        <LoggedInFooter />
      ) : (
        <Footer />
      )}
    </AuthProvider>
  );
};

export default LayoutProvider;
