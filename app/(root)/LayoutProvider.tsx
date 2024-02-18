"use client";

import React from "react";
import Header from "@/components/header/Header";
import LoggedInHeader from "@/components/header/LoggedInHeader";
import Footer from "@/components/footer/Footer";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const { state } = useContext(AuthContext);
  const { user } = state;

  return (
    <>
      {user ? <LoggedInHeader /> : <Header />}
      {children}
      <Footer />
    </>
  );
};

export default LayoutProvider;
