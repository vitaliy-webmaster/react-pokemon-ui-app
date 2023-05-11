import { filtedPokemonData } from '../../utils/filtedPokemonData';
import type { TPokemon, TPokemonResponseData } from '../../types';

export async function fetchListData(): Promise<TPokemonResponseData | null> {
  let data: TPokemonResponseData | null = null;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=12`);
    if (!response.ok) {
      throw new Error('Unsuccessfull server response');
    }

    /* Initial pokemon's data with name & url only */
    const shortData = await response.json();

    /* Gather promises to be awaited with Promise.all */
    const promises = [];

    for (let i = 0; i < shortData.results.length; i++) {
      const { name, url } = shortData.results[i];

      promises.push(
        (async (): Promise<TPokemon> => {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Unsuccessfull ${name} data fetch`);
          }
          return await response.json();
        })(),
      );
    }

    /* Await all promises' fulfillment all at once */
    const extendedResults = await Promise.all(promises);

    data = {
      ...shortData,
      results: extendedResults.map((item) => filtedPokemonData(item)),
    };
  } catch (err) {
    console.error(
      (err instanceof Error && err.message) || 'Error while fetching pokemon list',
    );
  }

  return data;
}
