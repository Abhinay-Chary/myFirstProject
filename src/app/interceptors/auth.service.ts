import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

  export const authinterceptor : HttpInterceptorFn = (req,next)=>{
   const token:string = sessionStorage.getItem('expiry')??'';

  const authReq = token
    ? req.clone({
        setHeaders: {
          token:token
        }
      })
    : req;
    console.log('called interceptor')
  return next(authReq);
 
  }

