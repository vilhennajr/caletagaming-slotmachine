import { ISetting } from '../models/ISetting';
import { ISettingPaginate } from '../models/ISettingPaginate';
import { ICreateSetting } from '../models/ICreateSetting';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface ISettingRepository {
  findByKey(key: string): Promise<ISetting | null>;
  create(data: ICreateSetting): Promise<ISetting>;
  save(player: ISetting): Promise<ISetting>;
  findAll({ page, skip, take }: SearchParams): Promise<ISettingPaginate>;
  findById(id: string): Promise<ISetting | null>;
  remove(player: ISetting): Promise<void>;
}
