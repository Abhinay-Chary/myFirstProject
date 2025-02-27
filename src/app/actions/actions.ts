import { createAction, props } from "@ngrx/store";

export const inc=createAction('[counter] inc');
export const dec=createAction('[counter] dec' );
// export const update=createAction('[update] up',props<{data:any}>())
