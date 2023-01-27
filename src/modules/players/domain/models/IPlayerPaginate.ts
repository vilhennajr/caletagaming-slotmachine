import { IPlayer } from './IPlayer';

export interface IPlayerPaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: IPlayer[];
}
