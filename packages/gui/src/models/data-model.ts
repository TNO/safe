import { UserEntry } from "../services";

export type DataModel = {
  version: number;
  lastUpdate: number;
  data: UserEntry[];
};

export type Item = { id: string; label: string; desc?: string };

export type Category = Item & { options?: Category[] };

export const EmptyDataModel = () =>
  ({
    version: 1,
    lastUpdate: Date.now(),
    data: [],
  } as DataModel);
