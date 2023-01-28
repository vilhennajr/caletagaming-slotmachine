import { inject, injectable } from 'tsyringe';
import { ISettingRepository } from '../domain/repositories/ISettingsRepository';
import { ISettingPaginate } from '../domain/models/ISettingPaginate';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
class ListSettingService {

  constructor(

    @inject('SettingsRepository')
    private settingsRepository: ISettingRepository

  ) {}

  public async execute({
    page,
    limit,
  }: SearchParams): Promise<ISettingPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const settings = await this.settingsRepository.findAll({
      page,
      skip,
      take,
    });

    return settings;
  }
}

export default ListSettingService;
