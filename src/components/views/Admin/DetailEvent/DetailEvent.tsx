import { Tab, Tabs } from "@nextui-org/react";
import CoverTab from "./CoverTab";
import InfoTab from "./InfoTab";
import useDetailEvent from "./useDetailEvent";
import LocationTab from "./LocationTab";

const DetailEvent = () => {
  const {
    dataEvent,
    dataDefaultRegion,
    handleUpdateEvent,
    handleUpdateInfo,
    handleUpdateLocation,
    isPendingDefaultRegion,
    isPendingMutateUpdateEvent,
    isSuccessMutateUpdateEvent,
  } = useDetailEvent();
  return (
    <Tabs aria-label="Options">
      <Tab key="cover" title="Cover">
        <CoverTab
          currentCover={dataEvent?.banner}
          isPendingUpdate={isPendingMutateUpdateEvent}
          isSuccessUpdate={isSuccessMutateUpdateEvent}
          onUpdate={handleUpdateEvent}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataEvent={dataEvent}
          isPendingUpdate={isPendingMutateUpdateEvent}
          isSuccessUpdate={isSuccessMutateUpdateEvent}
          onUpdate={handleUpdateInfo}
        />
      </Tab>
      <Tab key="location" title="location">
        <LocationTab
          dataEvent={dataEvent}
          dataDefaultRegion={dataDefaultRegion?.data?.data[0]?.name}
          isPendingDefaultRegion={isPendingDefaultRegion}
          isPendingUpdate={isPendingMutateUpdateEvent}
          isSuccessUpdate={isSuccessMutateUpdateEvent}
          onUpdate={handleUpdateLocation}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailEvent;
