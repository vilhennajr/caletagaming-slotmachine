export interface IPlayer {
  id: string;
  name: string;
  email: string;
  password: string;
  balance?: number;
  created_at: Date;
  updated_at: Date;
}
