export type ID = string;

export interface BaseEntity {
  _id: ID;
  createdAt?: string;
  updatedAt?: string;
}
