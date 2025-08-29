import { BreadcrumbItem, Breadcrumbs, Skeleton } from "@nextui-org/react";
import useDetailEvent from "./useDetailEvent";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { convertTime } from "@/utils/date";
import Image from "next/image";

const DetailEvent = () => {
  const { dataEvent, dataTicket, isLoadingEvent, isLoadingTicket } =
    useDetailEvent();
  return (
    <div className="px-8 md:px-0">
      <Skeleton isLoaded={!!dataEvent?.name} className="h-6 w-1/4 rounded-lg">
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/event">Event</BreadcrumbItem>
          <BreadcrumbItem>{dataEvent?.name}</BreadcrumbItem>
        </Breadcrumbs>
      </Skeleton>

      <section className="mt-4 flex flex-col gap-10 lg:flex-row">
        <div className="w-full lg:w-4/6">
          <Skeleton
            isLoaded={!!dataEvent?.name}
            className="mb-2 h-8 w-1/3 rounded-lg"
          >
            <h1 className="text-2xl font-semibold text-danger">
              {dataEvent?.name}
            </h1>
          </Skeleton>
          <Skeleton
            isLoaded={!!dataEvent?.startDate || !!dataEvent?.endDate}
            className="mb-2 h-6 w-1/2 rounded-lg"
          >
            <div className="flex items-center gap-2 text-foreground-500">
              <FaClock width={16} />
              <p>
                {convertTime(dataEvent?.startDate)} -{" "}
                {convertTime(dataEvent?.endDate)}
              </p>
            </div>
          </Skeleton>
          <Skeleton
            isLoaded={!!dataEvent?.isOnline || !!dataEvent?.location?.address}
            className="mb-4 h-10 rounded-lg"
          >
            <div className="flex items-center gap-2 text-foreground-500">
              <FaLocationDot width={16} />
              <p>
                {dataEvent?.isOnline ? "Online" : "Onsite"}
                {dataEvent?.isOnline
                  ? ""
                  : ` - ${dataEvent?.location?.address}`}
              </p>
            </div>
          </Skeleton>
          <Skeleton
            isLoaded={!!dataEvent?.banner}
            className="mb-4 aspect-video w-full rounded-lg"
          >
            <Image
              src={dataEvent?.banner && dataEvent?.banner}
              alt="cover"
              className="aspect-video w-full rounded-lg object-cover"
              width={1920}
              height={1080}
            />
          </Skeleton>
        </div>
        <div className="w-full lg:w-2/6"></div>
      </section>
    </div>
  );
};

export default DetailEvent;
