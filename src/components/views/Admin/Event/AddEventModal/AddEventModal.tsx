import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import useAddEventModal from "./useAddEventModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";
import { ICategory } from "@/types/Category";
import { IRegency } from "@/types/Event";
import { getLocalTimeZone, now } from "@internationalized/date";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchEvent: () => void;
}

const AddEventModal = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchEvent } = props;
  const {
    control,
    errors,
    handleAddEvent,
    handleSubmitForm,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,

    handleDeleteBanner,
    handleOnClose,
    handleUploadBanner,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    preview,

    dataCategory,
    dataRegion,
    handleSearchRegion,
    searchRegency,
  } = useAddEventModal();

  useEffect(() => {
    if (isSuccessMutateAddEvent) {
      onClose();
      refetchEvent();
    }
  }, [isSuccessMutateAddEvent]);

  const disabledSubmit =
    isPendingMutateAddEvent ||
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
      <form onSubmit={handleSubmitForm(handleAddEvent)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Event</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Information</p>
              <div className="mb-4 flex flex-col gap-4">
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
                      variant="bordered"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="slug"
                  render={({ field }) => (
                    <Input
                      {...field}
                      errorMessage={errors.slug?.message}
                      isInvalid={errors.slug !== undefined}
                      label="Slug"
                      variant="bordered"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="category"
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={dataCategory?.data.data || []}
                      errorMessage={errors.category?.message}
                      isInvalid={errors.category !== undefined}
                      label="Category"
                      onSelectionChange={(value) => onChange(value)}
                      placeholder="Seacrh category ..."
                      variant="bordered"
                    >
                      {(category: ICategory) => (
                        <AutocompleteItem key={`${category._id}`}>
                          {category.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
                <Controller
                  control={control}
                  name="startDate"
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      defaultValue={now(getLocalTimeZone())}
                      errorMessage={errors.startDate?.message}
                      hideTimeZone
                      isInvalid={errors.startDate !== undefined}
                      label="Start Date"
                      showMonthAndYearPickers
                      variant="bordered"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="endDate"
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      defaultValue={now(getLocalTimeZone())}
                      errorMessage={errors.endDate?.message}
                      hideTimeZone
                      isInvalid={errors.endDate !== undefined}
                      label="End Date"
                      showMonthAndYearPickers
                      variant="bordered"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="isPublished"
                  render={({ field }) => (
                    <Select
                      {...field}
                      disallowEmptySelection
                      errorMessage={errors.isPublished?.message}
                      isInvalid={errors.isPublished !== undefined}
                      label="Status"
                      variant="bordered"
                    >
                      <SelectItem key="true" value="true">
                        Publish
                      </SelectItem>
                      <SelectItem key="false" value="false">
                        Draft
                      </SelectItem>
                    </Select>
                  )}
                />
                <Controller
                  control={control}
                  name="isFeatured"
                  render={({ field }) => (
                    <Select
                      {...field}
                      disallowEmptySelection
                      errorMessage={errors.isFeatured?.message}
                      isInvalid={errors.isFeatured !== undefined}
                      label="Featured"
                      variant="bordered"
                    >
                      <SelectItem key="true" value="true">
                        Yes
                      </SelectItem>
                      <SelectItem key="false" value="false">
                        No
                      </SelectItem>
                    </Select>
                  )}
                />
                <Controller
                  control={control}
                  name="isOnline"
                  render={({ field }) => (
                    <Select
                      {...field}
                      disallowEmptySelection
                      errorMessage={errors.isOnline?.message}
                      isInvalid={errors.isOnline !== undefined}
                      label="Online / Offline"
                      variant="bordered"
                    >
                      <SelectItem key="true" value="true">
                        Online
                      </SelectItem>
                      <SelectItem key="false" value="false">
                        Offline
                      </SelectItem>
                    </Select>
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
              <p className="text-sm font-bold">Location</p>
              <div className="mb-4 flex flex-col gap-4">
                <Controller
                  control={control}
                  name="region"
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={
                        dataRegion?.data.data && searchRegency !== ""
                          ? dataRegion.data.data
                          : []
                      }
                      errorMessage={errors.region?.message}
                      isInvalid={errors.region !== undefined}
                      label="City"
                      onInputChange={(search) => handleSearchRegion(search)}
                      onSelectionChange={(value) => onChange(value)}
                      placeholder="Seacrh regency ..."
                      variant="bordered"
                    >
                      {(regency: IRegency) => (
                        <AutocompleteItem key={`${regency.id}`}>
                          {regency.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
                <Controller
                  control={control}
                  name="latitude"
                  render={({ field }) => (
                    <Input
                      {...field}
                      errorMessage={errors.latitude?.message}
                      isInvalid={errors.latitude !== undefined}
                      label="Latitude"
                      variant="bordered"
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="longitude"
                  render={({ field }) => (
                    <Input
                      {...field}
                      errorMessage={errors.longitude?.message}
                      isInvalid={errors.longitude !== undefined}
                      label="Longitude"
                      variant="bordered"
                    />
                  )}
                />
              </div>
              <p className="text-sm font-bold">Cover</p>
              <Controller
                control={control}
                name="banner"
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    errorMessage={errors.banner?.message}
                    isDeleting={isPendingMutateDeleteFile}
                    isDropable
                    isInvalid={errors.banner !== undefined}
                    isUploading={isPendingMutateUploadFile}
                    onDelete={() => handleDeleteBanner(onChange)}
                    onUpload={(files) => handleUploadBanner(files, onChange)}
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
              {isPendingMutateAddEvent ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Event"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddEventModal;
