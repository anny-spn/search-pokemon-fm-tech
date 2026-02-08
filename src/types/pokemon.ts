export interface Attack {
  name: string;
  type: string;
  damage: number;
}

export interface Pokemon {
  id: string;
  name: string;
  types: string[];
  image?: string;
  attacks: {
    fast: Attack[];
    special: Attack[];
  };
  evolutions?: Pokemon[];
}

export interface GetPokemonByNameData {
  pokemon: Pokemon | null;
}

