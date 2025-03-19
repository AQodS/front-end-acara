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
import useUpdateTicketModal from "./useUpdateTicketModal";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ITicket } from "@/types/Ticket";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTicket: () => void;
  selectedDataTicket: ITicket | null;
  setSelectedDataTicket: Dispatch<SetStateAction<ITicket | null>>;
}

const UpdateTicketModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchTicket,
    selectedDataTicket,
    setSelectedDataTicket,
  } = props;
  const {
    control,
    errors,
    handleUpdateTicket,
    handleSubmitForm,
    isPendingMutateUpdateTicket,
    isSuccessMutateUpdateTicket,
    reset,
    setValueUpdateTicket,
  } = useUpdateTicketModal(`${selectedDataTicket?._id}`);

  useEffect(() => {
    if (isSuccessMutateUpdateTicket) {
      onClose();
      refetchTicket();
      setSelectedDataTicket(null);
    }
  }, [isSuccessMutateUpdateTicket]);

  useEffect(() => {
    if (selectedDataTicket) {
      setValueUpdateTicket("name", `${selectedDataTicket?.name}`);
      setValueUpdateTicket("price", `${selectedDataTicket?.price}`);
      setValueUpdateTicket("quantity", `${selectedDataTicket?.quantity}`);
      setValueUpdateTicket("description", `${selectedDataTicket?.description}`);
    }
  }, [selectedDataTicket]);

  const handleOnClose = () => {
    onClose();
    reset();
    setSelectedDataTicket(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleOnClose}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitForm(handleUpdateTicket)}>
        <ModalContent className="m-4">
          <ModalHeader>Update Ticket</ModalHeader>
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
              disabled={isPendingMutateUpdateTicket}
              onPress={handleOnClose}
              variant="flat"
            >
              Cancel
            </Button>
            <Button
              color="danger"
              type="submit"
              disabled={isPendingMutateUpdateTicket}
            >
              {isPendingMutateUpdateTicket ? (
                <Spinner size="sm" color="white" />
              ) : (
                "update Ticket"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default UpdateTicketModal;
