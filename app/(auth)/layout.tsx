"user client";

import type { Metadata } from "next";
import { AuthProvider } from "@/context/authContext";
import LayoutProvider from "./LayoutProvider";

export const metadata: Metadata = {
  title: {
    default: "Wokr Marketplace",
    template: "%s | Registration",
  },
  description: "Wokr marketplace for finding automations and AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <LayoutProvider>{children}</LayoutProvider>
    </AuthProvider>
  );
}
