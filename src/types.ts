export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
  color: string;
};

export type Card = {
  id: Id;
  title: string;
  description: string;
  createdAt: Date;
  parent: Column;
}