import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteEventModal from "./useDeleteEventModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchEvent: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteEventModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchEvent,
    selectedId,
    setSelectedId,
  } = props;

  const {
    isPendingMutateDeleteEvent,
    isSuccessMutateDeleteEvent,
    mutateDeleteEvent,
  } = useDeleteEventModal();

  useEffect(() => {
    if (isSuccessMutateDeleteEvent) {
      onClose();
      refetchEvent();
    }
  }, [isSuccessMutateDeleteEvent]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Event</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this event?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            disabled={isPendingMutateDeleteEvent}
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            variant="flat"
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteEvent}
            onPress={() => mutateDeleteEvent(selectedId)}
          >
            {isPendingMutateDeleteEvent ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Event"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteEventModal;
