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
import useIconTab from "./useIconTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ICategory } from "@/types/Category";

interface PropTypes {
  currentIcon: string;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  onUpdate: (data: ICategory) => void;
}

const IconTab = (props: PropTypes) => {
  const { currentIcon, isPendingUpdate, isSuccessUpdate, onUpdate } = props;
  const {
    handleDeleteIcon,
    handleUploadIcon,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    resetUpdateIcon,

    controlUpdateIcon,
    errorsUpdateIcon,
    handleSubmitUpdateIcon,

    preview,
  } = useIconTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateIcon();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Icon</h1>
        <p className="w-full text-small text-default-400">
          Manage icon of this category
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateIcon(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">Current Icon</p>
            <Skeleton
              isLoaded={!!currentIcon}
              className="aspect-square rounded-lg"
            >
              <Image alt="icon" className="!relative" fill src={currentIcon} />
            </Skeleton>
          </div>
          <Controller
            control={controlUpdateIcon}
            name="icon"
            render={({ field: { onChange, value, ...field } }) => (
              <InputFile
                {...field}
                errorMessage={errorsUpdateIcon.icon?.message}
                isDeleting={isPendingMutateDeleteFile}
                isDropable
                isInvalid={errorsUpdateIcon.icon !== undefined}
                isUploading={isPendingMutateUploadFile}
                label={
                  <p className="mb-2 text-sm font-medium text-default-700">
                    Upload New Icon
                  </p>
                }
                onDelete={() => handleDeleteIcon(onChange)}
                onUpload={(files) => handleUploadIcon(files, onChange)}
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

export default IconTab;
