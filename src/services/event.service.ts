import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IEvent } from "@/types/Event";

const eventServices = {
  getEvents: (params?: string) => instance.get(`${endpoint.EVENTS}?${params}`),
  addEvent: (payload: IEvent) => instance.post(endpoint.EVENTS, payload),
  deleteEvent: (id: string) => instance.delete(`${endpoint.EVENTS}/${id}`),
  searchLocationByRegency: (name: string) =>
    instance.get(`${endpoint.REGIONS}-search?name=${name}`),
};

export default eventServices;
