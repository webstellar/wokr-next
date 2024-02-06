"use client";

import { useState, useEffect } from "react";
import { storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import {
  skillLevels,
  skills,
  automationTools,
  automationLevels,
  feeTypes,
  deliveryTimes,
  taglists,
  categorylists,
  includedServices,
} from "../../data/data";
import { useRouter } from "next/navigation";
import { createJob } from "@/utils/api";
import {
  WokrDashboardButton,
  WokrDashboardDescription,
  WokrDashboardInput,
  WokrDashboardList,
  WokrPhotoUpload,
} from "../formfields/FormFields";
import Image from "next/image";

type valueProps = {
  [key: string]: string;
};

type Props = {
  onFilesChange(files: File[]): void;
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
  const [skill, setSkill] = useState(skills[0]);
  const [skillLevel, setSkillLevel] = useState(skillLevels[0]);
  const [automation, setAutomation] = useState(automationTools[0]);
  const [automationLevel, setAutomationLevel] = useState(automationLevels[0]);
  const [feeType, setFeeType] = useState(feeTypes[0]);
  const [deliveryTime, setDeliveryTime] = useState(deliveryTimes[0]);
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [videoUpload, setVideoUpload] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [servicesIncluded, setServicesIncluded] = useState([
    includedServices[0],
  ]);
  const [categories, setCategories] = useState([categorylists[0]]); //array
  const [tags, setTags] = useState([taglists[0]]); //array
  const [images, setImages] = useState<File[]>([]);

  const urls = images.map((file) => URL.createObjectURL(file));

  let url = null;
  if (imageUpload instanceof File) {
    url = URL.createObjectURL(imageUpload);
  }

  const handleCancel = () => {
    router.push("/dashboard");
  };

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
  };

  /*
  const handleImageUpload = (imageUpload: SetStateAction<File | null>) => {
    setImageUpload(imageUpload);
  };

  const handleVideoUpload = (videoUpload: SetStateAction<File | null>) => {
    setVideoUpload(videoUpload);
  };

  const handleImage = (images: SetStateAction<File[]>) => {
    setImages(images);
  };
  */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const status = "published";
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

      const uploadPromises = images.map(async (image) => {
        const imageRef = ref(storage, `images/${image.name + v4()}`);
        await uploadBytes(imageRef, image);
        return getDownloadURL(imageRef);
      });

      const imageUrls = await Promise.all(uploadPromises);

      // Get download URLs
      const imageUrl = await getDownloadURL(imageRef);
      const videoUrl = videoUpload ? await getDownloadURL(videoRef) : null;

      const formData = {
        title: state.title,
        description: state.description,
        price: state.price,
        deliveryTime: deliveryTime,
        maxRevisions: state.maxRevisions,
        images: imageUrls,
        video: videoUrl,
        featuredImage: imageUrl,
        fee: feeType,
        status: status,
        skills: {
          skill: skill,
          skillLevel: skillLevel,
        },
        tools: automation,
      };

      console.log(formData);

      await createJob(formData);

      toast("Congrats your automation job is live!", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
        position: "bottom-right",
      });
      router.push("/my-profile");

      // Continue with the rest of your code...
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mx-auto mb-20">
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-3 justify-start items-start gap-10 max-w-screen-xl px-6 lg:px-8">
          <div className="col-span-2 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <WokrDashboardInput
              classname="col-span-full"
              htmlFor="title"
              label="TITLE"
              inputTitle="title"
              inputValue={state.title}
              disabled={false}
              inputType="text"
              inputName="title"
              inputId="title"
              autocomplete="your automation title"
              inputPlaceholder="Your automation title"
              onChange={handleChange}
            />

            <WokrDashboardDescription
              title="DESCRIPTION"
              writeUp="Write a few sentences about automation job"
              name="description"
              id="description"
              row={5}
              onChange={handleChange}
              value={state.description}
            />

            <div className="border-b border-gray-900/10 pb-12 col-span-full grid grid-cols-1 sm:grid-cols-6 gap-x-6 gap-y-8 ">
              <WokrDashboardList
                htmlFor="skill"
                label="SKILL"
                categories={skill}
                setCategories={setSkill}
                categorylist={skills}
                multiple={false}
              />

              <WokrDashboardList
                htmlFor="skillLevel"
                label="SKILL LEVEL"
                categories={skillLevel}
                setCategories={setSkillLevel}
                categorylist={skillLevels}
                multiple={false}
              />
            </div>

            <div className="border-b border-gray-900/10 pb-12 col-span-full grid grid-cols-1 sm:grid-cols-6 gap-x-6 gap-y-8 ">
              <WokrDashboardList
                htmlFor="automation"
                label="AUTOMATION"
                categories={automation}
                setCategories={setAutomation}
                categorylist={automationTools}
                multiple={false}
              />

              <WokrDashboardList
                htmlFor="automationLevel"
                label="AUTOMATION LEVEL"
                categories={automationLevel}
                setCategories={setAutomationLevel}
                categorylist={automationLevels}
                multiple={false}
              />
            </div>

            <WokrDashboardList
              htmlFor="categories"
              label="CATEGORY"
              categories={categories}
              setCategories={setCategories}
              categorylist={categorylists}
              multiple={true}
            />

            <WokrDashboardList
              htmlFor="tags"
              label="TAG"
              categories={tags}
              setCategories={setTags}
              categorylist={taglists}
              multiple={true}
            />

            <WokrDashboardList
              htmlFor="servicesIncluded"
              label="SERVICE INCLUDED"
              categories={servicesIncluded}
              setCategories={setServicesIncluded}
              categorylist={includedServices}
              multiple={true}
            />

            <WokrDashboardList
              htmlFor="feeType"
              label="FEE TYPE"
              categories={feeType}
              setCategories={setFeeType}
              categorylist={feeTypes}
              multiple={false}
            />

            <WokrDashboardList
              htmlFor="deliveryTime"
              label="DELIVERY TIME (DAYS)"
              categories={deliveryTime}
              setCategories={setDeliveryTime}
              categorylist={deliveryTimes}
              multiple={false}
            />

            <WokrDashboardInput
              classname="sm:col-span-3"
              htmlFor="maxRevisions"
              label="MAX REVISIONS"
              inputTitle="maxRevisions"
              inputValue={state.maxRevisions}
              disabled={false}
              inputType="number"
              inputName="maxRevisions"
              inputId="maxRevisions"
              autocomplete="no of maxRevisions"
              inputPlaceholder="Max Revision"
              onChange={handleChange}
            />
          </div>
          <div className="mt-10 space-y-6">
            <WokrDashboardInput
              classname="col-span-full"
              htmlFor="price"
              label="PRICE (STARTING AT $)"
              inputTitle="maxRevisions"
              inputValue={state.maxRevisions}
              disabled={false}
              inputType="number"
              inputName="maxRevisions"
              inputId="maxRevisions"
              autocomplete="no of maxRevisions"
              inputPlaceholder="Max Revision"
              onChange={handleChange}
            />

            <WokrPhotoUpload
              label="FEATURED IMAGE"
              htmlFor="imageUpload"
              title="Upload a featured image"
              inputName="imageUpload"
              inputId="imageUpload"
              inputType="file"
              multiple={false}
              classname="col-span-full"
              accept="image/png, image/jpeg, image/gif, image/jpg"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files != null) {
                  setImageUpload(e.target.files[0]);
                }
              }}
              value={imageUpload != null}
            />

            <div className="flex justify-start items-center gap-2 flex-wrap">
              {url && (
                <Image
                  className="rounded-md h-auto w-auto"
                  src={url}
                  height={50}
                  width={50}
                  alt=""
                />
              )}
            </div>

            <WokrPhotoUpload
              multiple={true}
              label="GALLERY IMAGES"
              htmlFor="images"
              title="Upload gallery images"
              inputName="images"
              inputId="images"
              inputType="file"
              classname="col-span-full"
              accept="image/png, image/jpeg, image/gif, image/jpg"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files != null) {
                  const filesArray = Array.from(e.target.files);
                  setImages(filesArray);
                }
              }}
            />

            <div className="flex justify-start items-center gap-2 flex-wrap">
              {urls.map((url, i) => {
                const filename = images[i].name;
                return (
                  <Image
                    className="rounded-md h-16 w-16"
                    src={url}
                    height={50}
                    width={50}
                    key={i}
                    alt={filename}
                  />
                );
              })}
            </div>

            <WokrPhotoUpload
              multiple={false}
              label="VIDEO"
              htmlFor="videoUpload"
              title="Upload a video"
              inputName="videoUpload"
              inputId="videoUpload"
              inputType="file"
              classname="col-span-full"
              accept="video/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files != null) {
                  setVideoUpload(e.target.files[0]);
                }
              }}
              value={videoUpload != null}
            />
            <p className="text-sm">
              {videoUpload ? (
                <span className="text-green-600">
                  File name: {videoUpload.name}
                </span>
              ) : (
                "no files uploaded yet"
              )}
            </p>

            <WokrDashboardButton
              cancel={handleCancel}
              cancelText={"Cancel"}
              title="Publish"
              type="submit"
              disabled={false}
              loading={loading}
              loadingText="Publishing ..."
              preLoadingText="Publish"
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddJob;
