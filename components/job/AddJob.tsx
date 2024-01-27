"use client";

import { useState, Fragment } from "react";
import { storage } from "../../config/firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { Menu, Transition } from "@headlessui/react";
import { HiChevronDown, HiOutlinePlus } from "react-icons/hi";
import {
  skillLevels,
  skills,
  automationTools,
  automationLevels,
  feeTypes,
  deliveryTimes,
} from "../../data/data";
import { useRouter } from "next/navigation";

type valueProps = {
  [key: string]: string;
};

const initState: valueProps = {
  title: "",
  description: "",
  price: "",
  maxRevisions: "",
};

const AddJob = () => {
  const router = useRouter();
  const [state, setState] = useState(initState);
  const [skill, setSkill] = useState("ADD SKILL");
  const [skillLevel, setSkillLevel] = useState("EXPERIENCE LEVEL");
  const [automation, setAutomation] = useState("ADD AUTOMATION TOOL");
  const [automationLevel, setAutomationLevel] = useState("EXPERIENCE LEVEL");
  const [feeType, setFeeType] = useState("FIXED PRICE");
  const [deliveryTime, setDeliveryTime] = useState("1 day");
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [videoUpload, setVideoUpload] = useState<File | null>(null);
  const [entries, setEntries] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setEntries(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (imageUpload == null) return;

    try {
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      const videoRef = ref(storage, `videos/${videoUpload?.name + v4()}`);

      // Upload image to firebase
      await uploadBytes(imageRef, imageUpload);

      // Upload video to firebase if videoUpload is not null
      if (videoUpload) {
        await uploadBytes(videoRef, videoUpload);
      }

      // Get download URLs
      const imageUrl = await getDownloadURL(imageRef);
      const videoUrl = videoUpload ? await getDownloadURL(videoRef) : null;

      const formData = {
        title: state.title,
        description: state.description,
        price: state.price,
        deliveryTime: deliveryTime,
        maxRevisions: state.maxRevisions,
        video: videoUrl,
        image: imageUrl,
        fee: feeType,
        skill: skill,
        skillLevel: skillLevel,
        automation: automation,
        automationLevel: automationLevel,
      };

      console.log(formData);
      toast("", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
      });
      router.push("/profile");

      // Continue with the rest of your code...
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto grid grid-cols-3 justify-between items-start gap-10 max-w-screen-2xl px-6 lg:px-8">
          <div className="col-span-2 w-full">
            <div className="mb-8">
              <label
                className="block text-grey-darker text-sm font-bold mb-2.5 uppercase"
                htmlFor="display-name"
              >
                Title
              </label>
              <input
                className="block w-full rounded-md border border-gray-300 focus:border-wokr-red-100 focus:outline-none focus:ring-1 focus:ring-wokr-red-100 py-2 px-3 text-gray-500 outline-wokr-red-100"
                id="title"
                name="title"
                type="text"
                placeholder="Add Your Project Title"
                onChange={handleChange}
                value={state.title}
              />
            </div>
            <div className="mb-8">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="skills"
              >
                Skills
              </label>

              <div className="grid grid-cols-2 justify-around items-center w-full gap-x-2 mb-2">
                <select
                  required
                  title="skill"
                  name="skill"
                  className="text-black bg-white px-3 py-2 transition-all cursor-pointer hover:border-wokr-red-100 border border-gray-200 rounded-lg outline-wokr-red-100 appearance-none invalid:text-black/30"
                  onChange={(e) => setSkill(e.target.value)}
                  value={skill}
                >
                  {skills.map((skill, i) => (
                    <option key={i} value={skill.value}>
                      {skill.label}
                    </option>
                  ))}
                </select>

                <select
                  required
                  title="skillLevel"
                  name="skillLevel"
                  className="text-black bg-white px-3 py-2 transition-all cursor-pointer hover:border-wokr-red-100 border border-gray-200 rounded-lg outline-wokr-red-100 appearance-none invalid:text-black/30"
                  onChange={(e) => setSkillLevel(e.target.value)}
                  value={skillLevel}
                >
                  {skillLevels.map((skillLevel, i) => (
                    <option key={i} value={skillLevel.value}>
                      {skillLevel.label}
                    </option>
                  ))}
                </select>
              </div>

              <p className="text-sm font-pangram-light">
                {`${skill} - ${skillLevel}`}
              </p>
            </div>
            <div className="mb-8">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="automationTools"
              >
                Automation Tools
              </label>

              <div className="grid grid-cols-2 justify-around items-center w-full gap-x-2 mb-2">
                <select
                  required
                  title="automationTools"
                  name="automationTools"
                  className="text-black bg-white px-3 py-2 transition-all cursor-pointer hover:border-wokr-red-100 border border-gray-200 rounded-lg outline-wokr-red-100 appearance-none invalid:text-black/30"
                  onChange={(e) => setAutomation(e.target.value)}
                  value={automation}
                >
                  {automationTools.map((tool, i) => (
                    <option key={i} value={tool.value}>
                      {tool.label}
                    </option>
                  ))}
                </select>

                <select
                  required
                  title="automationLevel"
                  name="automationLevel"
                  className="text-black bg-white px-3 py-2 transition-all cursor-pointer hover:border-wokr-red-100 border border-gray-200 rounded-lg outline-wokr-red-100 appearance-none invalid:text-black/30"
                  onChange={(e) => setAutomationLevel(e.target.value)}
                  value={automationLevel}
                >
                  {automationLevels.map((automationLevel, i) => (
                    <option key={i} value={automationLevel.value}>
                      {automationLevel.label}
                    </option>
                  ))}
                </select>
              </div>

              <p className="text-sm font-pangram-light">
                {`${automation} - ${automationLevel}`}
              </p>
            </div>

            <div className="mb-8">
              <label
                className="block text-grey-darker text-sm font-bold mb-2 "
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="block w-full rounded-md border border-gray-300 focus:border-wokr-red-100 focus:outline-none focus:ring-1 focus:ring-wokr-red-100 py-1 px-1.5 text-gray-500 outline-wokr-red-100"
                name="description"
                id="description"
                rows={10}
                placeholder="Add Your Description Here"
                onChange={handleChange}
                value={state.description}
              />
            </div>
            <div className="mb-8">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="automationTools"
              >
                Max Revisions
              </label>

              <div className="grid grid-cols-2 justify-around items-center w-full gap-x-2 mb-2">
                <input
                  className="block w-full rounded-md border border-gray-300 focus:border-wokr-red-100 focus:outline-none focus:ring-1 focus:ring-wokr-red-100 py-2 px-3 text-gray-500 outline-wokr-red-100"
                  id="maxRevisions"
                  name="maxRevisions"
                  type="number"
                  placeholder="0"
                  onChange={handleChange}
                  value={state.maxRevisions}
                />
              </div>
            </div>

            <div className="mb-8">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="automationTools"
              >
                Delivery Time
              </label>

              <div className="grid grid-cols-2 justify-around items-center w-full gap-x-2 mb-2">
                <select
                  required
                  title="deliveryTime"
                  name="deliveryTime"
                  className="text-black bg-white px-3 py-2 transition-all cursor-pointer hover:border-wokr-red-100 border border-gray-200 rounded-lg outline-wokr-red-100 appearance-none invalid:text-black/30"
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  value={deliveryTime}
                >
                  {deliveryTimes.map((time) => (
                    <option key={time.id} value={time.value}>
                      {time.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-8">
              <div>
                <p className="text-grey-darker text-sm font-bold mb-2 ">
                  Upload Image
                </p>
                <label
                  className="inline-block text-grey-darker text-sm font-bold mb-2 border-2 p-20 rounded-lg backdrop-blur-0 bg-gray-100 cursor-pointer"
                  htmlFor="images"
                >
                  <HiOutlinePlus className="text-4xl font-extralight" />
                </label>

                <input
                  className="hidden"
                  title="images"
                  name="images"
                  id="images"
                  type="file"
                  accept="image/png, image/jpeg, image/webp, image/jpg"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files != null) {
                      setImageUpload(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="mb-8 w-full">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="skills"
              >
                Fee Type
              </label>
              <select
                required
                title="feeType"
                name="feeType"
                className="text-black bg-white px-3 py-2 transition-all cursor-pointer hover:border-wokr-red-100 border border-gray-200 rounded-lg outline-wokr-red-100 appearance-none invalid:text-black/30 w-full"
                onChange={(e) => setFeeType(e.target.value)}
                value={feeType}
              >
                {feeTypes.map((feeType, i) => (
                  <option key={i} value={feeType.value}>
                    {feeType.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-8 w-full">
              <label
                className="block text-grey-darker text-sm font-bold mb-2.5 uppercase"
                htmlFor="display-name"
              >
                Price (staring at)
              </label>
              <input
                className="block w-full rounded-md border border-gray-300 focus:border-wokr-red-100 focus:outline-none focus:ring-1 focus:ring-wokr-red-100 py-2 px-3 text-gray-500 outline-wokr-red-100"
                id="price"
                name="price"
                type="text"
                placeholder="$100"
                onChange={handleChange}
                value={state.price}
              />
            </div>

            <div className="mb-8">
              <label
                className="block text-grey-darker text-sm font-bold mb-2 "
                htmlFor="video"
              >
                Upload Video
              </label>

              <input
                title="video"
                name="video"
                id="video"
                type="file"
                accept="video/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files != null) {
                    setVideoUpload(e.target.files[0]);
                  }
                }}
              />
            </div>

            <div className="mb-8 flex justify-between items-center gap-x-5 w-full">
              Cancel
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button
                    className={`${
                      entries ? "bg-green-500" : "bg-black/20"
                    }  inline-flex w-full justify-center rounded-md  px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                  >
                    Publish
                    <HiChevronDown
                      className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div className="px-1 py-3">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active && "bg-wokr-red-100"
                            } group flex w-full rounded-md px-2 py-3 text-sm hover:text-white`}
                            type="submit"
                          >
                            {loading ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M12 2C6.477 2 2 6.477 2 12c0 1.656.337 3.223 0.943 4.65C3.65 16.73 4.26 17 5 17c.74 0 1.35-.27 1.057-.35C7.663 15.223 8 13.656 8 12c0-2.21-.895-4.21-2.343-5.657C4.105 4.895 2.105 4 0 4"
                                  ></path>
                                </svg>
                                Publishing...
                              </>
                            ) : (
                              "Publish"
                            )}
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active && "bg-wokr-red-100"
                            } group flex w-full rounded-md px-2 py-3 hover:text-white text-sm`}
                            type="submit"
                          >
                            {loading ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M12 2C6.477 2 2 6.477 2 12c0 1.656.337 3.223 0.943 4.65C3.65 16.73 4.26 17 5 17c.74 0 1.35-.27 1.057-.35C7.663 15.223 8 13.656 8 12c0-2.21-.895-4.21-2.343-5.657C4.105 4.895 2.105 4 0 4"
                                  ></path>
                                </svg>
                                Saving to draft...
                              </>
                            ) : (
                              "Save to draft"
                            )}
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddJob;
