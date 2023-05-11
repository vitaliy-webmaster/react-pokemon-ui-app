import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchListData } from './api';
import { TPokemon } from '../../types';

export type CardListState = {
  count: number | null;
  next: string | null;
  data: TPokemon[];
  selectedCardId: number | null;
  status: 'idle' | 'loading' | 'failed';
};

const initialState: CardListState = {
  count: null,
  next: null,
  data: [],
  selectedCardId: null,
  status: 'idle',
};

export const fetchCardListAsync = createAsyncThunk(
  'list/fetch',
  async (_, { rejectWithValue }) => {
    const data = await fetchListData();
    if (!data) {
      return rejectWithValue(true);
    }
    return { count: data.count, next: data.next, data: data.results };
  },
);

export const cardListSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    selectCard: (state, action: PayloadAction<number>) => {
      state.selectedCardId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCardListAsync.fulfilled, (state, action) => {
        const { count, next, data } = action.payload;
        state.count = count;
        state.next = next;
        state.data = data;
        state.status = 'idle';
      })
      .addCase(fetchCardListAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { selectCard } = cardListSlice.actions;

export default cardListSlice.reducer;
