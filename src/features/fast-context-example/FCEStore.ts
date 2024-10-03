export type FCEStoreItem = {
  caption: string,
};

export type FCEStore = {
  item1: FCEStoreItem,
  item2: FCEStoreItem,
};

export const initialStore: FCEStore = {
  item1: { caption: '' },
  item2: { caption: '' },
}
