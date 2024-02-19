"user client";

import type { Metadata } from "next";
import DashboardLayoutProvider from "./DashboardLayoutProvider";
import { AuthProvider } from "@/context/authContext";

export const metadata: Metadata = {
  title: {
    default: "Wokr",
    template: "%s | Dashboard",
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
      <DashboardLayoutProvider>{children}</DashboardLayoutProvider>
    </AuthProvider>
  );
}
