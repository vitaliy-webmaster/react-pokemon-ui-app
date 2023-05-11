import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { TPokemon } from '../../types';

export const selectListData = (state: RootState) => state.list.data as TPokemon[];

export const selectChosenCardId = (state: RootState) =>
  state.list.selectedCardId as number | null;

export const selectChosenCardData = createSelector(
  selectListData,
  selectChosenCardId,
  (data, id) => {
    if (!id) return null;
    return data.find((item) => item.id === id);
  },
);
