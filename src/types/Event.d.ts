import { DateValue } from "@nextui-org/react";
import { StringDecoder } from "string_decoder";

interface IRegency {
  id: string;
  name: string;
}

interface IEvent {
  _id?: string;
  name?: string;
  slug?: string;
  category?: string;
  startDate?: string | DateValue;
  endDate?: string | DateValue;
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
  address?: string;
  latitude?: string;
  longitude?: string;
  region?: string;
}

export type { IRegency, IEvent, IEventForm };
