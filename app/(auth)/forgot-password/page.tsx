"use client";
import { useState } from "react";
import { WokrButton, WokrInput } from "@/components/formfields/FormFields";
import Link from "next/link";
import { toast } from "react-toastify";
import { auth } from "@/config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmail = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const actionCodeSettings = {
      url:
        process.env.PASSWORD_FORGOT_REDIRECT || "http://localhost:3000/login",
      handleCodeInApp: true,
    };

    await sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then(() => {
        setEmail("");
        toast(`A password reset link has been sent to ${email}`, {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
          position: "bottom-right",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast(errorMessage, {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
        });
      });
  };

  return (
    <div className="relative z-10">
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg md:max-w-fit">
            <div className="flex shadow-md">
              <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white  w-[24rem] h-[32rem]">
                <div className="md:w-72 flex flex-col gap-y-3">
                  <h3 className="text-base text-center font-semibold leading-6 text-gray-900">
                    Forgot Password
                  </h3>

                  <h6 className="text-xs text-center font-medium leading-6 text-gray-900">
                    Create new password for your account here
                  </h6>

                  <form className="mt-1" onSubmit={onSubmit}>
                    <WokrInput
                      htmlFor="email"
                      inputName="email"
                      inputType="email"
                      inputPlaceholder="Enter your email"
                      disabled={false}
                      onChange={handleEmail}
                      inputValue={email}
                    />

                    <WokrButton
                      title={`send`}
                      type={`submit`}
                      disabled={!email || loading}
                      loading={loading}
                      loadingText={`Sending...`}
                      preLoadingText={`Send`}
                    />
                  </form>

                  <div className="text-center">
                    <Link
                      href="/login"
                      className="text-xs font-semibold text-wokr-red-100"
                    >
                      Back to login
                    </Link>
                  </div>
                </div>
              </div>
              <div className="hidden lg:flex flex-wrap content-center justify-center rounded-r-md bg-wokr-red-100 w-[24rem] h-[32rem]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
