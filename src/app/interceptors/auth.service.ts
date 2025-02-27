import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable
()
export class AuthService  implements HttpInterceptor{

  constructor() { }
 intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   const token = sessionStorage.getItem('expiry');
   let newReq;
   if(token){
    newReq=req.clone({
      setHeaders:{token:token}
    })
   }
if(newReq){
  console.log(newReq)
  return next.handle(newReq);

}
else{
  return next.handle(req)
}
 }
}
