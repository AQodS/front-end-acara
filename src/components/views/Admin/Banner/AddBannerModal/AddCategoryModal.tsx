import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import useAddCategoryModal from "./useAddCategoryModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchCategory: () => void;
}

const AddCategoryModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchCategory } = props;
  const {
    control,
    errors,
    handleAddCategory,
    handleSubmitForm,
    isPendingMutateAddCategory,
    isSuccessMutateAddCategory,

    handleDeleteIcon,
    handleOnClose,
    handleUploadIcon,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    preview,
  } = useAddCategoryModal();

  useEffect(() => {
    if (isSuccessMutateAddCategory) {
      onClose();
      refetchCategory();
    }
  }, [isSuccessMutateAddCategory]);

  const disabledSubmit =
    isPendingMutateAddCategory ||
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
      <form onSubmit={handleSubmitForm(handleAddCategory)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Category</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Information</p>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    className="mb-2"
                    errorMessage={errors.name?.message}
                    isInvalid={errors.name !== undefined}
                    label="Name"
                    type="text"
                    variant="bordered"
                  />
                )}
              />
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="mb-2"
                    errorMessage={errors.description?.message}
                    isInvalid={errors.description !== undefined}
                    label="Description"
                    variant="bordered"
                  />
                )}
              />
              <p className="text-sm font-bold">Icon</p>
              <Controller
                control={control}
                name="icon"
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    errorMessage={errors.icon?.message}
                    isDeleting={isPendingMutateDeleteFile}
                    isDropable
                    isInvalid={errors.icon !== undefined}
                    isUploading={isPendingMutateUploadFile}
                    onDelete={() => handleDeleteIcon(onChange)}
                    onUpload={(files) => handleUploadIcon(files, onChange)}
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
              {isPendingMutateAddCategory ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Category"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
