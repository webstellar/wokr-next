"use client";

import { auth } from "@/config/firebase";
import { getIdToken } from "firebase/auth";
import AutomationCard from "@/components/automation/AutomationCard";
import Pagination from "@/components/pagination/Pagination";
import MiniProfileCard from "@/components/profileCard/MiniProfileCard";
import { useAllJobsQuery } from "@/hooks/useAllJobsQuery";
import { useUserQuery } from "@/hooks/useUserQuery";
import { jobData } from "@/types/types";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteService, duplicateService } from "@/utils/api";
import { toast } from "react-toastify";

const Services = () => {
  const { data: jobs, status, error, isLoading } = useAllJobsQuery();
  const { data: user } = useUserQuery();
  const queryClient = useQueryClient();
  const deleteServiceMutation = useMutation({
    mutationFn: ({ id, token }: { id: string; token: string }) =>
      deleteService(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["automations"] });
      toast("Your automation service was deleted successfully", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
        position: "bottom-right",
      });
    },
  });

  const duplicateServiceMutation = useMutation({
    mutationFn: ({ id, token }: { id: string; token: string }) =>
      duplicateService(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["automations"] });
      toast("Your automation service was duplicated successfully", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
        position: "bottom-right",
      });
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const filteredJobs = jobs?.filter((job: jobData) => job.owner === user?._id);

  useEffect(() => {
    setCurrentPage(1);
  }, [jobs]);

  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredJobs?.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, itemsPerPage, filteredJobs]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (status === "pending")
    return (
      <section className="mx-auto flex flex-col justify-center items-center h-[50%]">
        <div className="my-6 flex items-center justify-center h-min">
          <Image
            src="/images/wokr-loader.gif"
            alt="loading gif"
            width={100}
            height={100}
            className="h-10 w-10"
          />
        </div>
      </section>
    );
  if (status === "error") {
    return (
      <section className="mx-auto flex flex-col justify-center items-center h-[50%]">
        <h1>Error: {JSON.stringify(error)}</h1>
      </section>
    );
  }

  const handleDeleteJob = async (id: string) => {
    const currentUser = auth.currentUser;
    const token = await getIdToken(currentUser!, true);
    deleteServiceMutation.mutate({ id, token });
  };

  const handleDuplicateJob = async (id: string) => {
    const currentUser = auth.currentUser;
    const token = await getIdToken(currentUser!, true);
    duplicateServiceMutation.mutate({ id, token });
  };

  return (
    <section className="mx-auto mb-20">
      <div className="mx-auto grid md:grid-cols-3 justify-between items-start gap-10 max-w-screen-2xl px-6 lg:px-8">
        <div className="md:col-span-2 mt-10 flex flex-col gap-y-5">
          {paginatedJobs.length > 0 ? (
            paginatedJobs.map((job: jobData) => (
              <AutomationCard
                key={job._id}
                data={job}
                deleteFunc={handleDeleteJob}
                duplicateFunc={handleDuplicateJob}
              />
            ))
          ) : (
            <div className="my-6 text-center">You have no jobs yets...</div>
          )}

          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredJobs.length}
            paginate={paginate}
            currentPage={currentPage}
          />

          <div className="rounded-2xl flex flex-row justify-center items-center py-5 bg-gray-100">
            <button type="button" title="add new service">
              <Link href="/post-service">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 45 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="22.5" cy="22.5" r="22.5" fill="#D9D9D9" />
                  <path
                    d="M22.0469 12L22.0469 32.0926"
                    stroke="#fff"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M32.0918 22.0464L11.9992 22.0464"
                    stroke="#fff"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </Link>
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-y-5">
          <MiniProfileCard data={user} />
        </div>
      </div>
    </section>
  );
};

export default Services;
