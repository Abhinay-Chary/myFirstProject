import { createReducer, on } from "@ngrx/store";
import { inc, dec, } from "./actions";
const initialState = 0;
export const cr = createReducer(initialState,
    on(inc, (state,{data}) => {
        return data + 1;
    }
    )
    ,
    on(dec, (state,{data}) => {
        return data - 1
    }),
   /*  on(update, (state,{data}) => {
   return state+data
      }) */
)

/*  export function cr2(state:any,action:any){
    return cr(state,action)
 } */