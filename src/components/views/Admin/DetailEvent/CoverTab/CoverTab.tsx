import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import Image from "next/image";
import useCoverTab from "./useCoverTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IEvent } from "@/types/Event";

interface PropTypes {
  currentCover: string;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  onUpdate: (data: IEvent) => void;
}

const CoverTab = (props: PropTypes) => {
  const { currentCover, isPendingUpdate, isSuccessUpdate, onUpdate } = props;
  const {
    handleDeleteCover,
    handleUploadCover,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    resetUpdateCover,

    controlUpdateCover,
    errorsUpdateCover,
    handleSubmitUpdateCover,

    preview,
  } = useCoverTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateCover();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Cover</h1>
        <p className="w-full text-small text-default-400">
          Manage cover of this event
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateCover(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Current Cover
            </p>
            <Skeleton
              isLoaded={!!currentCover}
              className="aspect-video rounded-lg"
            >
              <Image
                alt="cover"
                className="!relative rounded-lg"
                fill
                src={currentCover}
              />
            </Skeleton>
          </div>
          <Controller
            control={controlUpdateCover}
            name="banner"
            render={({ field: { onChange, value, ...field } }) => (
              <InputFile
                {...field}
                errorMessage={errorsUpdateCover.banner?.message}
                isDeleting={isPendingMutateDeleteFile}
                isDropable
                isInvalid={errorsUpdateCover.banner !== undefined}
                isUploading={isPendingMutateUploadFile}
                label={
                  <p className="mb-2 text-sm font-medium text-default-700">
                    Upload New Cover
                  </p>
                }
                onDelete={() => handleDeleteCover(onChange)}
                onUpload={(files) => handleUploadCover(files, onChange)}
                preview={typeof preview === "string" ? preview : ""}
              />
            )}
          />
          <Button
            className="mt-2 disabled:bg-default-500"
            color="danger"
            disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
            type="submit"
          >
            {isPendingUpdate ? (
              <Spinner color="white" size="sm" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default CoverTab;
