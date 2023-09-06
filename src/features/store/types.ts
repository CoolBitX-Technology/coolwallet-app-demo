export enum ReducerTypes {
  ACCOUNT = 'account',
  DEVICE = 'device',
  LOG = 'log',
}

export type Nullable<T> = T | null;
export type Voidable<T> = T | undefined;
export type Nill<T> = Voidable<T> | Nullable<T>;
