import { DataSource } from 'typeorm';

import Player from '@modules/players/infra/typeorm/entities/Player';
import Setting from '@modules/settings/infra/typeorm/entities/Setting';
import GameParam from '@modules/gameparams/infra/typeorm/entities/GameParam';
import Matche from '@modules/matches/infra/typeorm/entities/Matche';

import { CreatePlayers1673552480543 } from './migrations/1673552480543-CreatePlayers';
import { CreateSettings1674914510799 } from './migrations/1674914510799-CreateSettings';
import { CreateGameParams1674915991110 } from './migrations/1674915991110-CreateGameParams';
import { CreateMatches1674918753012 } from './migrations/1674918753012-CreateMatches';
import { AddPlayerIdToMatches1674918899058 } from './migrations/1674918899058-AddPlayerIdToMatches';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'caletagaming-slotmachine5',
  entities: [Player, Setting, GameParam, Matche],
  migrations: [
    CreatePlayers1673552480543,
    CreateSettings1674914510799,
    CreateGameParams1674915991110,
    CreateMatches1674918753012,
    AddPlayerIdToMatches1674918899058,
  ],
});
