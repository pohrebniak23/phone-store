import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductItem } from "../../types/ProductItem";

interface favouritesState {
  favourites: ProductItem[],
}

const initialState: favouritesState = {
  favourites: []
}

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    loadFavourites(state, action: PayloadAction<ProductItem[]>) {
      state.favourites = [...action.payload]
    },
    addNewFavourite(state, action: PayloadAction<ProductItem>) {
      state.favourites.push(action.payload)
    },
    removeFavourite(state, action: PayloadAction<string>) {
      state.favourites = state.favourites.filter((item: any) => item.id !== action.payload)
    }
  }
});

export default favouritesSlice.reducer;
export const {
  addNewFavourite,
  loadFavourites,
  removeFavourite
} = favouritesSlice.actions;