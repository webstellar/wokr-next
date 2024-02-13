"use client";

import { useState, useCallback } from "react";
import {
  languages,
  languageLevels,
  skillLevels,
  skills,
  automationTools,
  automationLevels,
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
  WokrDashboardSelect,
  WokrPhotoUpload,
  WokrDashboardUrlInput,
} from "../formfields/FormFields";
import { updateUser } from "@/utils/api";

type valueProps = {
  [key: string]: string;
};

interface Skill {
  id: number;
  value: string;
  label: string;
}

interface SkillList {
  skill: Skill;
  skillLevel: Skill;
}

const initState: valueProps = {
  firstName: "",
  lastName: "",
  middleName: "",
  displayName: "",
  description: "",
  graduationYear: "",
  phone: "",
};

const EditProfile = () => {
  const router = useRouter();
  const [state, setState] = useState(initState);
  const [language, setLanguage] = useState("ADD LANGUAGE");
  const [languageLevel, setLanguageLevel] = useState("LANGUAGE LEVEL");
  const [skill, setSkill] = useState("ADD SKILL");
  const [skillLevel, setSkillLevel] = useState("EXPERIENCE LEVEL");
  const [automation, setAutomation] = useState("ADD AUTOMATION TOOL");
  const [automationLevel, setAutomationLevel] = useState(
    "ADD AUTOMATION LEVEL"
  );
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  //form fields
  const [skillLists, setSkillLists] = useState([
    { skill: skills[0], skillLevel: skillLevels[0] },
  ]);

  const [languageLists, setLanguageLists] = useState([
    { language: languages[0], languageLevel: languageLevels[0] },
  ]);

  const [automationLists, setAutomationLists] = useState([
    { automation: automationTools[0], automationLevel: automationLevels[0] },
  ]);

  const handleSkillChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setSkillLists((currentSkills) => {
      return currentSkills.map((item, i) => {
        if (i === index) {
          // Check if the target name is 'skill' or 'skillLevel', then update accordingly
          if (name === "skill" || name === "skillLevel") {
            // Assuming value is the identifier to find in skills or skillLevels array
            const updatedValue =
              name === "skill"
                ? skills.find((skill) => skill.value === value)
                : skillLevels.find((level) => level.value === value);
            return { ...item, [name]: updatedValue || item[name] };
          }
        }
        return item;
      });
    });
  };

  const addSkillField = () => {
    setSkillLists((currentSkillLists) => [
      ...currentSkillLists,
      {
        skill: { id: 0, value: "", label: "Select a skill" }, // Example default structure
        skillLevel: { id: 0, value: "", label: "Select skill level" }, // Example default structure
      },
    ]);
  };

  const subtractSkillField = (indexToRemove: number) => {
    setSkillLists((currentSkillLists) =>
      currentSkillLists.filter((_, index) => index !== indexToRemove)
    );
  };

  //language
  const handleLanguageChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setLanguageLists((currentLanguages) => {
      return currentLanguages.map((item, i) => {
        if (i === index) {
          if (name === "language" || name === "languageLevel") {
            const updatedValue =
              name === "language"
                ? languages.find((language) => language.value === value)
                : languageLevels.find((level) => level.value === value);
            return { ...item, [name]: updatedValue || item[name] };
          }
        }
        return item;
      });
    });
  };

  const addLanguageField = () => {
    setLanguageLists((currentLanguageLists) => [
      ...currentLanguageLists,
      {
        language: { id: 0, value: "", label: "Select a language" }, // Example default structure
        languageLevel: { id: 0, value: "", label: "Select language level" }, // Example default structure
      },
    ]);
  };

  const subtractLanguageField = (indexToRemove: number) => {
    setLanguageLists((currentLanguageLists) =>
      currentLanguageLists.filter((_, index) => index !== indexToRemove)
    );
  };

  //automation tools
  const handleAutomationChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setAutomationLists((currentTools) => {
      return currentTools.map((item, i) => {
        if (i === index) {
          if (name === "automation" || name === "automationLevel") {
            const updatedValue =
              name === "automation"
                ? automationTools.find(
                    (automation) => automation.value === value
                  )
                : automationLevels.find((level) => level.value === value);
            return { ...item, [name]: updatedValue || item[name] };
          }
        }
        return item;
      });
    });
  };

  const addAutomationField = () => {
    setAutomationLists((currentTools) => [
      ...currentTools,
      {
        automation: { id: 0, value: "", label: "Select an automation tool" }, // Example default structure
        automationLevel: { id: 0, value: "", label: "Select automation level" }, // Example default structure
      },
    ]);
  };

  const subtractAutomationField = (indexToRemove: number) => {
    setAutomationLists((currentTools) =>
      currentTools.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleCancel = () => {
    setState({});
    setLanguage("");
    setAutomation("");
    setSkill("");
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
        const token = await getIdToken(currentUser!, true);

        if (currentUser) {
          const headers = new Headers();
          headers.append("Content-Type", "application/json");
          headers.append("Authorization", `Bearer ${token}`);

          const profileRef = ref(
            storage,
            `profiles/${profileImage!.name + v4()}`
          );
          await uploadBytes(profileRef, profileImage!);

          // Get download URLs
          const profileUrl = await getDownloadURL(profileRef);

          const formData = {
            email: currentUser?.email,
            username: state.displayName,
            firstName: state.firstName,
            middleName: state.middleName,
            lastName: state.lastName,
            description: state.description,
            profileImage: profileUrl || null,
            automationTools: {
              automation: automation,
              automationLevel: automationLevel,
            },
            skillsets: {
              skill: skill,
              skillLevel: skillLevel,
            },
            languages: {
              language: language,
              languageLevel: languageLevel,
            },
          };

          await updateUser(formData, headers);

          toast("Thanks for setting up your profile", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "success",
          });
          router.push("/my-profile");
        }
      } catch (error) {
        console.log(error);
      }
    },
    [
      automation,
      automationLevel,
      language,
      languageLevel,
      profileImage,
      router,
      skill,
      skillLevel,
      state.description,
      state.displayName,
      state.firstName,
      state.lastName,
      state.middleName,
    ]
  );

  return (
    <section className="mx-auto">
      <div className="grid grid-cols-1 justify-start items-center max-w-screen-md">
        <form onSubmit={handleSubmit} className="mb-10">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <WokrDashboardUrlInput
              classname="sm:col-span-3"
              htmlFor="displayName"
              label="DISPLAY NAME"
              title="displayName"
              value={state.displayName}
              disabled={false}
              type="text"
              name="displayName"
              id="displayName"
              autocomplete="display name"
              placeholder="jonn_wick"
              onChange={handleChange}
              url="wokr.io/"
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
              writeUp="Share with us your hobbies, any extra qualifications, or naything else you wish to provide"
              name="description"
              id="description"
              row={5}
              onChange={handleChange}
              value={state.description}
            />
            <div className="border-b border-gray-900/10 pb-12 col-span-full">
              <h2 className="text-base font-semibold leading-7 mb-5 text-gray-900">
                LANGUAGE INFORMATION
              </h2>

              <div>
                {languageLists.map((field, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-11 justify-between items-center w-full mb-4"
                  >
                    <WokrDashboardSelect
                      id="language"
                      title="language"
                      name="language"
                      options={languages}
                      label="Language"
                      value={field.language.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleLanguageChange(index, e)
                      }
                    />
                    <WokrDashboardSelect
                      id="languageLevel"
                      title="languageLevel"
                      name="languageLevel"
                      options={languageLevels}
                      label="Language Level"
                      value={field.languageLevel.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleLanguageChange(index, e)
                      }
                    />

                    <div className="flex justify-end items-center">
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
                          <circle cx="22.5" cy="22.5" r="22.5" fill="#D9D9D9" />
                          <path
                            d="M32.0918 22.0464L11.9992 22.0464"
                            stroke="#636363"
                            stroke-width="2"
                            stroke-linecap="round"
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
                  className="w-auto flex items-center justify-center text-center mt-4 px-2 py-1.5 rounded-md bg-gray-300 text-gray-500" // Add some margin-top for spacing from the list
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 45 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="22.5" cy="22.5" r="22.5" fill="#D9D9D9" />
                    <path
                      d="M22.0469 12L22.0469 32.0926"
                      stroke="#636363"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M32.0918 22.0464L11.9992 22.0464"
                      stroke="#636363"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                  Add Language
                </button>
              </div>
            </div>
            <div className="border-b border-gray-900/10 pb-12 col-span-full">
              <h2 className="text-base font-semibold leading-7 mb-5 text-gray-900">
                SKILL INFORMATION
              </h2>

              <div>
                {skillLists.map((field, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-11 justify-between items-center w-full mb-4"
                  >
                    <WokrDashboardSelect
                      id="skill"
                      title="skill"
                      name="skill"
                      options={skills}
                      label="Skill"
                      value={field.skill.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleSkillChange(index, e)
                      }
                    />
                    <WokrDashboardSelect
                      id="skillLevel"
                      title="skillLevel"
                      name="skillLevel"
                      options={skillLevels}
                      label="Skill Level"
                      value={field.skillLevel.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleSkillChange(index, e)
                      }
                    />

                    <div className="flex justify-end items-center">
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
                          <circle cx="22.5" cy="22.5" r="22.5" fill="#D9D9D9" />
                          <path
                            d="M32.0918 22.0464L11.9992 22.0464"
                            stroke="#636363"
                            stroke-width="2"
                            stroke-linecap="round"
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
                  className="w-auto flex items-center justify-center text-center mt-4 px-2 py-1.5 rounded-md bg-gray-300 text-gray-500" // Add some margin-top for spacing from the list
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 45 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="22.5" cy="22.5" r="22.5" fill="#D9D9D9" />
                    <path
                      d="M22.0469 12L22.0469 32.0926"
                      stroke="#636363"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M32.0918 22.0464L11.9992 22.0464"
                      stroke="#636363"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                  Add Skill
                </button>
              </div>
            </div>
            <div className="border-b border-gray-900/10 pb-12 col-span-full">
              <h2 className="text-base font-semibold leading-7 mb-5 text-gray-900">
                AUTOMATION TOOL INFORMATION
              </h2>

              <div>
                {automationLists.map((field, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-11 justify-between items-center w-full mb-4"
                  >
                    <WokrDashboardSelect
                      id="automation"
                      title="automation"
                      name="automation"
                      options={automationTools}
                      label="Automation"
                      value={field.automation.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleAutomationChange(index, e)
                      }
                    />
                    <WokrDashboardSelect
                      id="automationLevel"
                      title="automationLevel"
                      name="automationLevel"
                      options={automationLevels}
                      label="Automation Level"
                      value={field.automationLevel.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleAutomationChange(index, e)
                      }
                    />

                    <div className="flex justify-end items-center">
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
                          <circle cx="22.5" cy="22.5" r="22.5" fill="#D9D9D9" />
                          <path
                            d="M32.0918 22.0464L11.9992 22.0464"
                            stroke="#636363"
                            stroke-width="2"
                            stroke-linecap="round"
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
                  className="w-auto flex items-center justify-center text-center mt-4 px-2 py-1.5 rounded-md bg-gray-300 text-gray-500" // Add some margin-top for spacing from the list
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 45 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="22.5" cy="22.5" r="22.5" fill="#D9D9D9" />
                    <path
                      d="M22.0469 12L22.0469 32.0926"
                      stroke="#636363"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M32.0918 22.0464L11.9992 22.0464"
                      stroke="#636363"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                  Add Automation Tool
                </button>
              </div>
            </div>
            <WokrPhotoUpload
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
  );
};

export default EditProfile;
