import { IPlayer } from "@modules/players/domain/models/IPlayer";

export interface IMatche {
  id: string;
  player_id: string;
  player: IPlayer
  bet: number;
  win: number;
  created_at: Date;
  updated_at: Date;
}
