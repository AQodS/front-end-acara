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
    isPendingMutateAddFile,
    isSuccessMutateAddCategory,
    reset,
  } = useAddCategoryModal();

  useEffect(() => {
    if (isSuccessMutateAddCategory) {
      onClose();
      refetchCategory();
    }
  }, [isSuccessMutateAddCategory]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitForm(handleAddCategory)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Category</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold">Information</p>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
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
                    onChange={(e) => {
                      onChange(e.currentTarget.files);
                    }}
                    isInvalid={errors.icon !== undefined}
                    errorMessage={errors.icon?.message}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              disabled={isPendingMutateAddCategory || isPendingMutateAddFile}
              onPress={onClose}
              variant="flat"
            >
              Cancel
            </Button>
            <Button
              color="danger"
              disabled={isPendingMutateAddCategory || isPendingMutateAddFile}
              type="submit"
            >
              {isPendingMutateAddCategory || isPendingMutateAddFile ? (
                <Spinner color="white" size="sm" />
              ) : (
                "Create category"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
