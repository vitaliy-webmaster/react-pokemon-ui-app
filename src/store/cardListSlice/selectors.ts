import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { TPokemon, TTypeNormalized } from '../../types';

export const selectListData = (state: RootState) => state.list.data as TPokemon[];

export const selectTypeData = (state: RootState) =>
  state.list.typeData as TTypeNormalized[];

export const selectChosenCardId = (state: RootState) =>
  state.list.selectedCardId as number | null;

export const selectChosenTypeIds = (state: RootState) =>
  state.list.selectedTypeIds as number[];

export const selectChosenCardData = createSelector(
  selectListData,
  selectChosenCardId,
  (data, id) => {
    if (!id) return null;
    return data.find((item) => item.id === id);
  },
);

export const selectFilteredListData = createSelector(
  selectListData,
  selectTypeData,
  selectChosenTypeIds,
  (listData, typeData, typeIds) => {
    if (typeIds.length === 0) {
      return listData;
    }

    const typeNames = typeIds.map((id) => typeData.find((item) => item.id === id)?.name);

    const filteredListData = listData.filter((item) => {
      const itemTypeNames = item.types.map((itemType) => itemType.type.name);
      return itemTypeNames.some((itemTypeName) => typeNames.includes(itemTypeName));
    });

    return filteredListData;
  },
);
