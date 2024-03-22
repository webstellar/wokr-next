"use client";

import { useState } from "react";
import { auth, storage } from "@/config/firebase";
import { getIdToken } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import {
  automationTools,
  automationLevels,
  feeTypes,
  deliveryTimes,
  categorylists,
  includedServices,
  tagOptions,
  feeList,
  deliveryList,
  statusList,
} from "../../data/data";
import { useRouter } from "next/navigation";
import { createService } from "@/utils/api";
import {
  WokrDashboardButton,
  WokrDashboardDescription,
  WokrDashboardInput,
  WokrDashboardList,
  WokrDashboardSelect,
  WokrDashboardServiceButton,
  WokrDashboardSingleList,
  WokrPhotoUpload,
} from "../formfields/FormFields";
import Image from "next/image";
import CreatableSelect from "react-select/creatable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jobData } from "@/types/types";

type valueProps = {
  [key: string]: string;
};

const initState: valueProps = {
  title: "",
  description: "",
  price: "",
  maxRevisions: "",
  videoUrl: "",
};

const AddService = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const addServiceMutation = useMutation({
    mutationFn: ({ formData, token }: { formData: jobData; token: string }) =>
      createService(formData, token),
    onSuccess: (data) => {
      queryClient.setQueryData(["automationJob", data._id], data);
      toast("Congrats your automation job is live!", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
        position: "bottom-right",
      });
      router.push(`/automations/${data.title}?_id=${data._id}`); //dynamic routing
    },
  });

  const [formState, setFormState] = useState(initState);
  const [feeType, setFeeType] = useState(feeList[0]);
  const [deliveryTime, setDeliveryTime] = useState(deliveryList[0]);
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [servicesIncluded, setServicesIncluded] = useState([
    includedServices[0],
  ]);
  const [categories, setCategories] = useState([categorylists[0]]); //array
  const [tags, setTags] = useState([tagOptions[0]]); //array
  const [images, setImages] = useState<File[]>([]);
  const [automationLists, setAutomationLists] = useState([
    { automation: automationTools[0], automationLevel: automationLevels[0] },
  ]);
  const [status, setStatus] = useState(statusList[0]);

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
        automation: { id: 0, value: "", label: "Select an automation tool" },
        automationLevel: { id: 0, value: "", label: "Select automation level" },
      },
    ]);
  };

  const subtractAutomationField = (indexToRemove: number) => {
    setAutomationLists((currentTools) =>
      currentTools.filter((_, index) => index !== indexToRemove)
    );
  };

  const urls = images.map((file) => URL.createObjectURL(file));
  let url = null;
  if (imageUpload instanceof File) {
    url = URL.createObjectURL(imageUpload);
  }

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (imageUpload == null) return;

    try {
      const currentUser = auth.currentUser;
      const token: string = await getIdToken(currentUser!, true);

      if (currentUser) {
        const imageRef = ref(storage, `images/${imageUpload?.name + v4()}`);
        await uploadBytes(imageRef, imageUpload);

        const uploadPromises = images.map(async (image) => {
          const imageRef = ref(storage, `images/${image?.name + v4()}`);
          await uploadBytes(imageRef, image);
          return getDownloadURL(imageRef);
        });

        const imageUrls = await Promise.all(uploadPromises);
        const imageUrl = await getDownloadURL(imageRef);

        const tranformedTools = automationLists.map(
          ({ automation, automationLevel }) => ({
            automation: automation.value,
            automationLevel: automationLevel.value,
          })
        );

        const formData: jobData = {
          servicesIncluded:
            servicesIncluded.map((service) => ({
              name: service.value,
            })) || null,
          categories: categories.map((category) => ({ name: category.value })),
          tags: tags.map((tag) => ({ name: tag.value })),
          email: currentUser?.email,
          title: formState?.title,
          description: formState?.description,
          price: formState?.price,
          deliveryTime: deliveryTime,
          maxRevisions: formState?.maxRevisions,
          images: imageUrls.map((url) => ({ url })),
          video: formState?.videoUrl,
          featuredImage: imageUrl,
          fee: feeType,
          tools: tranformedTools,
        };

        addServiceMutation.mutate({ formData, token });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mx-auto mb-20">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto grid md:grid-cols-3 justify-start items-start gap-10 max-w-screen-2xl px-6 lg:px-8">
          <div className="md:col-span-2 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <WokrDashboardInput
              labelclass="required"
              required={true}
              classname="col-span-full"
              htmlFor="title"
              label="Title"
              inputTitle="title"
              inputValue={formState.title}
              disabled={false}
              inputType="text"
              inputName="title"
              inputId="title"
              autocomplete="your automation title"
              inputPlaceholder="Your automation title"
              onChange={handleChange}
            />

            <WokrDashboardDescription
              labelclass="required"
              required={true}
              title="Description"
              writeUp="Write a few sentences about automation job"
              name="description"
              id="description"
              row={5}
              onChange={handleChange}
              value={formState.description}
            />

            <div className="border-b border-gray-900/10 pb-12 col-span-full">
              <h2 className="text-base font-semibold leading-7 mb-5 text-gray-900">
                AUTOMATION TOOLS
              </h2>

              <div>
                {automationLists.map((field, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 gap-x-6 md:gap-y-8 sm:grid-cols-11 justify-between items-center w-full mb-4"
                  >
                    <WokrDashboardSelect
                      labelclass="required"
                      required={true}
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
                      labelclass="required"
                      required={true}
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
                  className="w-auto flex items-center justify-center text-center mt-4 px-2 py-1.5 rounded-md bg-gray-300 text-gray-500 text-sm"
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

            <WokrDashboardList
              labelclass="required"
              htmlFor="categories"
              label="Category"
              categories={categories}
              setCategories={setCategories}
              categorylist={categorylists}
              multiple={true}
              required={true}
            />

            <div className="sm:col-span-3">
              <label
                htmlFor="tags"
                className="required block text-sm font-medium leading-6 text-gray-900"
              >
                Tags
              </label>
              <div className="relative mt-2">
                <CreatableSelect
                  isMulti
                  options={tagOptions}
                  defaultValue={tags}
                  onChange={(e: any) => setTags(e)}
                />
              </div>
            </div>

            <WokrDashboardList
              htmlFor="servicesIncluded"
              label="Service Included"
              categories={servicesIncluded}
              setCategories={setServicesIncluded}
              categorylist={includedServices}
              multiple={true}
            />
            <WokrDashboardSingleList
              htmlFor="feeType"
              label="Fee Type"
              value={feeType}
              onChange={setFeeType}
              lists={feeList}
              multiple={false}
              required={true}
            />

            <WokrDashboardSingleList
              htmlFor="deliveryTime"
              label="Delivery Time (days)"
              value={deliveryTime}
              onChange={setDeliveryTime}
              lists={deliveryList}
              multiple={false}
              required={true}
            />

            <WokrDashboardInput
              classname="sm:col-span-3"
              htmlFor="maxRevisions"
              label="Max Revisions"
              inputTitle="maxRevisions"
              inputValue={formState.maxRevisions}
              disabled={false}
              inputType="number"
              inputName="maxRevisions"
              inputId="maxRevisions"
              autocomplete="no of maxRevisions"
              inputPlaceholder="Max Revision"
              onChange={handleChange}
              labelclass="required"
              required={true}
            />
          </div>

          <div className="mt-10 md:space-y-6">
            <WokrDashboardServiceButton
              onChange={setStatus}
              value={status}
              options={statusList}
              multiple={false}
              title="Save Button"
              type="submit"
              disabled={loading ? true : false}
              loading={loading ? true : false}
              loadingText="Saving..."
              preLoadingText="Save"
            />
            <WokrDashboardInput
              classname="col-span-full"
              htmlFor="price"
              label="Price (Starting At $10)"
              labelclass="required"
              required={true}
              inputTitle="price"
              inputValue={formState.price}
              disabled={false}
              inputType="number"
              inputName="price"
              inputId="price"
              autocomplete="value for job"
              inputPlaceholder="10"
              onChange={handleChange}
            />

            <WokrPhotoUpload
              labelclass="required"
              required={true}
              label="Featured Image"
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
              label="Gallery Images"
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

            <WokrDashboardInput
              classname="col-span-full"
              htmlFor="videoUrl"
              label="Video Url"
              inputTitle="videoUrl"
              inputValue={formState.videoUrl}
              disabled={false}
              inputType="text"
              inputName="videoUrl"
              inputId="videoUrl"
              autocomplete="video url"
              inputPlaceholder="Video url"
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddService;
