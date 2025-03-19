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
import useAddTicketModal from "./useAddTicketModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTicket: () => void;
}

const AddTicketModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchTicket } = props;
  const {
    control,
    errors,
    handleAddTicket,
    handleSubmitForm,
    isPendingMutateAddTicket,
    isSuccessMutateAddTicket,
    reset,
  } = useAddTicketModal();

  useEffect(() => {
    if (isSuccessMutateAddTicket) {
      onClose();
      refetchTicket();
    }
  }, [isSuccessMutateAddTicket]);

  const handleOnClose = () => {
    onClose();
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleOnClose}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitForm(handleAddTicket)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Ticket</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold">Information</p>
              <div className="flex flex-col gap-4">
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
                  name="price"
                  render={({ field }) => (
                    <Input
                      {...field}
                      errorMessage={errors.price?.message}
                      isInvalid={errors.price !== undefined}
                      label="Price"
                      type="text"
                      variant="bordered"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="quantity"
                  render={({ field }) => (
                    <Input
                      {...field}
                      errorMessage={errors.quantity?.message}
                      isInvalid={errors.quantity !== undefined}
                      label="Quantity"
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
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              disabled={isPendingMutateAddTicket}
              onPress={handleOnClose}
              variant="flat"
            >
              Cancel
            </Button>
            <Button
              color="danger"
              type="submit"
              disabled={isPendingMutateAddTicket}
            >
              {isPendingMutateAddTicket ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Ticket"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddTicketModal;
