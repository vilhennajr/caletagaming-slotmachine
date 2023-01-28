import { IGameParam } from './IGameParam';

export interface IGameParamPaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: IGameParam[];
}
