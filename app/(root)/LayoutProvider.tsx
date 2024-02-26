"use client";

import React from "react";
import Header from "@/components/header/Header";
import LoggedInHeader from "@/components/header/LoggedInHeader";
import Footer from "@/components/footer/Footer";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { useUserQuery } from "@/hooks/useUserQuery";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const { state } = useContext(AuthContext);
  const { user } = state;

    const { data } = useUserQuery();

  return (
    <>
      {user ? <LoggedInHeader user={data ?? {}} /> : <Header />}
      {children}
      <Footer />
    </>
  );
};

export default LayoutProvider;
