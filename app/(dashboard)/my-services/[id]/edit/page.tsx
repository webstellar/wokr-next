"use client";
import EditService from "@/components/service/EditService";
import { useJobQuery } from "@/hooks/useJobQuery";

type Props = {
  params: { id: string };
};

const EditJob = ({ params }: Props) => {
  const id = params?.id;
  const { data, error, status, isLoading } = useJobQuery(id);

  return (
    <>{isLoading ? <div>Data is Loading</div> : <EditService data={data} />}</>
  );
};

export default EditJob;
