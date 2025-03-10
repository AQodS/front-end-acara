import { IEventForm } from "@/types/Event";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ICategory } from "@/types/Category";
import { toInputDate } from "@/utils/date";

interface PropTypes {
  dataEvent: IEventForm;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  onUpdate: (data: IEventForm) => void;
}

const InfoTab = (props: PropTypes) => {
  const { dataEvent, isPendingUpdate, isSuccessUpdate, onUpdate } = props;
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,

    dataCategory,
  } = useInfoTab();

  useEffect(() => {
    if (dataEvent) {
      console.log(dataEvent.startDate);
      setValueUpdateInfo("name", `${dataEvent?.name}`);
      setValueUpdateInfo("description", `${dataEvent?.description}`);
      setValueUpdateInfo("slug", `${dataEvent?.slug}`);
      setValueUpdateInfo("category", `${dataEvent?.category}`);
      setValueUpdateInfo("startDate", toInputDate(`${dataEvent?.startDate}`));
      setValueUpdateInfo("endDate", toInputDate(`${dataEvent?.endDate}`));
      setValueUpdateInfo("isPublished", `${dataEvent?.isPublished}`);
      setValueUpdateInfo("isFeatured", `${dataEvent?.isFeatured}`);
    }
  }, [dataEvent]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Information</h1>
        <p className="w-full text-small text-default-400">
          Manage information of this event
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataEvent?.name} className="rounded-lg">
            <Controller
              control={controlUpdateInfo}
              name="name"
              render={({ field }) => (
                <Input
                  {...field}
                  defaultValue={dataEvent?.name}
                  errorMessage={errorsUpdateInfo.name?.message}
                  isInvalid={errorsUpdateInfo.name !== undefined}
                  label="Name"
                  labelPlacement="outside"
                  type="text"
                  variant="bordered"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent?.slug} className="rounded-lg">
            <Controller
              control={controlUpdateInfo}
              name="slug"
              render={({ field }) => (
                <Input
                  {...field}
                  defaultValue={dataEvent?.slug}
                  errorMessage={errorsUpdateInfo.slug?.message}
                  isInvalid={errorsUpdateInfo.slug !== undefined}
                  label="Slug"
                  labelPlacement="outside"
                  type="text"
                  variant="bordered"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent?.category} className="rounded-lg">
            <Controller
              control={controlUpdateInfo}
              name="category"
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={dataCategory?.data.data || []}
                  defaultSelectedKey={dataEvent?.category}
                  errorMessage={errorsUpdateInfo.category?.message}
                  isInvalid={errorsUpdateInfo.category !== undefined}
                  label="Category"
                  labelPlacement="outside"
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
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent?.startDate} className="rounded-lg">
            <Controller
              control={controlUpdateInfo}
              name="startDate"
              render={({ field }) => (
                <DatePicker
                  {...field}
                  defaultValue={toInputDate(`${dataEvent?.startDate}`)}
                  errorMessage={errorsUpdateInfo.startDate?.message}
                  hideTimeZone
                  isInvalid={errorsUpdateInfo.startDate !== undefined}
                  label="Start Date"
                  labelPlacement="outside"
                  showMonthAndYearPickers
                  variant="bordered"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent?.endDate} className="rounded-lg">
            <Controller
              control={controlUpdateInfo}
              name="endDate"
              render={({ field }) => (
                <DatePicker
                  {...field}
                  defaultValue={toInputDate(`${dataEvent?.endDate}`)}
                  errorMessage={errorsUpdateInfo.startDate?.message}
                  hideTimeZone
                  isInvalid={errorsUpdateInfo.startDate !== undefined}
                  label="End Date"
                  labelPlacement="outside"
                  showMonthAndYearPickers
                  variant="bordered"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
            <Controller
              control={controlUpdateInfo}
              name="isPublished"
              render={({ field }) => (
                <Select
                  {...field}
                  disallowEmptySelection
                  defaultSelectedKeys={[
                    dataEvent?.isPublished ? "true" : "false",
                  ]}
                  errorMessage={errorsUpdateInfo.isPublished?.message}
                  isInvalid={errorsUpdateInfo.isPublished !== undefined}
                  label="Status"
                  labelPlacement="outside"
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
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
            <Controller
              control={controlUpdateInfo}
              name="isFeatured"
              render={({ field }) => (
                <Select
                  {...field}
                  disallowEmptySelection
                  defaultSelectedKeys={[
                    dataEvent?.isFeatured ? "true" : "false",
                  ]}
                  errorMessage={errorsUpdateInfo.isFeatured?.message}
                  isInvalid={errorsUpdateInfo.isFeatured !== undefined}
                  label="Featured"
                  labelPlacement="outside"
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
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent?.description} className="rounded-lg">
            <Controller
              control={controlUpdateInfo}
              name="description"
              render={({ field }) => (
                <Textarea
                  {...field}
                  defaultValue={dataEvent?.description}
                  errorMessage={errorsUpdateInfo.description?.message}
                  isInvalid={errorsUpdateInfo.description !== undefined}
                  label="Description"
                  labelPlacement="outside"
                  variant="bordered"
                />
              )}
            />
          </Skeleton>
          <Button
            className="mt-2 disabled:bg-default-500"
            color="danger"
            disabled={isPendingUpdate || !dataEvent?._id}
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

export default InfoTab;
