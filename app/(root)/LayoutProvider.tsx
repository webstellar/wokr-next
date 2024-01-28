"use client";

import React from "react";
import Header from "@/components/header/Header";
import LoggedInHeader from "@/components/header/LoggedInHeader";
import LoggedInFooter from "@/components/footer/LoggedInFooter";
import Footer from "@/components/footer/Footer";
import { useContext } from "react";
import { AuthContext, AuthProvider } from "@/context/authContext";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const { state } = useContext(AuthContext);
  const { user } = state;
  console.log(state);

  return (
    <AuthProvider>
      {user ? <LoggedInHeader /> : <Header />}
      {children}
      {user ? <LoggedInFooter /> : <Footer />}
    </AuthProvider>
  );
};

export default LayoutProvider;
