import { container } from 'tsyringe';

import { IPlayerRepository } from '@modules/players/domain/repositories/IPlayersRepository';
import PlayersRepository from '@modules/players/infra/typeorm/repositories/PlayersRepository';

import { ISettingRepository } from '@modules/settings/domain/repositories/ISettingsRepository';
import SettingsRepository from '@modules/settings/infra/typeorm/repositories/SettingsRepository';

import { IGameParamRepository } from '@modules/gameparams/domain/repositories/IGameParamsRepository';
import GameParamsRepository from '@modules/gameparams/infra/typeorm/repositories/GameParamsRepository';

import { IMatcheRepository } from '@modules/matches/domain/repositories/IMatchesRepository';
import MatchesRepository from '@modules/matches/infra/typeorm/repositories/MatchesRepository';

container.registerSingleton<IPlayerRepository>(
  'PlayersRepository',
  PlayersRepository,
);

container.registerSingleton<ISettingRepository>(
  'SettingsRepository',
  SettingsRepository,
);

container.registerSingleton<IGameParamRepository>(
  'GameParamsRepository',
  GameParamsRepository,
);

container.registerSingleton<IMatcheRepository>(
  'MatchesRepository',
  MatchesRepository,
);
