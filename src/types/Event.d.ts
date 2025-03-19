import { DateValue } from "@nextui-org/react";

interface IRegency {
  id: string;
  name: string;
}

interface IEvent {
  _id?: string;
  name?: string;
  slug?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
  isPublish?: boolean | string;
  isFeatured?: boolean | string;
  isOnline?: boolean | string;
  description?: string;
  location?: {
    address: string;
    region: string;
    coordinates: number[];
  };
  banner?: string | FileList;
}

interface IEventForm extends IEvent {
  startDate?: DateValue;
  endDate?: DateValue;
  address?: string;
  latitude?: string;
  longitude?: string;
  region?: string;
}

export type { IRegency, IEvent, IEventForm };
