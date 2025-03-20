import { Tab, Tabs } from "@nextui-org/react";
import ImageTab from "./ImageTab";
import InfoTab from "./InfoTab";
import useDetailBanner from "./useDetailBanner";

const DetailBanner = () => {
  const {
    dataBanner,
    handleUpdateBanner,
    isPendingMutateUpdateBanner,
    isSuccessMutateUpdateBanner,
  } = useDetailBanner();
  return (
    <Tabs aria-label="Options">
      <Tab key="image" title="Image">
        <ImageTab
          currentImage={dataBanner?.image}
          isPendingUpdate={isPendingMutateUpdateBanner}
          isSuccessUpdate={isSuccessMutateUpdateBanner}
          onUpdate={handleUpdateBanner}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataBanner={dataBanner}
          isPendingUpdate={isPendingMutateUpdateBanner}
          isSuccessUpdate={isSuccessMutateUpdateBanner}
          onUpdate={handleUpdateBanner}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailBanner;
