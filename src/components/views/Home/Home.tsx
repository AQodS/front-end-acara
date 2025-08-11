import { Skeleton } from "@nextui-org/react";
import HomeList from "./HomeList";
import HomeSlider from "./HomeSlider";
import useHome from "./useHome";
import Image from "next/image";

const Home = () => {
  const {
    dataBanners,
    dataFeaturedEvents,
    dataLatestEvents,
    isLoadingBanners,
    isLoadingFeaturedEvents,
    isLoadingLatestEvents,
  } = useHome();

  return (
    <div>
      <HomeSlider
        banners={dataBanners?.data}
        isLoadingBanners={isLoadingBanners}
      />
      <HomeList
        title="Featured Events"
        events={dataFeaturedEvents?.data}
        isLoading={isLoadingFeaturedEvents}
      />
      <Skeleton
        isLoaded={!isLoadingBanners}
        className="mb-16 h-[20vw] w-full rounded-2xl"
      >
        <Image
          src={dataBanners && dataBanners?.data[1]?.image}
          alt="banner"
          className="h-[20vw] w-full rounded-2xl object-cover object-center"
          width={1920}
          height={1080}
        />
      </Skeleton>
      <HomeList
        title="Latest Events"
        events={dataLatestEvents?.data}
        isLoading={isLoadingLatestEvents}
      />
    </div>
  );
};

export default Home;
