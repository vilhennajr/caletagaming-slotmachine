import { DataSource } from 'typeorm';

import Player from '@modules/players/infra/typeorm/entities/Player';

import { CreatePlayers1673552480543 } from './migrations/1673552480543-CreatePlayers';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'caletagaming-slotmachine',
  entities: [Player],
  migrations: [
    CreatePlayers1673552480543,
  ],
});
