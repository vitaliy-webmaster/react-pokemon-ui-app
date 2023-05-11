import { TPokemon } from '../types';

export const filtedPokemonData = (item: TPokemon) => {
  const { id, name, types, stats, sprites } = item;
  return item;
};
