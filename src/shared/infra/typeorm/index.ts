import { DataSource } from 'typeorm';

import Player from '@modules/players/infra/typeorm/entities/Player';
import Setting from '@modules/settings/infra/typeorm/entities/Setting';

import { CreatePlayers1673552480543 } from './migrations/1673552480543-CreatePlayers';
import { CreateSettings1674914510799 } from './migrations/1674914510799-CreateSettings';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'caletagaming-slotmachine2',
  entities: [Player, Setting],
  migrations: [
    CreatePlayers1673552480543,
    CreateSettings1674914510799,
  ],
});
