"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../config/firebase";
import {
  signInWithEmailLink,
  isSignInWithEmailLink,
  updatePassword,
  getIdToken,
} from "firebase/auth";
import { toast } from "react-toastify";
import { WokrButton, WokrInput } from "@/components/formfields/FormFields";
import { Transition } from "@headlessui/react";
import { AuthContext } from "@/context/authContext";

const CompleteRegistration = () => {
  const { dispatch } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForSignIn")!);
  }, []);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (isSignInWithEmailLink(auth, window.location.href)) {
      //validation
      if (!email || !password) {
        toast("Please provide your email for confirmation", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "error",
          position: "bottom-right",
        });
        return;
      }

      signInWithEmailLink(auth, email, window.location.href)
        .then(async (result) => {
          window.localStorage.removeItem("emailForSignIn");
          console.log(result);

          const user = result.user;
          //const user = auth.currentUser;

          //update user's password
          updatePassword(user, password)
            .then(() => {
              setLoading(false);
              toast("Password updated successfully", {
                hideProgressBar: true,
                autoClose: 2000,
                type: "success",
                position: "bottom-right",
              });
            })
            .catch((error) => {
              console.error(error);
              console.log("It happened here!");
            });

          //dispatch user with token and email
          //then redirect
          const idTokenResult = await getIdToken(result.user);

          //dispatch stays here
          dispatch({
            type: "LOGGED_IN_USER",
            payload: { email: String(user.email), token: idTokenResult },
          });

          handleNext();
        })
        .catch((error) => {
          const errorMessage = (error as Error)?.message || "An error occurred";
          setLoading(false);
          toast(errorMessage, {
            hideProgressBar: true,
            autoClose: 2000,
            type: "error",
            position: "bottom-right",
          });
        });
    }
  };

  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username) {
      toast("Please provide a unique username", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
        position: "bottom-right",
      });
      return;
    }

    //need fixing, no update occurs here

    handleNext();
  };

  //temporary button
  const startExploring = () => {
    router.push("/setup-profile");
  };

  const handleEmail = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value);
  };

  const handlePassword = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPassword(e.target.value);
  };

  const handleUsername = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUsername(e.target.value);
  };

  return (
    <>
      <div className="relative z-10">
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg md:max-w-fit">
              <div className="flex shadow-md">
                <div className="hidden lg:flex flex-wrap content-center justify-center rounded-r-md bg-wokr-red-100 w-[24rem] h-[32rem]"></div>

                <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white w-[24rem] h-[32rem]">
                  {currentStep == 1 && (
                    <div className="md:w-72">
                      <h3 className="text-base font-semibold leading-6 text-gray-900">
                        Complete Registration
                      </h3>

                      <form className="mt-4" onSubmit={onSignup}>
                        <WokrInput
                          htmlFor="email"
                          labelName="Email"
                          inputName="email"
                          inputType="email"
                          inputPlaceholder="Enter your email"
                          disabled={true}
                          onChange={handleEmail}
                          inputValue={email}
                        />
                        <WokrInput
                          htmlFor="password"
                          labelName="Password"
                          inputName="password"
                          inputType="password"
                          inputPlaceholder="Password"
                          disabled={loading}
                          onChange={handlePassword}
                          inputValue={password}
                        />
                        <WokrButton
                          title={`signUp`}
                          type={`submit`}
                          disabled={loading}
                          loading={loading}
                          loadingText={`Signing up ...`}
                          preLoadingText={`Sign up`}
                        />
                      </form>
                    </div>
                  )}

                  {currentStep == 2 && (
                    <div className="md:w-72">
                      <h3 className="text-base font-semibold leading-6 text-gray-900 mb-5">
                        Get your profile started
                      </h3>

                      <p className="text-sm mb-2">
                        Build trust by using your full name or business name
                      </p>

                      <form className="mt-4" onSubmit={onHandleSubmit}>
                        <WokrInput
                          htmlFor="username"
                          labelName="Username"
                          inputName="username"
                          inputType="text"
                          inputPlaceholder="johnsnow"
                          disabled={false}
                          onChange={handleUsername}
                          inputValue={username}
                        />

                        <WokrButton
                          title={`signUp`}
                          type={`submit`}
                          disabled={!username || loading}
                          loading={loading}
                          loadingText={`Creating username...`}
                          preLoadingText={`Create username`}
                        />
                      </form>
                    </div>
                  )}

                  {currentStep == 3 && (
                    <Transition
                      as="div"
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      className="md:w-72 flex flex-col justify-center items-center gap-y-3"
                      show={true}
                    >
                      <div className="text-center">
                        <svg
                          width="100"
                          height="100"
                          viewBox="0 0 127 127"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="63.5" cy="63.5" r="63.5" fill="#55C1AC" />
                          <path
                            d="M36.0156 63.168L54.5641 81.5076L90.9858 45.4927"
                            fill="#55C1AC"
                          />
                          <path
                            d="M36.0156 63.168L54.5641 81.5076L90.9858 45.4927"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <h3 className="text-base text-center font-semibold leading-6 text-gray-900 mb-2">
                        {username} you’re all done!
                      </h3>
                      <p className="text-sm mb-2 text-center">
                        Welcome aboard, Workr anticipates your remarkable
                        contributions.
                      </p>

                      <WokrButton
                        title={`startExploring`}
                        type={`button`}
                        onClick={startExploring}
                        loading={loading}
                        loadingText={`Start exploring...`}
                        preLoadingText={`Start exploring`}
                      />
                    </Transition>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompleteRegistration;
