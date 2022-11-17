export class Item {
  constructor(public id: number, public name: string) {}
}

export interface ItemResponse {
  total: number;
  results: Item[];
}