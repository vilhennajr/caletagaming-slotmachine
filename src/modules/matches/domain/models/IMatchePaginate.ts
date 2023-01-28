import { IMatche } from './IMatche';

export interface IMatchePaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: IMatche[];
}
