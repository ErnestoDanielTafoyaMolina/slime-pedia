// src/app/interfaces/slime.interface.ts
export interface Slime {
    id: string;
    name: string;
    image: string;
    diet: string;
    favouriteFood: string;
    type: string;
    slimepedia: {
      slimeology: string;
      risks: string;
      plortonomics: string;
    };
    locations: string[];
    properties: string[];
    games: number[];
  }
  