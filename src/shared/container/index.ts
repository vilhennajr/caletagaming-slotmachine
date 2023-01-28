import { container } from 'tsyringe';

import { IPlayerRepository } from '@modules/players/domain/repositories/IPlayersRepository';
import PlayersRepository from '@modules/players/infra/typeorm/repositories/PlayersRepository';

import { ISettingRepository } from '@modules/settings/domain/repositories/ISettingsRepository';
import SettingsRepository from '@modules/settings/infra/typeorm/repositories/SettingsRepository';

container.registerSingleton<IPlayerRepository>(
  'PlayersRepository',
  PlayersRepository,
);

container.registerSingleton<ISettingRepository>(
  'SettingsRepository',
  SettingsRepository,
);
