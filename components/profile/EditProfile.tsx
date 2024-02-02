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
import "react-phone-input-2/lib/style.css";
import {
  WokrDashboardButton,
  WokrDashboardDescription,
  WokrDashboardInput,
  WokrDashboardSelect,
  WokrPhone,
  WokrPhotoUpload,
} from "../formfields/FormFields";

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
};

const EditProfile = ({ user }: any) => {
  const router = useRouter();
  const [state, setState] = useState(initState);
  const [email, setEmail] = useState(user?.email);
  const [language, setLanguage] = useState("ADD LANGUAGE");
  const [languageLevel, setLanguageLevel] = useState("LANGUAGE LEVEL");
  const [skill, setSkill] = useState("ADD SKILL");
  const [skillLevel, setSkillLevel] = useState("EXPERIENCE LEVEL");
  const [automation, setAutomation] = useState("ADD AUTOMATION TOOL");
  const [automationLevel, setAutomationLevel] = useState(
    "ADD AUTOMATION LEVEL"
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(true);

  const handleCancel = () => {
    setState({});
    setLanguage("");
    setAutomation("");
    setSkill("");
    setProfileImage(null);
    setLoading(false);
  };

  const handleEmail = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value);
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

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneNumberPattern = /^\d{13}$/; // Validates a 10-digit phone number
    return phoneNumberPattern.test(phoneNumber);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      if (profileImage == null) return;

      try {
        const profileRef = ref(storage, `profiles/${profileImage.name + v4()}`);
        await uploadBytes(profileRef, profileImage);

        // Get download URLs
        const profileUrl = await getDownloadURL(profileRef);

        const formData = {
          displayName: state.displayName,
          description: state.description,
          universityCollege: state.universityCollege,
          universityCountry: state.universityCountry,
          educationTitle: state.educationTitle,
          graduationYear: state.graduationYear,
          profileImage: profileUrl,
          skill: skill,
          skillLevel: skillLevel,
          automation: automation,
          automationLevel: automationLevel,
          language: language,
          languageLevel: languageLevel,
        };

        console.log(formData);
        toast("Thanks for setting up your profile", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
        });
        router.push("/profile");
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
      state.educationTitle,
      state.graduationYear,
      state.universityCollege,
      state.universityCountry,
    ]
  );

  return (
    <section className="mx-auto">
      <div className="grid grid-cols-1 justify-start items-center max-w-screen-md">
        <form onSubmit={handleSubmit} className="mb-10">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <WokrDashboardInput
              classname="sm:col-span-3"
              htmlFor="displayName"
              label="DISPLAY NAME"
              inputTitle="displayName"
              inputValue={state.displayName}
              disabled={false}
              inputType="text"
              inputName="displayName"
              inputId="displayName"
              autocomplete="display name"
              inputPlaceholder="john_wick"
              onChange={handleChange}
            />

            <WokrDashboardInput
              classname="sm:col-span-3"
              htmlFor="email"
              label="EMAIL"
              inputTitle="email"
              inputValue={email}
              disabled={true}
              inputType="email"
              inputName="email"
              inputId="email"
              autocomplete="your email"
              inputPlaceholder="Your Email"
              onChange={handleEmail}
            />

            <WokrPhone
              label="PHONE"
              phoneNumber={phoneNumber}
              onChange={handlePhoneChange}
              valid={valid}
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
                  disabled={true}
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
                  disabled={true}
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
                  disabled={true}
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
                  disabled={true}
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
                  disabled={true}
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
              htmlFor="profile-upload"
              title="Upload a file"
              inputName="profileImage"
              inputId="profileImage"
              inputType="file"
              classname="col-span-full"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files != null) {
                  setProfileImage(e.target.files[0]);
                }
              }}
            />
          </div>

          <WokrDashboardButton
            cancel={handleCancel}
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
