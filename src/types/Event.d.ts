import { DateValue } from "@nextui-org/react";

interface IRegency {
  id: string;
  name: string;
}

interface IEvent {
  name: string;
  slug: string;
  category: string;
  startDate: string;
  endDate: string;
  isPublished: boolean | string;
  isFeatured: boolean | string;
  isOnline: boolean | string;
  description: string;
  location?: {
    region: string;
    coordinates: number[];
  };
  banner: string | FileList;
}

interface IEventForm extends IEvent {
  region: string;
  startDate: DateValue;
  endDate: DateValue;
  latitude: string;
  longitude: string;
}

export type { IRegency, IEvent, IEventForm };
