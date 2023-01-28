import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Setting from '../infra/typeorm/entities/Setting';
import { IShowSetting } from '../domain/models/IShowSetting';
import { ISettingRepository } from '../domain/repositories/ISettingsRepository';

@injectable()
class ShowSettingService {

  constructor(

    @inject('SettingsRepository')
    private settingsRepository: ISettingRepository

  ) {}

  public async execute({ id }: IShowSetting): Promise<Setting> {
    const setting = await this.settingsRepository.findById(id);

    if (!setting) {
      throw new AppError('Setting not found.');
    }

    return setting;
  }
}

export default ShowSettingService;
