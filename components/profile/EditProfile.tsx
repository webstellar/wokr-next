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
import { storage } from "../../config/firebase";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { WokrDashboardUrlInput } from "../formfields/FormFields";
import {
  WokrDashboardButton,
  WokrDashboardDescription,
  WokrDashboardInput,
  WokrDashboardSelect,
  WokrPhotoUpload,
} from "../formfields/FormFields";
import { updateUser } from "@/utils/api";

type valueProps = {
  [key: string]: string;
};

const initState: valueProps = {
  displayName: "",
  description: "",
  universityCollege: "",
  universityCountry: "",
  eductionTitle: "",
  educationMajor: "",
  graduationYear: "",
  xLink: "",
  discordLink: "",
  facebookLink: "",
  phone: "",
};

const EditProfile = ({ user }: any) => {
  const router = useRouter();
  const [state, setState] = useState(initState);
  const [email, setEmail] = useState(user?.email);
  const [fullname, setFullName] = useState(user?.displayName);
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

  const handleCancel = () => {
    setState({});
    setLanguage("");
    setAutomation("");
    setSkill("");
    setProfileImage(null);
    setLoading(false);
  };

  const handleFullName = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFullName(e.target.value);
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
        const profileRef = ref(
          storage,
          `profiles/${profileImage!.name + v4()}`
        );
        await uploadBytes(profileRef, profileImage!);

        // Get download URLs
        const profileUrl = await getDownloadURL(profileRef);

        const formData = {
          email: email,
          username: state.displayName,
          name: fullname,
          description: state.description,

          universityCollege: state.universityCollege,
          universityCountry: state.universityCountry,
          educationTitle: state.educationTitle,
          graduationYear: state.graduationYear,
          xLink: state.xLink,
          discordLink: state.discordLink,
          facebookLink: state.facebookLink,
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

        await updateUser(formData);

        toast("Thanks for setting up your profile", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
        });
        router.push("/my-profile");
      } catch (error) {
        console.log(error);
      }
    },
    [
      automation,
      automationLevel,
      email,
      fullname,
      language,
      languageLevel,
      profileImage,
      router,
      skill,
      skillLevel,
      state.description,
      state.discordLink,
      state.displayName,
      state.educationTitle,
      state.facebookLink,
      state.graduationYear,
      state.universityCollege,
      state.universityCountry,
      state.xLink,
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

            <WokrDashboardInput
              classname="sm:col-span-3"
              htmlFor="fullname"
              label="FULL NAME"
              inputTitle="fullname"
              inputValue={fullname}
              disabled={false}
              inputType="text"
              inputName="fullname"
              inputId="fullname"
              autocomplete="your fulltname"
              inputPlaceholder="Your Full name"
              onChange={handleFullName}
            />
            <WokrDashboardDescription
              title="ABOUT"
              writeUp="Write a few sentences about yourself."
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

              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <WokrDashboardSelect
                  id="language"
                  required={true}
                  title="language"
                  name="language"
                  label="Language"
                  htmlFor="language"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setLanguage(e.target.value)
                  }
                  value={language}
                  options={languages}
                />

                <WokrDashboardSelect
                  id="languageLevel"
                  required={true}
                  title="languageLevel"
                  name="languageLevel"
                  label="Language level"
                  htmlFor="languageLevel"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setLanguageLevel(e.target.value)
                  }
                  value={languageLevel}
                  options={languageLevels}
                />
              </div>

              <p className="text-sm font-pangram-light mt-5">
                {`${language} - ${languageLevel}`}
              </p>
            </div>
            <div className="border-b border-gray-900/10 pb-12 col-span-full">
              <h2 className="text-base font-semibold leading-7 mb-5 text-gray-900">
                SKILL INFORMATION
              </h2>

              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <WokrDashboardSelect
                  id="skill"
                  required={true}
                  title="skill"
                  name="skill"
                  label="Skill"
                  htmlFor="Skill"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSkill(e.target.value)
                  }
                  value={skill}
                  options={skills}
                />

                <WokrDashboardSelect
                  id="skillLevel"
                  required={true}
                  title="skillLevel"
                  name="skillLevel"
                  label="Skill level"
                  htmlFor="skillLevel"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSkillLevel(e.target.value)
                  }
                  value={skillLevel}
                  options={skillLevels}
                />
              </div>

              <p className="text-sm font-pangram-light mt-5">
                {`${skill} - ${skillLevel}`}
              </p>
            </div>
            <div className="border-b border-gray-900/10 pb-12 col-span-full">
              <h2 className="text-base font-semibold leading-7 mb-5 text-gray-900">
                AUTOMATION TOOL INFORMATION
              </h2>

              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <WokrDashboardSelect
                  id="automation"
                  required={true}
                  title="automationTools"
                  name="automationTools"
                  label="Automation"
                  htmlFor="automation"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAutomation(e.target.value)
                  }
                  value={automation}
                  options={automationTools}
                />

                <WokrDashboardSelect
                  id="automationLevel"
                  required={true}
                  title="automationLevel"
                  name="automationLevel"
                  label="Automation level"
                  htmlFor="skillLevel"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAutomationLevel(e.target.value)
                  }
                  value={automationLevel}
                  options={automationLevels}
                />
              </div>

              <p className="text-sm font-pangram-light mt-5">
                {`${automation} - ${automationLevel}`}
              </p>
            </div>
            <div className="border-b border-gray-900/10 pb-12 col-span-full">
              <h2 className="text-base font-semibold leading-7 mb-5 text-gray-900">
                EDUCATION INFORMATION
              </h2>

              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <WokrDashboardInput
                  classname="col-span-full"
                  htmlFor="universityCountry"
                  inputTitle="universityCountry"
                  inputValue={state.universityCountry}
                  disabled={false}
                  inputType="text"
                  inputName="universityCountry"
                  inputId="universityCountry"
                  autocomplete="your university country"
                  inputPlaceholder="Country of College/University"
                  onChange={handleChange}
                />
                <WokrDashboardInput
                  classname="col-span-full"
                  htmlFor="universityCollege"
                  inputTitle="universityCollege"
                  inputValue={state.universityCollege}
                  disabled={false}
                  inputType="text"
                  inputName="universityCollege"
                  inputId="universityCollege"
                  autocomplete="your university's name"
                  inputPlaceholder="College/University Name"
                  onChange={handleChange}
                />
                <WokrDashboardInput
                  classname="sm:col-span-3"
                  htmlFor="educationTitle"
                  inputTitle="educationTitle"
                  inputValue={state.educationTitle}
                  disabled={false}
                  inputType="text"
                  inputName="educationTitle"
                  inputId="educationTitle"
                  autocomplete="your education title"
                  inputPlaceholder="Title"
                  onChange={handleChange}
                />

                <WokrDashboardInput
                  classname="sm:col-span-3"
                  htmlFor="educationMajor"
                  inputTitle="educationMajor"
                  inputValue={state.educationMajor}
                  disabled={false}
                  inputType="text"
                  inputName="educationMajor"
                  inputId="educationMajor"
                  autocomplete="your education major"
                  inputPlaceholder="Major"
                  onChange={handleChange}
                />

                <WokrDashboardInput
                  classname="col-span-full"
                  htmlFor="graduationYear"
                  inputTitle="graduationYear"
                  inputValue={state.graduationYear}
                  disabled={false}
                  inputType="text"
                  inputName="graduationYear"
                  inputId="graduationYear"
                  autocomplete="Year of Graduation"
                  inputPlaceholder="Year"
                  onChange={handleChange}
                />
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

            <WokrDashboardUrlInput
              classname="sm:col-span-3"
              htmlFor="facebookLink"
              label="FACEBOOK PROFILE"
              title="facebookLink"
              value={state.facebookLink}
              disabled={false}
              type="text"
              name="facebookLink"
              id="facebookLink"
              autocomplete="your facebook link"
              placeholder="facebookurl"
              onChange={handleChange}
              url="facebook.com/"
            />
            <WokrDashboardUrlInput
              classname="sm:col-span-3"
              htmlFor="xLink"
              label="TWITTER HANDLE"
              title="xLink"
              value={state.xLink}
              disabled={false}
              type="text"
              name="xLink"
              id="xlink"
              autocomplete="your twitter link"
              placeholder="twitter handle"
              onChange={handleChange}
              url="x.com/"
            />
            <WokrDashboardUrlInput
              classname="sm:col-span-3"
              htmlFor="discordLink"
              label="DISCORD LINK"
              title="discordLink"
              value={state.discordLink}
              disabled={false}
              type="text"
              name="discordLink"
              id="discordLink"
              autocomplete="your discord link"
              placeholder="discord link"
              onChange={handleChange}
              url="discord.com/"
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
