import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ISetting } from '../domain/models/ISetting';
import { ICreateSetting } from '../domain/models/ICreateSetting';
import { ISettingRepository } from '../domain/repositories/ISettingsRepository';
import { hash } from 'bcryptjs';

@injectable()
class CreateSettingService {

  constructor(

    @inject('SettingsRepository')
    private settingsRepository: ISettingRepository

  ) {}

  public async execute({
    name,
    key,
    value,
  }: ICreateSetting): Promise<ISetting> {
    const settingExists = await this.settingsRepository.findByKey(key);

    if (settingExists) {
      throw new AppError('There is already one setting with this key');
    }

    const setting = await this.settingsRepository.create({
      name,
      key,
      value
    });

    return setting;
  }
}

export default CreateSettingService;
