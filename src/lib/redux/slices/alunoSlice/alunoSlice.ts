/* Core */
import { createSlice } from "@reduxjs/toolkit";

const initialState: AlunoSliceState = {
  usuario: "",
  senha: "",
  status: "idle",
};

export const alunoSlice = createSlice({
  name: "aluno",
  initialState,
  reducers: {},
});

/* Types */
export interface AlunoSliceState {
  usuario: string;
  senha: string;
  status: "idle" | "loading" | "failed";
}
