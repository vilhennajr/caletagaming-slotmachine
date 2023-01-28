import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IDeleteSetting } from '../domain/models/IDeleteSetting';
import { ISettingRepository } from '../domain/repositories/ISettingsRepository';

@injectable()
class DeleteSettingService {

  constructor(

    @inject('SettingsRepository')
    private settingsRepository: ISettingRepository

  ) {}

  public async execute({ id }: IDeleteSetting): Promise<void> {
    const setting = await this.settingsRepository.findById(id);

    if (!setting) {
      throw new AppError('Setting not found.');
    }

    await this.settingsRepository.remove(setting);
  }
}

export default DeleteSettingService;
