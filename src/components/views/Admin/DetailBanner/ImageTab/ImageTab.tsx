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
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IBanner } from "@/types/Banner";
import useImageTab from "./useImageTab";

interface PropTypes {
  currentImage: string;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  onUpdate: (data: IBanner) => void;
}

const ImageTab = (props: PropTypes) => {
  const { currentImage, isPendingUpdate, isSuccessUpdate, onUpdate } = props;
  const {
    handleDeleteImage,
    handleUploadImage,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    resetUpdateImage,

    controlUpdateImage,
    errorsUpdateImage,
    handleSubmitUpdateImage,

    preview,
  } = useImageTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateImage();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Banner Image</h1>
        <p className="w-full text-small text-default-400">
          Manage image of this banner
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateImage(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Current Image
            </p>
            <Skeleton isLoaded={!!currentImage} className="h-32 rounded-lg">
              <Image
                alt="image"
                className="!relative rounded-lg"
                fill
                src={currentImage}
              />
            </Skeleton>
          </div>
          <Controller
            control={controlUpdateImage}
            name="image"
            render={({ field: { onChange, value, ...field } }) => (
              <InputFile
                {...field}
                errorMessage={errorsUpdateImage.image?.message}
                isDeleting={isPendingMutateDeleteFile}
                isDropable
                isInvalid={errorsUpdateImage.image !== undefined}
                isUploading={isPendingMutateUploadFile}
                label={
                  <p className="mb-2 text-sm font-medium text-default-700">
                    Upload New Image
                  </p>
                }
                onDelete={() => handleDeleteImage(onChange)}
                onUpload={(files) => handleUploadImage(files, onChange)}
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

export default ImageTab;
