import { TPokemon } from '../types';

export const filterPokemonData = (item: TPokemon) => {
  const { id, name, types, stats, sprites } = item;
  return { id, name, types, stats, sprites };
};
