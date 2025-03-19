import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import { IEventForm, IRegency } from "@/types/Event";
import useLocationTab from "./useLocationTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  dataEvent: IEventForm;
  dataDefaultRegion: string;
  isPendingDefaultRegion: boolean;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  onUpdate: (data: IEventForm) => void;
}

const LocationTab = (props: PropTypes) => {
  const {
    dataEvent,
    dataDefaultRegion,
    isPendingDefaultRegion,
    isPendingUpdate,
    isSuccessUpdate,
    onUpdate,
  } = props;
  const {
    controlUpdateLocation,
    errorsUpdateLocation,
    handleSubmitUpdateLocation,
    resetUpdateLocation,
    setValueUpdateLocation,

    dataRegion,
    searchRegency,
    handleSearchRegion,
  } = useLocationTab();

  useEffect(() => {
    if (dataEvent) {
      setValueUpdateLocation("address", `${dataEvent?.location?.address}`);
      setValueUpdateLocation("isOnline", `${dataEvent?.isOnline}`);
      setValueUpdateLocation("region", `${dataEvent?.location?.region}`);
      setValueUpdateLocation(
        "latitude",
        `${dataEvent?.location?.coordinates[0]}`,
      );
      setValueUpdateLocation(
        "longitude",
        `${dataEvent?.location?.coordinates[1]}`,
      );
    }
  }, [dataEvent]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateLocation();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Location</h1>
        <p className="w-full text-small text-default-400">
          Manage location of this event
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateLocation(onUpdate)}
        >
          <Skeleton
            isLoaded={!!dataEvent?.location?.address}
            className="rounded-lg"
          >
            <Controller
              control={controlUpdateLocation}
              name="address"
              render={({ field }) => (
                <Input
                  {...field}
                  defaultValue={`${dataEvent?.location?.address}`}
                  errorMessage={errorsUpdateLocation.address?.message}
                  isInvalid={errorsUpdateLocation.address !== undefined}
                  label="Address"
                  labelPlacement="outside"
                  type="text"
                  variant="bordered"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
            <Controller
              control={controlUpdateLocation}
              name="isOnline"
              render={({ field }) => (
                <Select
                  {...field}
                  disallowEmptySelection
                  defaultSelectedKeys={[
                    dataEvent?.isOnline ? "true" : "false",
                  ]}
                  errorMessage={errorsUpdateLocation.isOnline?.message}
                  isInvalid={errorsUpdateLocation.isOnline !== undefined}
                  label="Online / Offline"
                  labelPlacement="outside"
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
          </Skeleton>
          <Skeleton
            isLoaded={!!dataEvent?.location?.coordinates[0]}
            className="rounded-lg"
          >
            <Controller
              control={controlUpdateLocation}
              name="latitude"
              render={({ field }) => (
                <Input
                  {...field}
                  defaultValue={`${dataEvent?.location?.coordinates[1]}`}
                  errorMessage={errorsUpdateLocation.latitude?.message}
                  isInvalid={errorsUpdateLocation.latitude !== undefined}
                  label="Latitude"
                  labelPlacement="outside"
                  type="text"
                  variant="bordered"
                />
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataEvent?.location?.coordinates[1]}
            className="rounded-lg"
          >
            <Controller
              control={controlUpdateLocation}
              name="longitude"
              render={({ field }) => (
                <Input
                  {...field}
                  defaultValue={`${dataEvent?.location?.coordinates[1]}`}
                  errorMessage={errorsUpdateLocation.longitude?.message}
                  isInvalid={errorsUpdateLocation.longitude !== undefined}
                  label="Longitude"
                  labelPlacement="outside"
                  type="text"
                  variant="bordered"
                />
              )}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataEvent?.location?.region && !isPendingDefaultRegion}
            className="rounded-lg"
          >
            {!isPendingDefaultRegion ? (
              <Controller
                control={controlUpdateLocation}
                name="region"
                render={({ field: { onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    defaultItems={
                      dataRegion?.data.data && searchRegency !== ""
                        ? dataRegion.data.data
                        : []
                    }
                    defaultInputValue={dataDefaultRegion}
                    errorMessage={errorsUpdateLocation.region?.message}
                    isInvalid={errorsUpdateLocation.region !== undefined}
                    label="City"
                    labelPlacement="outside"
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
            ) : (
              <div className="h-16 w-full" />
            )}
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

export default LocationTab;
