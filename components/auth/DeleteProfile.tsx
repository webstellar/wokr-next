import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { useState } from "react";
import { WokrButton, WokrInput } from "../formfields/FormFields";
import { toast } from "react-toastify";
import { deleteProfile } from "@/utils/api";
import { useUserQuery } from "@/hooks/useUserQuery";

//mutation
import { useMutation, useQueryClient } from "@tanstack/react-query";

const DeleteProfile = () => {
  const { data } = useUserQuery();

  const userId = data?._id;
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const deleteUserMutation = useMutation({
    mutationFn: deleteProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loggedUser"] });
    },
  });

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const currentUser = auth.currentUser;
    //first action
    const credential = EmailAuthProvider.credential(
      currentUser?.email || "",
      password
    );

    await reauthenticateWithCredential(currentUser!, credential).then(() => {
      deleteUser(currentUser!)
        .then(() => {
          setLoading(false);
          toast("Account deleted successfully", {
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
          deleteUserMutation.mutate(userId);

          setPassword("");
        });
    });
  };

  return (
    <div className="flex flex-wrap content-center justify-start rounded-l-md bg-white h-[20rem] items-start w-full">
      <div className="md:w-3/5">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Delete your account
        </h3>

        <p className="my-2.5 text-sm">
          Please input your password to delete your account.
        </p>

        <form className="mt-4" onSubmit={handleSubmit}>
          <WokrInput
            htmlFor="assword"
            labelName="Password"
            inputName="Password"
            inputType="password"
            inputPlaceholder="Enter your password to proceed"
            disabled={loading}
            onChange={handlePassword}
            inputValue={password}
          />

          <WokrButton
            title={`deleteAccount`}
            type={`submit`}
            disabled={loading}
            loading={loading}
            loadingText={`Deleting account...`}
            preLoadingText={`Delete account`}
          />
        </form>
      </div>
    </div>
  );
};

export default DeleteProfile;
