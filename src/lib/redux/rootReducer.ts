/* Instruments */
import { alunoSlice, counterSlice, userSlice } from "./slices";

export const reducer = {
  counter: counterSlice.reducer,
  user: userSlice.reducer,
  aluno: alunoSlice.reducer,
};
