import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  users: Array<Record<string, any>>;
  loadingUsers: boolean;
}

const initialState: UserState = {
  users: [],
  loadingUsers: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<Array<Record<string, any>>>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<Record<string, any>>) => {
      state.users.push(action.payload);
    },
    setLoadingUsers: (state, action: PayloadAction<boolean>) => {
      state.loadingUsers = action.payload;
    },
  },
});

export const { setUsers, addUser, setLoadingUsers } = userSlice.actions;
export default userSlice.reducer;
