export interface Pokemon {
  id: number;
  name: string;
  hp: number;
  maxHp: number;
  speed: number;
  moves: Array<any>;
  sprites: Array<any>;
  isAttacked:boolean;
}
