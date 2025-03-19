interface ITicket {
  _id?: string;
  name?: string;
  price?: number | string;
  description?: string;
  quantity?: number | string;
  events?: string;
}

export type { ITicket };