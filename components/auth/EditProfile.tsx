"use client";

import { useState, useCallback } from "react";
import {
  languageLevelList,
  languageList,
  skillLevelList,
  skillList,
  toolList,
  toolLevelList,
} from "../../data/data";
import { useRouter } from "next/navigation";
import { auth, storage } from "@/config/firebase";
import { getIdToken } from "firebase/auth";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import {
  WokrDashboardButton,
  WokrDashboardDescription,
  WokrDashboardInput,
  WokrDashboardSelector,
  WokrPhotoUpload,
  WokrDashboardUrlInput,
} from "../formfields/FormFields";
import { updateUser } from "@/utils/api";
import Image from "next/image";
import { useUserQuery } from "@/hooks/useUserQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userData } from "@/types/types";

type valueProps = {
  [key: string]: string;
};

const EditProfile = () => {
  const { data, isLoading } = useUserQuery();
  const queryClient = useQueryClient();
  const userMutation = useMutation({
    mutationFn: ({ formData, token }: { formData: userData; token: string }) =>
      updateUser(formData, token),
    onSuccess: (data) => {
      queryClient.setQueryData(["loggedUser", data.email], data);

      toast("Thanks for setting up your profile", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
      });
      router.push("/my-profile");
    },
  });

  const initialSkillSets = data?.skillsets.map(
    (set: { skill: string; skillLevel: string }) => ({
      skill: skillList.includes(set.skill) ? set.skill : "Select Skill",
      skillLevel: skillLevelList.includes(set.skillLevel)
        ? set.skillLevel
        : "Select Level",
    })
  );

  const initialToolSets = data?.automationTools.map(
    (set: { automation: string; automationLevel: string }) => ({
      automation: toolList.includes(set.automation)
        ? set.automation
        : "Select Automation",
      automationLevel: toolLevelList.includes(set.automationLevel)
        ? set.automationLevel
        : "Select Level",
    })
  );

  const initialLanguageSets = data.languages.map(
    (set: { language: string; languageLevel: string }) => ({
      language: languageList.includes(set.language)
        ? set.language
        : "Select Language",
      languageLevel: languageLevelList.includes(set.languageLevel)
        ? set.languageLevel
        : "Select Level",
    })
  );

  const router = useRouter();
  const [state, setState] = useState<valueProps>({
    firstName: data?.firstName,
    lastName: data?.lastName,
    middleName: data?.middleName,
    displayName: data?.username,
    description: data?.description,
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [skillLists, setSkillLists] = useState(initialSkillSets);
  const [languageLists, setLanguageLists] = useState(initialLanguageSets);
  const [automationLists, setAutomationLists] = useState(initialToolSets);

  let originalUrl = data?.profileImage;

  let url = null;
  if (profileImage instanceof File) {
    url = URL.createObjectURL(profileImage);
  }

  const handleSkillChange = (
    index: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const newSkillSets = [...skillLists];
    newSkillSets[index][name] = value;
    setSkillLists(newSkillSets);
  };

  const addSkillField = () => {
    setSkillLists((currentSkillLists: any) => [
      ...currentSkillLists,
      { skill: "Select Skill", skillLevel: "Select Level" },
    ]);
  };

  const subtractSkillField = (indexToRemove: number) => {
    setSkillLists((currentSkillLists: any) =>
      currentSkillLists.filter((_: any, index: any) => index !== indexToRemove)
    );
  };

  //language
  const handleLanguageChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const newLanguageSets = [...languageLists];
    newLanguageSets[index][name] = value;
    setLanguageLists(newLanguageSets);
  };

  const addLanguageField = () => {
    setLanguageLists((currentLanguageLists: any) => [
      ...currentLanguageLists,
      { language: "Select Language", languageLevel: "Select Level" },
    ]);
  };

  const subtractLanguageField = (indexToRemove: number) => {
    setLanguageLists((currentLanguageLists: any) =>
      currentLanguageLists.filter(
        (_: any, index: any) => index !== indexToRemove
      )
    );
  };

  //automation tools
  const handleAutomationChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const newAutomationSets = [...automationLists];
    newAutomationSets[index][name] = value;
    setAutomationLists(newAutomationSets);
  };

  const addAutomationField = () => {
    setAutomationLists((currentTools: any) => [
      ...currentTools,
      {
        automation: "Select an automation tool",
        automationLevel: "Select automation level",
      },
    ]);
  };

  const subtractAutomationField = (indexToRemove: number) => {
    setAutomationLists((currentTools: any) =>
      currentTools.filter((_: any, index: any) => index !== indexToRemove)
    );
  };

  const handleCancel = () => {
    setState({});
    setProfileImage(null);
    setLoading(false);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) =>
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      //if (profileImage == null) return;

      try {
        const currentUser = auth.currentUser;
        const token: string = await getIdToken(currentUser!, true);

        if (currentUser) {
          const profileRef = ref(
            storage,
            `profiles/${profileImage?.name + v4()}`
          );
          await uploadBytes(profileRef, profileImage!);

          // Get download URLs
          const profileUrl = await getDownloadURL(profileRef);

          const formData: userData = {
            email: currentUser?.email,
            username: state?.displayName,
            firstName: state?.firstName,
            middleName: state?.middleName,
            lastName: state?.lastName,
            description: state?.description,
            profileImage: profileImage == null ? originalUrl : profileUrl,
            automationTools: automationLists || null,
            skillsets: skillLists || null,
            languages: languageLists || null,
          };

          //await updateUser(formData, token);
          userMutation.mutate({ formData, token });
        }
      } catch (error) {
        console.log(error);
      }
    },
    [
      automationLists,
      languageLists,
      originalUrl,
      profileImage,
      skillLists,
      state?.description,
      state?.displayName,
      state?.firstName,
      state?.lastName,
      state?.middleName,
      userMutation,
    ]
  );

  return (
    <>
      {isLoading ? (
        <div> Your Profile Loading</div>
      ) : (
        <section className="mx-auto mb-40">
          <div className="grid grid-cols-1 justify-start items-center max-w-screen-md">
            <form onSubmit={handleSubmit} className="mb-10">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <WokrDashboardUrlInput
                  labelclass="required"
                  classname="sm:col-span-3"
                  htmlFor="displayName"
                  label="DISPLAY NAME"
                  title="displayName"
                  value={state.displayName}
                  disabled={data?.username ? true : false}
                  type="text"
                  name="displayName"
                  id="displayName"
                  autocomplete="display name"
                  placeholder="jonn_wick"
                  onChange={handleChange}
                  url="wokr.io/in/"
                  required={data?.username ? false : true}
                />

                <div className="col-span-full grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <WokrDashboardInput
                    classname="sm:col-span-2 sm:col-start-1"
                    htmlFor="lastName"
                    label="LAST NAME"
                    inputTitle="lastName"
                    inputValue={state.lastName}
                    disabled={false}
                    inputType="text"
                    inputName="lastName"
                    inputId="lastName"
                    autocomplete="your last name"
                    inputPlaceholder="Last name"
                    onChange={handleChange}
                    required={true}
                    labelclass="required"
                  />
                  <WokrDashboardInput
                    classname="sm:col-span-2"
                    htmlFor="firstName"
                    label="FIRST NAME"
                    inputTitle="firstName"
                    inputValue={state.firstName}
                    disabled={false}
                    inputType="text"
                    inputName="firstName"
                    inputId="firstName"
                    autocomplete="your firstname"
                    inputPlaceholder="First name"
                    onChange={handleChange}
                    required={true}
                    labelclass="required"
                  />
                  <WokrDashboardInput
                    classname="sm:col-span-2"
                    htmlFor="middleName"
                    label="MIDDLE NAME"
                    inputTitle="middleName"
                    inputValue={state.middleName}
                    disabled={false}
                    inputType="text"
                    inputName="middleName"
                    inputId="middleName"
                    autocomplete="your middleName"
                    inputPlaceholder="Middle name"
                    onChange={handleChange}
                  />
                </div>

                <WokrDashboardDescription
                  title="ABOUT"
                  writeUp="Share with us your hobbies, any extra qualifications, or anything else you wish to provide"
                  name="description"
                  id="description"
                  row={5}
                  onChange={handleChange}
                  value={state.description}
                  labelclass="required"
                  required={true}
                />
                <div className="border-b border-gray-900/10 pb-12 col-span-full">
                  <h2 className="text-base font-semibold leading-7 mb-5 text-gray-900">
                    LANGUAGE INFORMATION
                  </h2>

                  <div>
                    {languageLists.map((field: any, index: any) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 gap-x-6 md:gap-y-8 sm:grid-cols-11 justify-between items-center w-full mb-4"
                      >
                        <WokrDashboardSelector
                          labelclass="required"
                          required={true}
                          id="language"
                          title="language"
                          name="language"
                          options={languageList}
                          label="Language"
                          value={field.language}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            handleLanguageChange(index, e)
                          }
                        />
                        <WokrDashboardSelector
                          labelclass="required"
                          required={true}
                          id="languageLevel"
                          title="languageLevel"
                          name="languageLevel"
                          options={languageLevelList}
                          label="Language Level"
                          value={field.languageLevel}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            handleLanguageChange(index, e)
                          }
                        />

                        <div className="flex md:justify-end items-center">
                          <button
                            title="removeLanguage"
                            type="button"
                            onClick={() => subtractLanguageField(index)}
                            className="mt-7"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 45 45"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="22.5"
                                cy="22.5"
                                r="22.5"
                                fill="#D9D9D9"
                              />
                              <path
                                d="M32.0918 22.0464L11.9992 22.0464"
                                stroke="#636363"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      title="addLanguage"
                      type="button"
                      onClick={addLanguageField}
                      className="w-auto flex items-center justify-center text-center mt-4 px-4 py-1.5 rounded-md bg-gray-300 text-gray-500 text-sm" // Add some margin-top for spacing from the list
                    >
                      Add Language
                    </button>
                  </div>
                </div>
                <div className="border-b border-gray-900/10 pb-12 col-span-full">
                  <h2 className="text-base font-semibold leading-7 mb-5 text-gray-900">
                    SKILL INFORMATION
                  </h2>

                  <div>
                    {skillLists.map((field: any, index: any) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 gap-x-6 md:gap-y-8 sm:grid-cols-11 justify-between items-center w-full mb-4"
                      >
                        <WokrDashboardSelector
                          labelclass="required"
                          required={true}
                          id="skill"
                          title="skill"
                          name="skill"
                          options={skillList}
                          label="Skill"
                          value={field.skill}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            handleSkillChange(index, e)
                          }
                        />
                        <WokrDashboardSelector
                          labelclass="required"
                          required={true}
                          id="skillLevel"
                          title="skillLevel"
                          name="skillLevel"
                          options={skillLevelList}
                          label="Skill Level"
                          value={field.skillLevel}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            handleSkillChange(index, e)
                          }
                        />

                        <div className="flex md:justify-end items-center">
                          <button
                            title="remove"
                            type="button"
                            onClick={() => subtractSkillField(index)}
                            className="mt-7"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 45 45"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="22.5"
                                cy="22.5"
                                r="22.5"
                                fill="#D9D9D9"
                              />
                              <path
                                d="M32.0918 22.0464L11.9992 22.0464"
                                stroke="#636363"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      title="add"
                      type="button"
                      onClick={addSkillField}
                      className="w-auto flex items-center justify-center text-center mt-4 px-4 py-1.5 rounded-md bg-gray-300 text-gray-500" // Add some margin-top for spacing from the list
                    >
                      Add Skill
                    </button>
                  </div>
                </div>
                <div className="border-b border-gray-900/10 pb-12 col-span-full">
                  <h2 className="text-base font-semibold leading-7 mb-5 text-gray-900">
                    AUTOMATION TOOL INFORMATION
                  </h2>

                  <div>
                    {automationLists.map((field: any, index: any) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 gap-x-6 md:gap-y-8 sm:grid-cols-11 justify-between items-center w-full mb-4"
                      >
                        <WokrDashboardSelector
                          id="automation"
                          title="automation"
                          name="automation"
                          options={toolList}
                          label="Automation"
                          value={field.automation}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            handleAutomationChange(index, e)
                          }
                        />
                        <WokrDashboardSelector
                          id="automationLevel"
                          title="automationLevel"
                          name="automationLevel"
                          options={toolLevelList}
                          label="Automation Level"
                          value={field.automationLevel}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            handleAutomationChange(index, e)
                          }
                        />

                        <div className="flex md:justify-end items-center">
                          <button
                            title="removeAutomation"
                            type="button"
                            onClick={() => subtractAutomationField(index)}
                            className="mt-7"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 45 45"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="22.5"
                                cy="22.5"
                                r="22.5"
                                fill="#D9D9D9"
                              />
                              <path
                                d="M32.0918 22.0464L11.9992 22.0464"
                                stroke="#636363"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      title="addAutomation"
                      type="button"
                      onClick={addAutomationField}
                      className="w-auto flex items-center justify-center text-center mt-4 px-4 py-1.5 rounded-md bg-gray-300 text-gray-500 text-sm" // Add some margin-top for spacing from the list
                    >
                      Add Automation Tool
                    </button>
                  </div>
                </div>
                <WokrPhotoUpload
                  labelclass="required"
                  required={true}
                  label="PROFILE PHOTO"
                  htmlFor="profileImage"
                  title="Upload an image"
                  inputName="profileImage"
                  inputId="profileImage"
                  inputType="file"
                  classname="col-span-full"
                  accept="image/png, image/jpeg, image/gif, image/jpg"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files != null) {
                      setProfileImage(e.target.files[0]);
                    }
                  }}
                  value={profileImage != null}
                />

                <div className="flex justify-start items-center gap-2">
                  {url ? (
                    <Image
                      className="rounded-md h-auto w-auto"
                      src={url}
                      height={100}
                      width={100}
                      alt=""
                    />
                  ) : (
                    <Image
                      className="rounded-md h-auto w-auto"
                      src={originalUrl}
                      height={100}
                      width={100}
                      alt=""
                    />
                  )}
                </div>
              </div>

              <WokrDashboardButton
                cancel={handleCancel}
                cancelText={"Cancel"}
                title="UpdateProfile"
                type="submit"
                disabled={false}
                loading={loading}
                loadingText="Updating ..."
                preLoadingText="Update"
              />
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default EditProfile;
