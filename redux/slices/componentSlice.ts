import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";

interface componentState {
  openModalFriends: boolean;
  openModalDelete: boolean;
}

const initialState: componentState = {
  openModalFriends: false,
  openModalDelete: false,
};

const componentSlice = createSlice({
  name: "component",
  initialState,
  reducers: {
    setOpenModalFriends: (state, action: PayloadAction<boolean>) => {
      state.openModalFriends = action.payload;
    },
    setOpenModalDelete: (state, action: PayloadAction<boolean>) => {
      state.openModalDelete = action.payload;
    },
  },
});

export const { setOpenModalFriends,setOpenModalDelete } = componentSlice.actions;
export default componentSlice.reducer;
