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
  
  export interface Food {
    id: string; // Identificador único de la comida
    name: string; // Nombre de la comida
    image: string; // URL de la imagen de la comida
    type: string; // Tipo de comida (ej. 'meat', 'vegetable', etc.)
    slimeId: string; // ID del slime que puede comer esta comida
    locations: string[]; // Lugares donde se puede encontrar la comida (si aplica)
    slimepedia: {
      about: string; // Información adicional sobre la comida (si aplica)
      ranch: string; // Información sobre su uso en el rancho (si aplica)
    };
  }
  