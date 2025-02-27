import { CanActivateFn } from '@angular/router';
import  {jwtDecode} from 'jwt-decode'
export const authGuard: CanActivateFn = (route, state) => {

 let token= sessionStorage.getItem('expiry');
 console.log('can')
 if (token) {
  let de:any= jwtDecode(token);
  console.log(de.exp*1000 >Date.now())
  if(de.exp*1000 >Date.now()){
    console.log(true)
    return true
  }
  else 
  return false;
 }

  return true;
};
