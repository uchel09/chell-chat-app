// redux/slices/socketSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CustomSocket {
  emit: (event: string, ...args: any[]) => void;
  on: (event: string, callback: (...args: any[]) => void) => void;
  off: (event: string) => void;
  disconnect: () => void;
}

interface SocketState {
  socket: CustomSocket | null;
}

const initialState: SocketState = {
  socket: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket(state, action: PayloadAction<CustomSocket | null>) {
      state.socket = action.payload;
    },
    disconnectSocket(state) {
      if (state.socket) {
        state.socket.disconnect();
        state.socket = null;
      }
    },
  },
});

export const { setSocket, disconnectSocket } = socketSlice.actions;

export default socketSlice.reducer;
