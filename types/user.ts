export interface User {
  team: string;
  name: string;
}

export interface Result extends User {
  score: number;
}
