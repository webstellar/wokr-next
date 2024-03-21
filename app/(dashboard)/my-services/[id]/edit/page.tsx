"use client";
import EditService from "@/components/service/EditService";
import { useJobQuery } from "@/hooks/useJobQuery";
import Image from "next/image";

type Props = {
  params: { id: string };
};

const EditJob = ({ params }: Props) => {
  const id = params?.id;
  const { data, isLoading } = useJobQuery(id);

  return (
    <>
      {isLoading ? (
        <section className="mx-auto max-w-screen-2xl px-6 lg:px-8">
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
      ) : (
        <EditService data={data} id={data?._id} />
      )}
    </>
  );
};

export default EditJob;
