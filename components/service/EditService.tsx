"use client";

import { useState } from "react";
import { auth, storage } from "@/config/firebase";
import { getIdToken } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import {
  categorylists,
  includedServices,
  tagOptions,
  toolList,
  toolLevelList,
  statusList,
  deliveryList,
  feeList,
} from "../../data/data";
import { useRouter } from "next/navigation";
import { updateService } from "@/utils/api";
import {
  WokrDashboardDescription,
  WokrDashboardInput,
  WokrDashboardList,
  WokrDashboardSelector,
  WokrDashboardServiceButton,
  WokrDashboardSingleList,
  WokrPhotoUpload,
} from "../formfields/FormFields";
import Image from "next/image";
import CreatableSelect from "react-select/creatable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jobData } from "@/types/types";

interface jobProps {
  id: string;
  data: jobData;
}

const EditService = (data: jobProps) => {
  const derivedCategories = data?.data?.categories;
  const derivedTags = data?.data?.tags;
  const derivedServices = data?.data?.servicesIncluded;
  const derivedTools = data?.data?.tools;

  let originalUrl = data?.data?.featuredImage;
  let originalImagesUrls = data?.data?.images;
  let originalStatus = data?.data?.status;

  const initialToolSets = derivedTools.map(
    (set: { automation: string; automationLevel: string }) => ({
      automation: toolList.includes(set.automation)
        ? set.automation
        : "Select Automation",
      automationLevel: toolLevelList.includes(set.automationLevel)
        ? set.automationLevel
        : "Select Level",
    })
  );

  const mappedCategories = derivedCategories.map(
    (dc: { name: string; _id: any }) => {
      const category = categorylists.find((cl) => cl.value === dc.name);
      return {
        id: dc._id,
        value: dc.name,
        label: dc.name,
      };
    }
  );
  const mappedTags = derivedTags.map((dc: { name: string; _id: any }) => {
    const tags = tagOptions.find((cl) => cl.value === dc.name);
    return {
      id: dc._id,
      value: dc.name,
      label: dc.name,
    };
  });

  const mappedServices = derivedServices.map(
    (dc: { name: string; _id: any }) => {
      const category = includedServices.find((cl) => cl.value === dc.name);
      return {
        id: dc._id,
        value: dc.name,
      };
    }
  );

  const router = useRouter();
  const queryClient = useQueryClient();
  const editPostMutation = useMutation({
    mutationFn: ({
      id,
      formData,
      token,
    }: {
      id: string;
      formData: jobData;
      token: string;
    }) => updateService(id, formData, token),
    onSuccess: (data) => {
      queryClient.setQueryData(["automationJob", data._id], data);
      queryClient.invalidateQueries({ queryKey: ["automations"] });
      toast("Congrats your automation service is updated!", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
        position: "bottom-right",
      });
      router.push(`/automations/${data.title}?_id=${data._id}`); //dynamic routing
    },
  });

  const [formState, setFormState] = useState({
    title: data.data.title,
    description: data.data.description,
    price: data.data.price,
    maxRevisions: data.data.maxRevisions,
    videoUrl: data.data.video,
  });
  const [feeType, setFeeType] = useState(data.data.fee || feeList[0]);
  const [deliveryTime, setDeliveryTime] = useState(
    data.data.deliveryTime || deliveryList[0]
  );
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [servicesIncluded, setServicesIncluded] = useState(mappedServices);
  const [categories, setCategories] = useState(mappedCategories);
  const [tags, setTags] = useState(mappedTags);
  const [images, setImages] = useState<File[]>([]);
  const [automationLists, setAutomationLists] = useState(initialToolSets);
  const [status, setStatus] = useState(originalStatus || statusList[0]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const id = data?.data?._id!;

    //if (imageUpload == null) return;
    //image is not compulsory for update

    try {
      const currentUser = auth.currentUser;
      const token: string = await getIdToken(currentUser!, true);

      if (currentUser) {
        const imageRef = ref(storage, `images/${imageUpload?.name + v4()}`);
        await uploadBytes(imageRef, imageUpload!);

        const uploadPromises = images.map(async (image) => {
          const imageRef = ref(storage, `images/${image?.name + v4()}`);
          await uploadBytes(imageRef, image);
          return getDownloadURL(imageRef);
        });

        const imageUrls = await Promise.all(uploadPromises);
        const imageUrl = await getDownloadURL(imageRef);

        const formData: jobData = {
          servicesIncluded: servicesIncluded.map((service: { value: any }) => ({
            name: service.value,
          })),
          categories: categories.map((category: { value: any }) => ({
            name: category.value,
          })),
          tags: tags.map((tag: { value: any }) => ({ name: tag.value })),
          email: currentUser?.email,
          title: formState?.title,
          description: formState?.description,
          price: formState?.price,
          deliveryTime: deliveryTime,
          maxRevisions: formState?.maxRevisions,
          images:
            images.length === 0
              ? originalImagesUrls
              : imageUrls.map((url) => ({ url })),
          video: formState?.videoUrl,
          featuredImage: imageUpload === null ? originalUrl : imageUrl,
          fee: feeType,
          tools: automationLists || null,
          status: status,
        };

        editPostMutation.mutate({ id, formData, token });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mx-auto mb-20">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto grid md:grid-cols-3 justify-start items-start gap-10 max-w-screen-2xl px-6 lg:px-8">
          <div className="md:-order-1 order-1 md:col-span-2 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                {automationLists?.map((field: any, index: any) => (
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
                          <circle cx="22.5" cy="22.5" r="22.5" fill="#D9D9D9" />
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
              required={true}
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
              required={true}
              labelclass="required"
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
              labelclass="required"
              required={true}
              label="Price (Starting At $10)"
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
              required={originalUrl == "" ? true : false}
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
              {url ? (
                <Image
                  className="rounded-md h-auto w-auto"
                  src={url}
                  height={50}
                  width={50}
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
              {urls.length > 0
                ? urls.map((url, i) => {
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
                  })
                : originalImagesUrls.map(
                    (image: { url: string; _id: string }) => (
                      <Image
                        className="rounded-md h-16 w-16"
                        src={image.url}
                        height={50}
                        width={50}
                        key={image._id}
                        alt="images"
                      />
                    )
                  )}
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

export default EditService;
