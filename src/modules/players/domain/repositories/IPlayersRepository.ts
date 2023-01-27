import { IPlayer } from '../models/IPlayer';
import { IPlayerPaginate } from '../models/IPlayerPaginate';
import { ICreatePlayer } from '../models/ICreatePlayer';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IPlayerRepository {
  findByEmail(email: string): Promise<IPlayer | null>;
  create(data: ICreatePlayer): Promise<IPlayer>;
  save(player: IPlayer): Promise<IPlayer>;
  findAll({ page, skip, take }: SearchParams): Promise<IPlayerPaginate>;
  findById(id: string): Promise<IPlayer | null>;
  remove(player: IPlayer): Promise<void>;
}
