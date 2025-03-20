import {
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
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IBanner } from "@/types/Banner";

interface PropTypes {
  dataBanner: IBanner;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  onUpdate: (data: IBanner) => void;
}

const InfoTab = (props: PropTypes) => {
  const { dataBanner, isPendingUpdate, isSuccessUpdate, onUpdate } = props;
  const {
    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  } = useInfoTab();

  useEffect(() => {
    setValueUpdateInfo("title", `${dataBanner?.title}`);
    setValueUpdateInfo("isShow", `${dataBanner?.isShow}`);
  }, [dataBanner]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);
  
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Banner Information</h1>
        <p className="w-full text-small text-default-400">
          Manage information of this banner
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataBanner?.title} className="rounded-lg">
            <Controller
              control={controlUpdateInfo}
              name="title"
              render={({ field }) => (
                <Input
                  {...field}
                  defaultValue={dataBanner?.title}
                  errorMessage={errorsUpdateInfo.title?.message}
                  isInvalid={errorsUpdateInfo.title !== undefined}
                  label="Title"
                  labelPlacement="outside"
                  type="text"
                  variant="bordered"
                />
              )}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataBanner} className="rounded-lg">
            <Controller
              control={controlUpdateInfo}
              name="isShow"
              render={({ field }) => (
                <Select
                  {...field}
                  defaultSelectedKeys={[
                    dataBanner?.isShow ? "true" : "false",
                  ]}
                  disallowEmptySelection
                  errorMessage={errorsUpdateInfo.isShow?.message}
                  isInvalid={errorsUpdateInfo.isShow !== undefined}
                  label="Status"
                  labelPlacement="outside"
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
          </Skeleton>
          <Button
            className="mt-2 disabled:bg-default-500"
            color="danger"
            disabled={isPendingUpdate || !dataBanner?._id}
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
