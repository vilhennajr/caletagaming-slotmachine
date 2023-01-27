import { container } from 'tsyringe';

import { IPlayerRepository } from '@modules/players/domain/repositories/IPlayersRepository';
import PlayersRepository from '@modules/players/infra/typeorm/repositories/PlayersRepository';

container.registerSingleton<IPlayerRepository>(
  'PlayersRepository',
  PlayersRepository,
);
