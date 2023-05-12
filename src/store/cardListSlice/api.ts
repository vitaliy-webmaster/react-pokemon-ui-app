import { filterPokemonData } from '../../utils/filterPokemonData';
import type { TPokemon, TPokemonResponseData, TTypeResponseData } from '../../types';
import { API_TYPE_LIST_URL } from '../../constants/API_URL';

export async function fetchListData(url: string): Promise<TPokemonResponseData | null> {
  let data: TPokemonResponseData | null = null;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Unsuccessfull server response');
    }

    /* Initial pokemons' data with name & url only */
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
      results: extendedResults.map((item) => filterPokemonData(item)),
    };
  } catch (err) {
    console.error(
      (err instanceof Error && err.message) || 'Error while fetching pokemon list',
    );
  }

  return data;
}

export async function fetchTypesData(): Promise<TTypeResponseData | null> {
  let data: TTypeResponseData | null = null;

  try {
    const response = await fetch(API_TYPE_LIST_URL);

    if (!response.ok) {
      throw new Error('Unsuccessfull server response');
    }

    data = await response.json();
  } catch (err) {
    console.error(
      (err instanceof Error && err.message) || 'Error while fetching pokemon types',
    );
  }

  return data;
}
