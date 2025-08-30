interface ITicket {
  _id?: string;
  name?: string;
  price?: number | string;
  description?: string;
  quantity?: number | string;
  events?: string;
}

interface ICart {
  events: string;
  ticket: string;
  quantity: number;
}

export type { ITicket, ICart };
