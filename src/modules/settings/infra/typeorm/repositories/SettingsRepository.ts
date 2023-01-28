import { ISettingPaginate } from '@modules/settings/domain/models/ISettingPaginate';
import { ICreateSetting } from '@modules/settings/domain/models/ICreateSetting';
import { ISettingRepository } from '@modules/settings/domain/repositories/ISettingsRepository';
import { Repository } from 'typeorm';
import Setting from '../entities/Setting';
import { SearchParams } from '../../../domain/repositories/ISettingsRepository';
import { dataSource } from '@shared/infra/typeorm';

class SettingRepository implements ISettingRepository {

  private ormRepository: Repository<Setting>

  constructor() {
    this.ormRepository = dataSource.getRepository(Setting);
  }

  public async create({ name, key, value }: ICreateSetting): Promise<Setting> {

    const setting = this.ormRepository.create({ name, key, value });

    await this.ormRepository.save(setting);

    return setting;

  }

  public async save(setting: Setting): Promise<Setting> {

    await this.ormRepository.save(setting);

    return setting;

  }

  public async findByKey(key: string): Promise<Setting | null> {
    const setting = this.ormRepository.findOneBy({ key });
    return setting;
  }

  public async findById(id: string): Promise<Setting | null> {
    const setting = this.ormRepository.findOneBy({ id });
    return setting;
  }

  public async remove(setting: Setting): Promise<void> {
    await this.ormRepository.remove(setting);
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<ISettingPaginate> {
    const [
      settings,
      count,
    ] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: settings,
    };

    return result;
  }

}

export default SettingRepository;
