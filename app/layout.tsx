"user client";

import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import localFont from "next/font/local";
import { Provider } from "@/utils/Provider";

const pangram = localFont({
  src: [
    { path: "../public/fonts/Pangram-ExtraLight.otf", weight: "100" },
    { path: "../public/fonts/Pangram-Light.otf", weight: "300" },
    { path: "../public/fonts/Pangram-Regular.otf", weight: "400" },
    { path: "../public/fonts/Pangram-Medium.otf", weight: "500" },
    { path: "../public/fonts/Pangram-Bold.otf", weight: "700" },
    { path: "../public/fonts/Pangram-ExtraBold.otf", weight: "800" },
    { path: "../public/fonts/Pangram-Black.otf", weight: "900" },
  ],
  variable: "--font-pangram",
});

export const metadata: Metadata = {
  title: {
    default: "Wokr Marketplace",
    template: "%s | Automation Marketplace",
  },
  description: "Wokr marketplace for finding automations and AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" className="h-full">
        <body
          className={`${pangram.variable} font-sans ${pangram.className} h-full`}
        >
          <Provider>{children}</Provider>
          <ToastContainer />
        </body>
      </html>
    </>
  );
}
