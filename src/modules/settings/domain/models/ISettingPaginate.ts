import { ISetting } from './ISetting';

export interface ISettingPaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: ISetting[];
}
