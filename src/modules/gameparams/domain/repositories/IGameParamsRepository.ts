import { IGameParam } from '../models/IGameParam';
import { IGameParamPaginate } from '../models/IGameParamPaginate';
import { ICreateGameParam } from '../models/ICreateGameParam';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IGameParamRepository {
  findBySymbol(symbol: string): Promise<IGameParam | null>;
  create(data: ICreateGameParam): Promise<IGameParam>;
  save(player: IGameParam): Promise<IGameParam>;
  findAll({ page, skip, take }: SearchParams): Promise<IGameParamPaginate>;
  findById(id: string): Promise<IGameParam | null>;
  remove(player: IGameParam): Promise<void>;
}
