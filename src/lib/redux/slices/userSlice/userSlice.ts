/* Core */
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserSliceState = {
  usuario: "",
  senha: "",
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.usuario = action.payload.usuario;
      state.senha = action.payload.senha;
    },
    logoutUser: (state) => {
      state.usuario = "";
      state.senha = "";
    },
  },
});

/* Types */
export interface UserSliceState {
  usuario: string;
  senha: string;
  status: "idle" | "loading" | "failed";
}
