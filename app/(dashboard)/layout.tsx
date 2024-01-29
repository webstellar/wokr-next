"user client";

import type { Metadata } from "next";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import localFont from "next/font/local";
import DashboardLayoutProvider from "./DashboardLayoutProvider";
import { AuthProvider } from "@/context/authContext";

const pangram = localFont({
  src: [
    { path: "../../public/fonts/Pangram-ExtraLight.otf", weight: "100" },
    { path: "../../public/fonts/Pangram-Light.otf", weight: "300" },
    { path: "../../public/fonts/Pangram-Regular.otf", weight: "400" },
    { path: "../../public/fonts/Pangram-Medium.otf", weight: "500" },
    { path: "../../public/fonts/Pangram-Bold.otf", weight: "700" },
    { path: "../../public/fonts/Pangram-ExtraBold.otf", weight: "800" },
    { path: "../../public/fonts/Pangram-Black.otf", weight: "900" },
  ],
  variable: "--font-pangram",
});

export const metadata: Metadata = {
  title: {
    default: "Wokr Marketplace",
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
      <ReCaptchaProvider reCaptchaKey={process.env.RECAPTCHA_SITE_KEY}>
        <html lang="en">
          <body
            className={`${pangram.variable} font-sans ${pangram.className}`}
          >
            <DashboardLayoutProvider>{children}</DashboardLayoutProvider>
            <ToastContainer />
          </body>
        </html>
      </ReCaptchaProvider>
    </AuthProvider>
  );
}
