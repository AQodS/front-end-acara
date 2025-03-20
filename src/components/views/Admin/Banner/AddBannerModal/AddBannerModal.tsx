import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import useAddBannerModal from "./useAddBannerModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchBanner: () => void;
}

const AddBannerModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchBanner } = props;
  const {
    control,
    errors,
    handleAddBanner,
    handleSubmitForm,
    isPendingMutateAddBanner,
    isSuccessMutateAddBanner,

    handleDeleteImage,
    handleOnClose,
    handleUploadImage,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    preview,
  } = useAddBannerModal();

  useEffect(() => {
    if (isSuccessMutateAddBanner) {
      onClose();
      refetchBanner();
    }
  }, [isSuccessMutateAddBanner]);

  const disabledSubmit =
    isPendingMutateAddBanner ||
    isPendingMutateDeleteFile ||
    isPendingMutateUploadFile;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => handleOnClose(onClose)}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitForm(handleAddBanner)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Banner</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold">Information</p>
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    errorMessage={errors.title?.message}
                    isInvalid={errors.title !== undefined}
                    label="Title"
                    type="text"
                    variant="bordered"
                  />
                )}
              />
              <Controller
                control={control}
                name="isShow"
                render={({ field }) => (
                  <Select
                    {...field}
                    disallowEmptySelection
                    errorMessage={errors.isShow?.message}
                    isInvalid={errors.isShow !== undefined}
                    label="Status"
                    variant="bordered"
                  >
                    <SelectItem key="true" value="true">
                      Show
                    </SelectItem>
                    <SelectItem key="false" value="false">
                      Hide
                    </SelectItem>
                  </Select>
                )}
              />
              <p className="text-sm font-bold">Image</p>
              <Controller
                control={control}
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    errorMessage={errors.image?.message}
                    isDeleting={isPendingMutateDeleteFile}
                    isDropable
                    isInvalid={errors.image !== undefined}
                    isUploading={isPendingMutateUploadFile}
                    onDelete={() => handleDeleteImage(onChange)}
                    onUpload={(files) => handleUploadImage(files, onChange)}
                    preview={typeof preview === "string" ? preview : ""}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              disabled={disabledSubmit}
              onPress={() => handleOnClose(onClose)}
              variant="flat"
            >
              Cancel
            </Button>
            <Button color="danger" type="submit" disabled={disabledSubmit}>
              {isPendingMutateAddBanner ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Banner"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddBannerModal;
