"use client";

import { Fragment, useRef, useState, useContext, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link.js";
import { useRouter } from "next/navigation";
import Image from "next/image.js";
import {
  signInWithPopup,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  getIdToken,
} from "firebase/auth";
import google from "../../public/images/google_icon.png";
import {
  auth,
  googleProvider,
  actionCodeSettings,
} from "../../config/firebase";
import { toast } from "react-toastify";
import { WokrButton, WokrInput } from "../formfields/FormFields";
import { AuthContext } from "@/context/authContext";
import { registerUser } from "@/utils/api";

type ModalProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

const RegisterModal = ({ setOpen, open }: ModalProps) => {
  const { dispatch } = useContext(AuthContext);
  const route = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForSignIn")!);
  }, []);

  const handleEmail = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value);
  };

  const handleNext = async () => {
    route.push("/setting");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
        setEmail("");
        setLoading(false);
        toast("Please check your email to complete registration", {
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
          position: "bottom-right",
        });

        console.log(errorCode);
      });
  };

  const onGoogleLogin = async () => {
    await signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const user = result.user;
        const idTokenResult = await getIdToken(result.user);

        await registerUser({ email: user.email });

        dispatch({
          type: "LOGGED_IN_USER",
          payload: { email: String(user.email), token: idTokenResult },
        });

        handleNext();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);

        toast(errorMessage, {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
        });
      });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg md:max-w-fit">
                <div className="flex shadow-md">
                  <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white  w-[24rem] h-[32rem]">
                    <div className="md:w-72">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Create a new account
                      </Dialog.Title>

                      <form className="mt-4" onSubmit={handleSubmit}>
                        <WokrInput
                          htmlFor="email"
                          labelName="Email"
                          inputName="email"
                          inputType="email"
                          inputPlaceholder="Enter your email"
                          disabled={false}
                          onChange={handleEmail}
                          inputValue={email}
                        />

                        <WokrButton
                          title={`signUp`}
                          type={`submit`}
                          disabled={!email || loading}
                          loading={loading}
                          loadingText={`Signing up ...`}
                          preLoadingText={`Sign up`}
                        />
                      </form>

                      <div className="mb-3">
                        <button
                          type="button"
                          onClick={onGoogleLogin}
                          className="flex flex-wrap justify-center w-full border border-gray-300 hover:border-gray-500 px-2 py-1.5 rounded-md"
                        >
                          <Image className="w-5 mr-2" src={google} alt="" />
                          Sign up with Google
                        </button>
                      </div>

                      <div className="text-center">
                        <span className="text-xs text-gray-400 font-semibold">
                          Already have an account?
                        </span>
                        <Link
                          href="/register"
                          className="text-xs font-semibold text-wokr-red-100"
                        >
                          {" Sign in"}
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex flex-wrap content-center justify-center rounded-r-md bg-wokr-red-100 w-[24rem] h-[32rem]"></div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default RegisterModal;
