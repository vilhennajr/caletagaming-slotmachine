export interface IPlayMatche {
  player: {
    balance: number
  }
  slotmachine_result: {
    columnOne: string,
    columnTwo: string[1],
    columnThree: string[2]
  },
  isMatche: boolean,
  won: number
}
