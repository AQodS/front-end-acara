import { ICategory } from "@/types/Category";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface PropTypes {
  dataCategory: ICategory;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  onUpdate: (data: ICategory) => void;
}

const InfoTab = (props: PropTypes) => {
  const { dataCategory, isPendingUpdate, isSuccessUpdate, onUpdate } = props;
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    setValueUpdateInfo("name", `${dataCategory?.name}`);
    setValueUpdateInfo("description", `${dataCategory?.description}`);
  }, [dataCategory]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);
  
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Information</h1>
        <p className="w-full text-small text-default-400">
          Manage information of this category
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
            <Controller
              control={controlUpdateInfo}
              name="name"
              render={({ field }) => (
                <Input
                  {...field}
                  className="mt-2"
                  defaultValue={dataCategory?.name}
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
          <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
            <Controller
              control={controlUpdateInfo}
              name="description"
              render={({ field }) => (
                <Textarea
                  {...field}
                  defaultValue={dataCategory?.description}
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
            disabled={isPendingUpdate || !dataCategory?._id}
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
