import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import axios from 'axios';

interface PriceState {
  symbol: string;
  data: { price: number; timestamp: string }[];
}

const initialState: PriceState = {
  symbol: 'GOOG',
  data: [],
};

const priceSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    setSymbol: (state, action: PayloadAction<string>) => {
      state.symbol = action.payload;
    },
    setData: (state, action: PayloadAction<{ price: number; timestamp: string }[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setSymbol, setData } = priceSlice.actions;

export const fetchPriceData = (symbol: string) => async (dispatch: AppDispatch) => {
  const response = await axios.get(`/api/prices/${symbol}`);
  dispatch(setData(response.data));
};

export default priceSlice.reducer;
