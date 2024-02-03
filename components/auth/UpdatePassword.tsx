"use client";

import { useState } from "react";
import { WokrButton, WokrInput } from "../formfields/FormFields";
import { toast } from "react-toastify";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth } from "@/config/firebase";

const UpdatePassword = ({ user }: any) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const currentUser = auth.currentUser;
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");

    //first action
    const credential = EmailAuthProvider.credential(
      currentUser?.email || "",
      oldPassword
    );

    await reauthenticateWithCredential(currentUser!, credential).then(() => {
      updatePassword(currentUser!, newPassword)
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
          toast(error, {
            hideProgressBar: true,
            autoClose: 2000,
            type: "error",
            position: "bottom-right",
          });
        })
        .finally(() => {
          setConfirmPassword("");
          setNewPassword("");
          setOldPassword("");
        });
    });
  };

  return (
    <div className="flex flex-wrap content-center justify-start rounded-l-md bg-white h-[30rem] w-full">
      <div className="md:w-3/5">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Change password
        </h3>

        <p className="my-2.5 text-sm">
          Your password must be at least 6 character and should inclued a
          combinataion of numbers, letters and sepcial character (!$@%).
        </p>

        <form className="mt-4" onSubmit={onSignup}>
          <WokrInput
            htmlFor="oldPassword"
            labelName="Old Password"
            inputName="oldPassword"
            inputType="password"
            inputPlaceholder="Enter your old password"
            disabled={false}
            onChange={handleOldPassword}
            inputValue={oldPassword}
          />
          <WokrInput
            htmlFor="newPassword"
            labelName="New Password"
            inputName="newPassword"
            inputType="password"
            inputPlaceholder="New Password"
            disabled={loading}
            onChange={handlePassword}
            inputValue={newPassword}
          />
          <WokrInput
            htmlFor="confirmPassword"
            labelName="Confirm Password"
            inputName="confirmPassword"
            inputType="password"
            inputPlaceholder="Re-type new password"
            disabled={loading}
            onChange={handleConfirmPassword}
            inputValue={confirmPassword}
          />

          {error && <p className="text-wokr-red-200 text-sm my-2.5">{error}</p>}

          <WokrButton
            title={`changePassword`}
            type={`submit`}
            disabled={loading}
            loading={loading}
            loadingText={`Saving changes ...`}
            preLoadingText={`Save change`}
          />
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
