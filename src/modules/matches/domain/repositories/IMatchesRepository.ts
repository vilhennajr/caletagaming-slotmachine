import { IMatche } from '../models/IMatche';
import { IMatchePaginate } from '../models/IMatchePaginate';
import { ICreateMatche } from '../models/ICreateMatche';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IMatcheRepository {
  create(data: ICreateMatche): Promise<IMatche>;
  save(matche: IMatche): Promise<IMatche>;
  findAll({ page, skip, take }: SearchParams): Promise<IMatchePaginate>;
  findById(id: string): Promise<IMatche | null>;
}
