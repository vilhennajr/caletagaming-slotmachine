import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IUpdateSetting } from '../domain/models/IUpdateSetting';
import Setting from '../infra/typeorm/entities/Setting';
import { ISettingRepository } from '../domain/repositories/ISettingsRepository';

@injectable()
class UpdateSettingService {

  constructor(

    @inject('SettingsRepository')
    private settingsRepository: ISettingRepository

  ) {}

  public async execute({
    id,
    name,
    value,
  }: IUpdateSetting): Promise<Setting> {
    const setting = await this.settingsRepository.findById(id);

    if (!setting) {
      throw new AppError('Setting not found.');
    }

    setting.name = name;
    setting.value = value;

    await this.settingsRepository.save(setting);

    return setting;
  }
}

export default UpdateSettingService;
