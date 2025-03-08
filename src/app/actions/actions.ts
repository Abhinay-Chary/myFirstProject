import { createAction, props } from "@ngrx/store";

export const inc=createAction('[counter] inc',props<{data:any}>());
export const dec=createAction('[counter] dec',props<{data:any}>() );
// export const update=createAction('[update] up',props<{data:any}>())
