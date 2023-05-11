export type TPokemon = {
  id: number;
  name: string;
  types: {
    type: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
  }[];
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  stats: [
    {
      base_stat: number;
      effort: 0;
      stat: {
        name: string;
        url: string;
      };
    },
  ];
};

export type TPokemonResponseData = {
  count: number;
  next: string;
  results: TPokemon[];
};
